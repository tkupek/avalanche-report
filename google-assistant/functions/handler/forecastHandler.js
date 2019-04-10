const https = require('https');
const xmlparser = require('xml2js').parseString;
const dateformat = require('dateformat');

const { Card, Suggestion } = require('dialogflow-fulfillment');

const config = require('../config/config');
const T = require('../util/translationManager');

const handler = {
    registerHandler: function(intentMap) {
        intentMap.set('Get Avalanche Forecast', handler.forecast);
        return intentMap;
    },
    forecast: function(agent) {
        let region = agent.parameters['region'];

        if (!region) {
            agent.add(T.getMessage(agent, 'NO_REGION'));
            agent.add(new Suggestion('tyrol'));
            agent.add(new Suggestion('stubai'));
            agent.add(new Suggestion('south tyrol'));
            agent.add(new Suggestion('trentino'));
            return;
        }

        return handler.getAvalancheReportFromAPI(agent, region).then(function(data) {
            let dateValid = Date.parse(data['validTime'][0]['TimePeriod'][0]['endPosition'][0]);
            let formatDateValid = dateformat(dateValid, 'dddd, mmmm dS');

            let result = {};
            result.intro = T.getMessage(agent, 'REPORT_INTRO', [region, formatDateValid]);

            let dangerRating = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['dangerRatings'][0]['DangerRating'];
            if (dangerRating.length > 1) {
                let elevationData = handler.getElevationData(agent, dangerRating);
                result.intro += ' ' + T.getMessage(agent, 'FORECAST_LEVEL_DOUBLE', [elevationData.elevationLw, elevationData.dangerLw, elevationData.elevationHi, elevationData.dangerHi]);
            } else {
                result.intro += ' ' + T.getMessage(agent, 'FORECAST_LEVEL_SINGLE', [dangerRating[0]['mainValue']]);
            }
            result.text = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'];
            result.highlight = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityHighlights'];

            result = handler.clearHTML(result);

            agent.add(result.intro);
            agent.add(new Card({
                title: result.highlight,
                imageUrl: config.images['latest_forecast'].replace('{{0}}', data['$']['gml:id']),
                text: result.text,
                subtitle: T.getMessage(agent, 'FORECAST_CARD_TITLE', [region, dateformat(dateValid, 'dd.mm.yyyy')]),
                buttonText: T.getMessage(agent, 'FULL_REPORT'),
                buttonUrl: config.fullReport.replace('{{0}}', T.getLanguage(agent))
            }));

        }).catch(function(err) {
            console.error(err);
            agent.add(T.getMessage(agent, 'FORECAST_ERROR'));
        });
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
                elevationData.dangerLw = agent, element.mainValue[0];
            }
        });

        return elevationData;
    },
    getAvalancheReportFromAPI: function(agent, region) {
        return new Promise(function(resolve, reject) {
            let apiConfig = config.getApiConfig(T.getLanguage(agent));
            handler.executeServerRequest(apiConfig).then(function(returnData) {
                xmlparser(returnData, function(err, result) {
                    let localeObservation = result['ObsCollection']['observations'][0]['Bulletin'].find(function(element) {
                        let localeRef = element['locRef'].find(function(element) {
                            return element['$']['xlink:href'].startsWith(config.regionMapping[region]);
                        });
                        return localeRef !== undefined;
                    });

                    if (localeObservation !== undefined) {
                        resolve(localeObservation);
                    } else {
                        reject('no observations found for requested region')
                    }
                });
            }).catch(function(err) {
                reject('error while executing the server request');
            });
        });
    },
    executeServerRequest: function(config) {
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
        result.intro = result.text.replace(/<(?:.|\n)*?> /gm, '');
        result.text = result.text.replace(/<(?:.|\n)*?> /gm, '');
        result.highlight = result.highlight.replace(/<(?:.|\n)*?> /gm, '');
        return result;
    },
    getElevationText: function(agent, elevation) {
        return elevation === 'Treeline' ? T.getMessage(agent, 'FORECAST_TREELINE') : elevation + 'm';
    }
};

module.exports = handler;