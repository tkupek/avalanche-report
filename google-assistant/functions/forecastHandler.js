const https = require('https');
const xmlparser = require('xml2js').parseString;
const dateformat = require('dateformat');

const config = require('./config/config');
const T = require('./util/translationManager');

const handler = {
    registerHandler: function(agent, intentMap) {
        if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
            intentMap.set('Get Avalanche Forecast', handler.forecastGA);
        } else {
            intentMap.set('Get Avalanche Forecast', handler.forecast);
        }
        return intentMap;
    },
    forecast: function(agent) {
        return handler.getAvalancheReportData(agent).then(function(result) {
            agent.add(result.text);
        }).catch(function() {
            agent.add(T.getMessage(agent, 'FORECAST_ERROR'));
        });
    },
    forecastGA: function(agent) {
        let conv = agent.conv();

        return handler.getAvalancheReportData(agent).then(function(result) {
            conv.close(result.text)
            agent.add(conv);
        }).catch(function() {
            conv.close(T.getMessage(agent, 'FORECAST_ERROR'))
            agent.add(conv);
        });
    },
    getAvalancheReportData: function(agent) {
        let region = agent.parameters['region'];

        if (!region) {
            console.error('no region selected for forecast');
            return;
        }

        return new Promise(function(resolve, reject) {
            handler.getAvalancheReportFromAPI(agent, region).then(function(data) {
                let dateValid = Date.parse(data['validTime'][0]['TimePeriod'][0]['endPosition'][0]);
                let formatDateValid = dateformat(dateValid, 'dddd, mmmm dS');

                let result = {};
                result.text = T.getMessage(agent, 'REPORT_INTRO', [region, formatDateValid]);

                let dangerRating = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['dangerRatings'][0]['DangerRating'];
                if (dangerRating.length > 1) {
                    result.text += ' ' + T.getMessage(agent, 'FORECAST_LEVEL_SINGLE', [dangerRating[1]['mainValue'][0], dangerRating[0]['mainValue']]);
                } else {
                    result.text += ' ' + T.getMessage(agent, 'FORECAST_LEVEL_SINGLE', [dangerRating[0]['mainValue']]);
                }
                result.text += data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'];

                resolve(result);
            }).catch(function(err) {
                console.error(err);
                reject();
            });
        });
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
    }
};

module.exports = handler;