const https = require('https');
const xmlparser = require('xml2js').parseString;
const dateformat = require('dateformat');
const classifyPoint = require("robust-point-in-polygon");

const { Card, Suggestion } = require('dialogflow-fulfillment');

const config = require('../config/config');
const apiKeys = require('../config/apiKeys');
const T = require('../util/translationManager');

const googleMapsClient = require('@google/maps').createClient({
  key: apiKeys.googleGeocodingAPI,
  Promise: Promise
});

const OBS_TIME = {
    FULL: 'FULL',
    AM: 'AM',
    PM: 'PM'
}

const handler = {
    registerHandler: function(intentMap) {
        intentMap.set('Get Avalanche Forecast', handler.forecast);
        return intentMap;
    },
    forecast: function(agent) {
        let location = agent.parameters['location'];
        if (!location) {
            handler.buildAgentError(agent, 'NO_REGION');
            return;
        }

        return handler.geocodeLocation(location)
            .then(resolvedLoc => handler.mapCoordinatesToRegion(resolvedLoc.coordinates))
            .then(regionId => handler.getAvalancheReportFromAPI(agent, regionId))
            .then(reportData => handler.buildAgentResponse(agent, reportData, location))
            .catch(err => handler.buildAgentError(agent, 'FORECAST_ERROR', err))
            .catch(err => handler.buildAgentError(agent, 'LOCATION_UNSUPPORTED', err))
            .catch(err => handler.buildAgentError(agent, 'LOCATION_UNSUPPORTED', err));
    },
    buildAgentError: function(agent, message, err) {
        err && console.error(err);
        agent.add(T.getMessage(agent, message));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_NO_REGION_1')));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_NO_REGION_2')));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_NO_REGION_3')));
    },
    buildAgentResponse: function(agent, data, location) {
        config.debug && console.log('build agent response [' + JSON.stringify(data) + ']');

        let primaryData = data[OBS_TIME.AM];
        let time = OBS_TIME.FULL;

        if(data[OBS_TIME.PM]) {
            time = OBS_TIME.AM;
        }

        dateformat.i18n = T.getMessage(agent, 'DATES');
        let dateValid = Date.parse(primaryData['validTime'][0]['TimePeriod'][0]['endPosition'][0]);
        let formatDateValid = dateformat(dateValid, 'dddd, d. mmmm');

        let result = {};
        result.intro = T.getMessage(agent, 'REPORT_INTRO', [location, formatDateValid]);
        result.intro += ' ' + handler.getDangerRating(agent, primaryData, time);
        if(data[OBS_TIME.PM]) {
            result.intro += ' ' + handler.getDangerRating(agent, data[OBS_TIME.PM], OBS_TIME.PM);
            result.intro += ' ' + T.getMessage(agent, 'FORECAST_PM_NOTICE');
        }

        result.text = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'][0];
        result.highlight = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityHighlights'][0];

        result = handler.clearHTML(result);
        
        agent.add(result.intro);
        agent.add(new Card({
            title: result.highlight,
            imageUrl: config.images['latest_forecast'].replace('{{0}}', primaryData['$']['gml:id']),
            text: result.text,
            subtitle: T.getMessage(agent, 'FORECAST_CARD_TITLE', [location, dateformat(dateValid, 'longDate')]),
            buttonText: T.getMessage(agent, 'FULL_REPORT'),
            buttonUrl: config.fullReport.replace('{{0}}', T.getLanguage(agent)).replace('{{1}}', primaryData['$']["gml:id"])
        }));
    },
    getDangerRating: function(agent, data, time) {
        let dangerRating = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['dangerRatings'][0]['DangerRating'];
        if (dangerRating.length > 1) {
            let elevationData = handler.getElevationData(agent, dangerRating);
            return T.getMessage(agent, 'FORECAST_LEVEL_DOUBLE_' + time, [elevationData.elevationLw, elevationData.dangerLw, elevationData.elevationHi, elevationData.dangerHi]);
        } else {
            return T.getMessage(agent, 'FORECAST_LEVEL_SINGLE_' + time, [dangerRating[0]['mainValue']]);
        }
    },
    getElevationData: function(agent, dangerRating) {
        let elevationData = {};

        dangerRating.forEach(function(element) {
            let elevation = element.validElevation[0]['$']['xlink:href'].replace('ElevationRange_', '');
            if (elevation.endsWith('Hi')) {
                elevationData.elevationHi = handler.getElevationText(agent, elevation.replace('Hi', ''));
                elevationData.dangerHi = element.mainValue[0];
            }
            if (elevation.endsWith('Lw')) {
                elevationData.elevationLw = handler.getElevationText(agent, elevation.replace('Lw', ''));
                elevationData.dangerLw = element.mainValue[0];
            }
        });

        return elevationData;
    },
    getAvalancheReportFromAPI: function(agent, regionId) {
        config.debug && console.log('get avalanche report from api [' + regionId + ']');

        let regionIdPM = regionId + "_PM";

        return new Promise(function(resolve, reject) {
            let apiConfig = config.getApiConfig(T.getLanguage(agent));
            handler.executeServerRequest(apiConfig).then(function(returnData) {
                xmlparser(returnData, function(err, result) {
                    let localeObservation = handler.findObservation(result, regionId);
                    let localeObservationPM = handler.findObservation(result, regionIdPM);

                    if (!localeObservation) {
                         reject('no observations found for requested region');
                    }

                    let observations = {};
                    observations[OBS_TIME.AM] = localeObservation;
                    observations[OBS_TIME.PM] = localeObservationPM;

                    resolve(observations);
                });
            }).catch(function(err) {
                reject('error while executing the server request [' + JSON.stringify(err) + ']');
            });
        });
    },
    findObservation: function(data, regionId) {
        return data['ObsCollection']['observations'][0]['Bulletin'].find(function(element) {
            return element['$']["gml:id"] === regionId;
        });
    },
    executeServerRequest: function(config) {
        config.debug && console.log('execute server request [' + config.host + config.path + ']');

        return new Promise(function(resolve, reject) {
            let req = https.request(config, res => {
                res.setEncoding('utf8');
                let returnData = '';

                res.on('data', chunk => {
                    returnData = returnData + chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        return resolve(returnData);
                    }
                    return reject('server request failed with code ' + JSON.stringify(res.statusCode) + ' and message ' + res);
                });

                res.on('error', function(err) {
                    return reject('server request failed with message ' + err);
                });

            });
            req.end();
        });
    },
    clearHTML: function(result) {
        result.intro && (result.intro = result.intro.trim().replace(/<(?:.|\n)*?> /gm, ''));
        result.text && (result.text = result.text.trim().replace(/<(?:.|\n)*?> /gm, ''));
        result.highlight && (result.highlight = result.highlight.trim().replace(/<(?:.|\n)*?> /gm, ''));
        return result;
    },
    getElevationText: function(agent, elevation) {
        return elevation === 'Treeline' ? T.getMessage(agent, 'FORECAST_TREELINE') : elevation + 'm';
    },
    mapCoordinatesToRegion: function(coordinates) {
        config.debug && console.log('map coordinates to region [' + JSON.stringify(coordinates) + ']');

        return new Promise(function(resolve, reject) {
            handler.getLatestRegions().then(function(regions) {
                let resolvedRegion = regions.features.find(function(region) {
                    if(region.geometry.type === 'MultiPolygon') {
                        let subRegion = region.geometry.coordinates.find(function(polygon) {
                            let classification = classifyPoint(polygon[0], coordinates);
                            return classification == 0 || classification == -1;
                        });
                        return subRegion !== undefined;
                    } else {
                        let classification = classifyPoint(region.geometry.coordinates[0], coordinates);
                        return classification == 0 || classification == -1;
                    }
                });

                if(resolvedRegion) {
                    resolve(resolvedRegion.properties.bid);
                } else {
                    reject('no region found for coordinates [' + JSON.stringify(coordinates) + ']');
                }
            });
        });

        
    },
    getLatestRegions: function() {
        config.debug && console.log('get latest regions');

        return new Promise(function(resolve, reject) {
            let apiConfig = config.getRegionsConfig(config.regionModes[0]);
            handler.executeServerRequest(apiConfig).then(function(returnData) {
                resolve(JSON.parse(returnData));
            }).catch(function(err) {
                apiConfig = config.getRegionsConfig(config.regionModes[1]);
                handler.executeServerRequest(apiConfig).then(function(returnData) {
                    resolve(JSON.parse(returnData));
                }).catch(function(err) {
                    reject('unable to get regions from server');
                });
            });
        });
    },
    geocodeLocation: function(location) {
        config.debug && console.log('geocoding location [' + location + ']');

        return new Promise(function(resolve, reject) {
            let resolvedLoc = { name: location };

            googleMapsClient.geocode({address: location})
              .asPromise()
              .then((response) => {
                resolvedLoc.coordinates = [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat];
                resolve(resolvedLoc);
              })
              .catch((err) => {
                reject('unable to call google geocoding API [' + JSON.stringify(err) + ']');
              });
        });
    }
}

module.exports = handler;