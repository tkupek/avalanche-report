const dateformat = require('dateformat');
const { Card, Suggestion } = require('dialogflow-fulfillment');

const config = require('../config/config');
const T = require('../util/translationManager');
const geocodingUtil = require('../util/geocodingUtil');
const avalancheReportAPI = require('../util/avalancheReportAPI');
require('../util/utility');


let EXPOSITION_ORD = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

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

        let locale = T.getLanguage(agent)
        return geocodingUtil.geocodeLocation(location, locale)
            .then(resolvedLoc => avalancheReportAPI.mapCoordinatesToRegion(resolvedLoc.coordinates, location))
            .then(regionId => avalancheReportAPI.getAvalancheReportFromAPI(locale, regionId))
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

        dangers = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avProblems'][0]['AvProblem'];

        if(dangers.length > 0) {
            dangers.remove(""); //necessary to fix XML bug

            if(dangers.length == 1) {
                result.dangers = handler.getDangerText(agent, dangers[0], 'FORECAST_DANGER_SINGLE');
            } else {
                result.dangers = handler.getDangerText(agent, dangers[0], 'FORECAST_DANGER_SINGLE');
                result.dangers += ' ' + handler.getDangerText(agent, dangers[1], 'FORECAST_DANGER_SECOND');
            }
        }

        if(config.hasScreenSupport(agent)) {
            handler.buildAgentResponseCard(agent, result, primaryData, time, dateValid, location);
        } else {
            agent.add(result.intro + ' ' + result.dangers);
            // TODO implement this via additional "full report" intent
            // agent.add(result.text);
        }      
    },
    getDangerText(agent, danger, message) {
        if(danger.type[0] === 'favourable situation') {
            elevationText = handler.getExpositionElevationText(agent, danger);
            return T.getMessage(agent, 'FORECAST_DANGER_FAV', [elevationText])
        }

        dangerText = T.getMessage(agent, 'DANGERS_' + danger.type)
        expositionText = handler.getExpositionText(agent, danger.validAspect);
        elevationText = handler.getExpositionElevationText(agent, danger);
        return T.getMessage(agent, message, [dangerText, expositionText, elevationText])
    },
    getExpositionElevationText(agent, danger) {
        elevation = handler.getElevationData(agent, [danger]);
        var key;
        if(elevation.elevationHi) {
            return T.getMessage(agent, 'EXPOSITION_ELEVATIONHI', [elevation.elevationHi]);
        }
        if(elevation.elevationLw) {
            return T.getMessage(agent, 'EXPOSITION_ELEVATIONLW', [elevation.elevationLw]);
        }
        if(elevation.elevationRange) {
            return T.getMessage(agent, 'EXPOSITION_ELEVATION_RANGE', [elevation.elevationRangeFrom, elevation.elevationRangeTo]);
        }

        return '';
    },
    getExpositionText(agent, expositionData) {
        expositions = []
        expositionData.forEach(element => {
            expositions.push(element['$']['xlink:href'].replace('AspectRange_', ''))
        });
        
        expositions.sort( ( a, b ) => EXPOSITION_ORD.indexOf(a) - EXPOSITION_ORD.indexOf(b) );

        if(expositions.length == 8) {
            return T.getMessage(agent, 'EXPOSITIONS_all');
        }
        if(expositions.length == 1) {
            exText1 = T.getMessage(agent, 'EXPOSITIONS_' + expositions[0]);
            return T.getMessage(agent, 'EXPOSITIONS_single', [exText1]);
        }
        if(expositions.length == 2) {
            exText1 = T.getMessage(agent, 'EXPOSITIONS_' + expositions[0]);
            exText2 = T.getMessage(agent, 'EXPOSITIONS_' + expositions[1]);
            return T.getMessage(agent, 'EXPOSITIONS_double', [exText1, exText2]);
        }
        
        do {
            expositions.rotate(1)
            distance = Math.abs(EXPOSITION_ORD.indexOf(expositions[0]) - EXPOSITION_ORD.indexOf(expositions[expositions.length -1]));
        } while(distance == 1 || distance == EXPOSITION_ORD.length -1);

        exText1 = T.getMessage(agent, 'EXPOSITIONS_' + expositions[0]);
        exText2 = T.getMessage(agent, 'EXPOSITIONS_' + expositions[parseInt((expositions.length -1) /2)]);
        exText3 = T.getMessage(agent, 'EXPOSITIONS_' + expositions[expositions.length -1]);

        return T.getMessage(agent, 'EXPOSITIONS_multi', [exText1, exText2, exText3]);
    },
    buildAgentResponseCard(agent, result, primaryData, time, dateValid, location) {
        if(time === config.OBS_TIME.AM) {
            result.intro += ' ' + T.getMessage(agent, 'FORECAST_PM_NOTICE');
        }
        
        agent.add(result.intro + ' ' + result.dangers);
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
                return T.getMessage(agent, 'FORECAST_LEVEL_SINGLE_' + time, [handler.getDangerLevelDescription(agent, elevationData.dangerLw)]);
            } else {
                return T.getMessage(agent, 'FORECAST_LEVEL_DOUBLE_' + time, [elevationData.elevationLw, handler.getDangerLevelDescription(agent, elevationData.dangerLw), elevationData.elevationHi, handler.getDangerLevelDescription(agent, elevationData.dangerHi)]);
            }
        } else {
            return T.getMessage(agent, 'FORECAST_LEVEL_SINGLE_' + time, [handler.getDangerLevelDescription(agent, dangerRating[0]['mainValue'])]);
        }
    },
    getDangerLevelDescription: function(agent, level) {
        return T.getMessage(agent, 'FORECAST_LEVEL_' + level);
    },
    getElevationData: function(agent, dangerRating) {
        let elevationData = {};

        dangerRating.forEach(function(element) {
            let range = element.validElevation[0]['elevationRange']
            if(range) {
                elevationData.elevationRange = true;
                elevationData.elevationRangeFrom = handler.getElevationText(agent, range[0].begionPosition[0]);
                elevationData.elevationRangeTo = handler.getElevationText(agent, range[0].endPosition[0]);
            } else {
                let elevation = element.validElevation[0]['$']['xlink:href'].replace('ElevationRange_', '');
                if (elevation.endsWith('Hi')) {
                    elevationData.elevationHi = handler.getElevationText(agent, elevation.replace('Hi', ''));
                    element.mainValue && (elevationData.dangerHi = element.mainValue[0]);
                }
                if (elevation.endsWith('Lw')) {
                    elevationData.elevationLw = handler.getElevationText(agent, elevation.replace('Lw', ''));
                    element.mainValue && (elevationData.dangerLw = element.mainValue[0]);
                }
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