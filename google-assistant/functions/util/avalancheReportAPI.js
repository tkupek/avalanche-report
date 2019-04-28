const config = require('../config/config');
const T = require('./translationManager');

const https = require('https');
const xmlparser = require('xml2js').parseString;
const classifyPoint = require("robust-point-in-polygon");

const avalancheReportAPI = {
    mapCoordinatesToRegion: function(coordinates, location) {
        config.debug && console.log('map coordinates to region [' + JSON.stringify(coordinates) + ']');

        return new Promise(function(resolve, reject) {
            avalancheReportAPI.getLatestRegions().then(function(regions) {
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
                    reject('no region found for coordinates [' + JSON.stringify(coordinates) + '] and location [' + location + ']');
                }
            });
        });        
    },
    getLatestRegions: function() {
        config.debug && console.log('get latest regions');

        return new Promise(function(resolve, reject) {
            let apiConfig = config.getRegionsConfig(config.regionModes[0]);
            avalancheReportAPI.executeServerRequest(apiConfig).then(function(returnData) {
                resolve(JSON.parse(returnData));
            }).catch(function(err) {
                apiConfig = config.getRegionsConfig(config.regionModes[1]);
                avalancheReportAPI.executeServerRequest(apiConfig).then(function(returnData) {
                    resolve(JSON.parse(returnData));
                }).catch(function(err) {
                    reject('unable to get regions from server');
                });
            });
        });
    },
    getAvalancheReportFromAPI: function(agent, regionId) {
        config.debug && console.log('get avalanche report from api [' + regionId + ']');

        let regionIdPM = regionId + "_PM";

        return new Promise(function(resolve, reject) {
            let apiConfig = config.getApiConfig(T.getLanguage(agent));
            avalancheReportAPI.executeServerRequest(apiConfig).then(function(returnData) {
                xmlparser(returnData, function(err, result) {
                    let localeObservation = avalancheReportAPI.findObservation(result, regionId);
                    let localeObservationPM = avalancheReportAPI.findObservation(result, regionIdPM);

                    if (!localeObservation) {
                         reject('no observations found for requested region');
                    }

                    let observations = {};
                    observations[config.OBS_TIME.AM] = localeObservation;
                    observations[config.OBS_TIME.PM] = localeObservationPM;

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
                    return reject('server request failed with code ' + JSON.stringify(res.statusCode));
                });

                res.on('error', function(err) {
                    return reject('server request failed with message ' + JSON.stringify(err));
                });

            });
            req.end();
        });
    }
};

module.exports = avalancheReportAPI;
