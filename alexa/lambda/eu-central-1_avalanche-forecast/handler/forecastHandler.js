const Alexa = require('ask-sdk-core');
const dateformat = require('dateformat');

const config = require('../config/config');
const T = require('../util/translationManager');
const geocodingUtil = require('../util/geocodingUtil');
const avalancheReportAPI = require('../util/avalancheReportAPI');
const AlexaUtil = require('../util/alexaUtil');
require('../util/utility');


let EXPOSITION_ORD = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

const handler = {
    canHandle: function(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetAvalancheForecast';
    },
    handle: function(handlerInput) {
        handlerInput = AlexaUtil.clear(handlerInput);
        const slots = AlexaUtil.getResolutedSlotValues(handlerInput);

        let location;
        if (slots['location'] && slots['location'].id) {
            location = slots['location'].name;
        } else {
            return handler.buildAgentError(handlerInput, 'NO_REGION');
        }

        let locale = T.getLanguage(handlerInput)
        return geocodingUtil.geocodeLocation(location, locale)
            .then(resolvedLoc => avalancheReportAPI.mapCoordinatesToRegion(resolvedLoc.coordinates, location))
            .then(regionId => avalancheReportAPI.getAvalancheReportFromAPI(locale, regionId))
            .then(reportData => handler.buildAgentResponse(handlerInput, reportData, location))
            .catch(err => handler.buildAgentError(handlerInput, 'FORECAST_ERROR', err))
    },
    buildAgentError: function(handlerInput, message, err) {
        if(err && !config.ERRORS[err]) {
            console.error(err);
        }
        let speakOutput = handlerInput.t(message);
        response = handlerInput.responseBuilder.speak(speakOutput);
        if(message === 'NO_REGION') {
            response.reprompt(speakOutput).getResponse();
        }
        return response;
    },
    buildAgentResponse: function(handlerInput, data, location) {
        const slots = AlexaUtil.getResolutedSlotValues(handlerInput);
        // config.debug && console.log('build agent response [' + JSON.stringify(data) + ']');

        let primaryData = data[config.OBS_TIME.AM];
        let time = config.OBS_TIME.FULL;

        if(data[config.OBS_TIME.PM]) {
            let period;
            if (slots['period'] && slots['period'].id) {
                period = slots['period'].id;
            }

            if (period && period === config.OBS_TIME.PM) {
                primaryData = data[config.OBS_TIME.PM];
                time = config.OBS_TIME.PM;
            } else {
                time = config.OBS_TIME.AM;
            }
        }

        dateformat.i18n = handlerInput.t('DATES');
        let dateValid = Date.parse(primaryData['validTime'][0]['TimePeriod'][0]['endPosition'][0]);
        let formatDateValid = dateformat(dateValid, 'dddd, ' + (T.getLanguage(handlerInput) === 'en' ? 'dS' : 'd.') + ' mmmm');

        let result = {};
        result.intro = handlerInput.t('REPORT_INTRO', [location, formatDateValid]);
        result.intro += ' ' + handler.getDangerRating(handlerInput, primaryData, time);
        if(time === config.OBS_TIME.AM) {
            result.intro += ' ' + handler.getDangerRating(handlerInput, data[config.OBS_TIME.PM], config.OBS_TIME.PM);
        }
        result.text = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'][0];
        result.highlight = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityHighlights'][0];
        result = handler.clearHTML(result);

        let dangers = primaryData['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avProblems'][0]['AvProblem'];
        dangers.remove(""); //necessary to fix XML bug

        if(dangers.length > 0) {
            if(dangers.length == 1) {
                result.dangers = handler.getDangerText(handlerInput, dangers[0], 'FORECAST_DANGER_SINGLE');
            } else {
                result.dangers = handler.getDangerText(handlerInput, dangers[0], 'FORECAST_DANGER_SINGLE');
                result.dangers += ' ' + handler.getDangerText(handlerInput, dangers[1], 'FORECAST_DANGER_SECOND');
            }
        }

        let response = handlerInput.responseBuilder
        if(config.hasScreenSupport(handlerInput)) {
            const template = "BodyTemplate3";
            const imageUrl = config.images['latest_forecast'].replace('{{0}}', primaryData['$']['gml:id']);
            const title = handlerInput.t('FORECAST_CARD_TITLE', [location, formatDateValid]);
            const subtitle = result.highlight;
            const text = result.text;
            response = AlexaUtil.getDisplay(response, template, imageUrl, title, text, subtitle)
        }

        let speakOutput = result.intro;
        result.dangers && (speakOutput += ' ' + result.dangers);
        time === config.OBS_TIME.AM && (speakOutput += ' ' + handlerInput.t('FORECAST_PM_NOTICE'))

        return response.speak(speakOutput).getResponse();
    },
    getDangerText(handlerInput, danger, message) {
        let elevationText;
        if(danger.type[0] === 'favourable situation') {
            elevationText = handler.getExpositionElevationText(handlerInput, danger);
            return handlerInput.t('FORECAST_DANGER_FAV', [elevationText])
        }

        let dangerText = handlerInput.t('DANGERS_' + danger.type)
        let expositionText = handler.getExpositionText(handlerInput, danger.validAspect);
        elevationText = handler.getExpositionElevationText(handlerInput, danger);
        return handlerInput.t(message, [dangerText, expositionText, elevationText])
    },
    getExpositionElevationText(handlerInput, danger) {
        let elevation = handler.getElevationData(handlerInput, [danger]);
        if(!elevation) {
            return handlerInput.t('EXPOSITION_ELEVATION_ALL');
        }
        if(elevation.elevationHi) {
            return handlerInput.t('EXPOSITION_ELEVATIONHI', [elevation.elevationHi]);
        }
        if(elevation.elevationLw) {
            return handlerInput.t('EXPOSITION_ELEVATIONLW', [elevation.elevationLw]);
        }
        if(elevation.elevationRange) {
            return handlerInput.t('EXPOSITION_ELEVATION_RANGE', [elevation.elevationRangeFrom, elevation.elevationRangeTo]);
        }

        return '';
    },
    getExpositionText(handlerInput, expositionData) {
        let expositions = []
        expositionData.forEach(element => {
            expositions.push(element['$']['xlink:href'].replace('AspectRange_', ''))
        });
        
        expositions.sort( ( a, b ) => EXPOSITION_ORD.indexOf(a) - EXPOSITION_ORD.indexOf(b) );

        if(expositions.length == 8) {
            return handlerInput.t('EXPOSITIONS_all');
        }
        if(expositions.length == 1) {
            exText1 = handlerInput.t('EXPOSITIONS_' + expositions[0]);
            return handlerInput.t('EXPOSITIONS_single', [exText1]);
        }
        if(expositions.length == 2) {
            exText1 = handlerInput.t('EXPOSITIONS_' + expositions[0]);
            exText2 = handlerInput.t('EXPOSITIONS_' + expositions[1]);
            return handlerInput.t('EXPOSITIONS_double', [exText1, exText2]);
        }
        
        let distance;
        do {
            expositions.rotate(1)
            distance = Math.abs(EXPOSITION_ORD.indexOf(expositions[0]) - EXPOSITION_ORD.indexOf(expositions[expositions.length -1]));
        } while(distance == 1 || distance == EXPOSITION_ORD.length -1);

        let exText1 = handlerInput.t('EXPOSITIONS_' + expositions[0]);
        let exText2 = handlerInput.t('EXPOSITIONS_' + expositions[parseInt((expositions.length -1) /2)]);
        let exText3 = handlerInput.t('EXPOSITIONS_' + expositions[expositions.length -1]);

        return handlerInput.t('EXPOSITIONS_multi', [exText1, exText2, exText3]);
    },
    getDangerRating: function(handlerInput, data, time) {
        let dangerRating = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['dangerRatings'][0]['DangerRating'];
        if (dangerRating.length > 1) {
            let elevationData = handler.getElevationData(handlerInput, dangerRating);
            if(elevationData.dangerLw === elevationData.dangerHi) {
                return handlerInput.t('FORECAST_LEVEL_SINGLE_' + time, [handler.getDangerLevelDescription(handlerInput, elevationData.dangerLw)]);
            } else {
                return handlerInput.t('FORECAST_LEVEL_DOUBLE_' + time, [elevationData.elevationLw, handler.getDangerLevelDescription(handlerInput, elevationData.dangerLw), elevationData.elevationHi, handler.getDangerLevelDescription(handlerInput, elevationData.dangerHi)]);
            }
        } else {
            return handlerInput.t('FORECAST_LEVEL_SINGLE_' + time, [handler.getDangerLevelDescription(handlerInput, dangerRating[0]['mainValue'])]);
        }
    },
    getDangerLevelDescription: function(handlerInput, level) {
        return handlerInput.t('FORECAST_LEVEL_' + level);
    },
    getElevationData: function(handlerInput, dangerRating) {
        let elevationData = {};

        dangerRating.forEach(function(element) {
            if(!element.validElevation) {
                return;
            }
            let range = element.validElevation[0]['elevationRange'];
            if(range) {
                elevationData.elevationRange = true;
                elevationData.elevationRangeFrom = handler.getElevationText(handlerInput, range[0].beginPosition[0]);
                elevationData.elevationRangeTo = handler.getElevationText(handlerInput, range[0].endPosition[0]);
                return
            }
            let elevation = element.validElevation[0]['$']['xlink:href'].replace('ElevationRange_', '');
            if (elevation.endsWith('Hi')) {
                elevationData.elevationHi = handler.getElevationText(handlerInput, elevation.replace('Hi', ''));
                element.mainValue && (elevationData.dangerHi = element.mainValue[0]);
            }
            if (elevation.endsWith('Lw')) {
                elevationData.elevationLw = handler.getElevationText(handlerInput, elevation.replace('Lw', ''));
                element.mainValue && (elevationData.dangerLw = element.mainValue[0]);
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
    getElevationText: function(handlerInput, elevation) {
        return elevation === 'Treeline' ? handlerInput.t('FORECAST_TREELINE') : elevation + 'm';
    }
}

module.exports = handler;