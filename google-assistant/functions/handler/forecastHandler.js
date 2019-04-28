const dateformat = require('dateformat');
const { Card, Suggestion } = require('dialogflow-fulfillment');

const config = require('../config/config');
const T = require('../util/translationManager');
const geocodingUtil = require('../util/geocodingUtil');
const avalancheReportAPI = require('../util/avalancheReportAPI');



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

        return geocodingUtil.geocodeLocation(location)
            .then(resolvedLoc => avalancheReportAPI.mapCoordinatesToRegion(resolvedLoc.coordinates, location))
            .then(regionId => avalancheReportAPI.getAvalancheReportFromAPI(agent, regionId))
            .then(reportData => handler.buildAgentResponse(agent, reportData, location))
            .catch(err => handler.buildAgentError(agent, 'FORECAST_ERROR', err))
    },
    buildAgentError: function(agent, message, err) {
        if(err && !config.ERRORS[err]) {
            console.error(err);
        }
        agent.add(T.getMessage(agent, message));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_NO_REGION_1')));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_NO_REGION_2')));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_NO_REGION_3')));
    },
    buildAgentResponse: function(agent, data, location) {
        config.debug && console.log('build agent response [' + JSON.stringify(data) + ']');

        let primaryData = data[config.OBS_TIME.AM];
        let time = config.OBS_TIME.FULL;

        if(data[config.OBS_TIME.PM]) {
            let period = agent.parameters['period'];
            if (period && period === config.OBS_TIME.PM) {
                primaryData = data[config.OBS_TIME.PM];
                time = config.OBS_TIME.PM;
            } else {
                time = config.OBS_TIME.AM;
            }
        }
        
        dateformat.i18n = T.getMessage(agent, 'DATES');
        let dateValid = Date.parse(primaryData['validTime'][0]['TimePeriod'][0]['endPosition'][0]);
        let formatDateValid = dateformat(dateValid, 'dddd, ' + (T.getLanguage(agent) === 'en' ? 'dS' : 'd.') + ' mmmm');

        let result = {};
        result.intro = T.getMessage(agent, 'REPORT_INTRO', [location, formatDateValid]);
        result.intro += ' ' + handler.getDangerRating(agent, primaryData, time);
        if(time === config.OBS_TIME.AM) {
            result.intro += ' ' + handler.getDangerRating(agent, data[config.OBS_TIME.PM], config.OBS_TIME.PM);
        }
        result.text = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'][0];
        result.highlight = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityHighlights'][0];
        result = handler.clearHTML(result);

        if(config.hasScreenSupport(agent)) {
            handler.buildAgentResponseCard(agent, result, primaryData, time, dateValid, location);
        } else {
            agent.add(result.intro + ' ' + result.highlight);
            agent.add(result.text);
        }      
    },
    buildAgentResponseCard(agent, result, primaryData, time, dateValid, location) {
        if(time === config.OBS_TIME.AM) {
            result.intro += ' ' + T.getMessage(agent, 'FORECAST_PM_NOTICE');
        }
        
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
            if(elevationData.dangerLw === elevationData.dangerHi) {
                return T.getMessage(agent, 'FORECAST_LEVEL_SINGLE_' + time, [elevationData.dangerLw]);
            } else {
                return T.getMessage(agent, 'FORECAST_LEVEL_DOUBLE_' + time, [elevationData.elevationLw, elevationData.dangerLw, elevationData.elevationHi, elevationData.dangerHi]);
            }
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
    clearHTML: function(result) {
        result.intro && (result.intro = result.intro.trim().replace(/<(?:.|\n)*?> /gm, ''));
        result.text && (result.text = result.text.trim().replace(/<(?:.|\n)*?> /gm, ''));
        result.highlight && (result.highlight = result.highlight.trim().replace(/<(?:.|\n)*?> /gm, ''));
        return result;
    },
    getElevationText: function(agent, elevation) {
        return elevation === 'Treeline' ? T.getMessage(agent, 'FORECAST_TREELINE') : elevation + 'm';
    }
}

module.exports = handler;