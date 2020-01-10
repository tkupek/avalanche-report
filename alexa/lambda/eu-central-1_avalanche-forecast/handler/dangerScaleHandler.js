const Alexa = require('ask-sdk-core');
const config = require('../config/config');
const T = require('../util/translationManager');

const handler = {
    canHandle: function(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplainDangerScale';
    },
    handle: function(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        let selectedLevel;
        if (slots && slots.number && slots.number.value) {
          selectedLevel = parseInt(slots.number.value);
        }

        if (!selectedLevel && sessionAttributes.dangerscaleLevel) {
            let parameter = sessionAttributes.dangerscaleLevel;
            selectedLevel = parameter > 5 ? 1 : parameter;
        }

        if (selectedLevel && (selectedLevel < 1 || selectedLevel > 5)) {
            speakOutput = handlerInput.t('DANGER_LEVEL_UNKNOWN');
            return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
        }

        if (selectedLevel) {
            speakOutput = handlerInput.t('DANGER_LEVEL_INTRO_' + selectedLevel);

            sessionAttributes.context = 'dangerscale';
            sessionAttributes.dangerscaleLevel = selectedLevel + 1;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        } else {
            speakOutput = handlerInput.t('DANGER_LEVEL_INTRO');
        }

        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    }
};

module.exports = handler;