const Alexa = require('ask-sdk-core');
const config = require('../config/config');
const T = require('../util/translationManager');
const AlexaUtil = require('../util/alexaUtil');

const handler = {
    canHandle: function(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplainDangerScale';
    },
    handle: function(handlerInput, continued) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        let selectedLevel;
        if (slots && slots.number && slots.number.value) {
          selectedLevel = parseInt(slots.number.value);
        }

        if(!continued) {
            handlerInput = AlexaUtil.clear(handlerInput)
        }

        if (!selectedLevel && sessionAttributes.dangerscaleLevel) {
            let parameter = sessionAttributes.dangerscaleLevel;
            selectedLevel = parameter > 5 ? 1 : parameter;
        }

        if (selectedLevel && (selectedLevel < 1 || selectedLevel > 5)) {
            speakOutput = handlerInput.t('DANGER_LEVEL_UNKNOWN');
            return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
        }

        let response = handlerInput.responseBuilder
        if (selectedLevel) {
            speakOutput = handlerInput.t('DANGER_LEVEL_INTRO_' + selectedLevel);

            if(config.hasScreenSupport(handlerInput)) {
                const template = "BodyTemplate2";
                const imageUrl = config.images['danger_scale_' + selectedLevel];
                const title = handlerInput.t('DANGER_LEVEL_X_CARD_TITLE', [selectedLevel]);
                const text = handlerInput.t('DANGER_LEVEL_' + selectedLevel);
                response = AlexaUtil.getDisplay(response, template, imageUrl, title, text)
                response.addHintDirective(handlerInput.t('SUGGESTION_DL_1', [(selectedLevel + 1) > 5 ? '1' : selectedLevel + 1]));
            }

            sessionAttributes.context = 'dangerscale';
            sessionAttributes.dangerscaleLevel = selectedLevel + 1;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        } else {
            speakOutput = handlerInput.t('DANGER_LEVEL_INTRO');

            if(config.hasScreenSupport(handlerInput)) {
                const template = "BodyTemplate2";
                const imageUrl = config.images['danger_scale']
                const title = handlerInput.t('DANGER_LEVEL_CARD_TITLE');
                const text = handlerInput.t('DANGER_LEVEL');
                response = AlexaUtil.getDisplay(response, template, imageUrl, title, text)
                response.addHintDirective(handlerInput.t('SUGGESTION_DL_1', ['3']))
            }
        }

        return response.speak(speakOutput).reprompt(handlerInput.t('HELP')).getResponse();
    }
};

module.exports = handler;