const https = require('https');
const xmlparser = require('xml2js').parseString;
const dateformat = require('dateformat');

const { Card, Suggestion } = require('dialogflow-fulfillment');

const config = require('./config/config');
const T = require('./util/translationManager');

const handler = {
    registerHandler: function(intentMap) {
        intentMap.set('Get Avalanche Forecast', handler.forecast);
        return intentMap;
    },
    forecast: function(agent) {
        let region = agent.parameters['region'];

        if (!region) {
            console.error('no region selected for forecast');
            return;
        }

        return handler.getAvalancheReportFromAPI(agent, region).then(function(data) {
            let dateValid = Date.parse(data['validTime'][0]['TimePeriod'][0]['endPosition'][0]);
            let formatDateValid = dateformat(dateValid, 'dddd, mmmm dS');

            let result = {};
            result.text = T.getMessage(agent, 'REPORT_INTRO', [region, formatDateValid]);

            let dangerRating = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['dangerRatings'][0]['DangerRating'];
            if (dangerRating.length > 1) {
                let elevationData = handler.getElevationData(dangerRating);
                result.text += ' ' + T.getMessage(agent, 'FORECAST_LEVEL_DOUBLE', [elevationData.elevationLw, elevationData.dangerLw, elevationData.elevationHi, elevationData.dangerHi]);
            } else {
                result.text += ' ' + T.getMessage(agent, 'FORECAST_LEVEL_SINGLE', [dangerRating[0]['mainValue']]);
            }
            result.text += data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'];
            result.snowComment = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['snowpackStructureComment'];

            result = handler.clearHTML(result);
            console.log(config.images['latest_forecast'].replace('{{0}}', data['$']['gml:id']));

            agent.add(result.text);
            agent.add(new Card({
                title: T.getMessage(agent, 'FORECAST_CARD_TITLE', [region, dateformat(dateValid, 'dd.mm')]),
                imageUrl: config.images['latest_forecast'].replace('{{0}}', data['$']['gml:id']),
                text: result.snowComment,
                buttonText: T.getMessage(agent, 'FULL_REPORT'),
                buttonUrl: config.fullReport.replace('{{0}}', T.getLanguage(agent))
            }));

        }).catch(function(err) {
            console.error(err);
            agent.add(T.getMessage(agent, 'FORECAST_ERROR'));
        });
    },
    getElevationData: function(dangerRating) {
        let elevationData = {};

        //TODO elevation might be "treeline"
        dangerRating.forEach(function(element) {
            let elevation = element.validElevation[0]['$']['xlink:href'].replace('ElevationRange_', '');
            if (elevation.endsWith('Hi')) {
                elevationData.elevationHi = elevation.replace('Hi', '');
                elevationData.dangerHi = element.mainValue[0];
            }
            if (elevation.endsWith('Lw')) {
                elevationData.elevationLw = elevation.replace('Lw', '');;
                elevationData.dangerLw = element.mainValue[0];
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
        //TODO replace </ br>
        result.text = result.text;
        result.snowComment = result.snowComment;
        return result;
    }
};

module.exports = handler;