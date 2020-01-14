const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const languageStrings = require('./config/messages');
const AlexaUtil = require('./util/alexaUtil');
const T = require('./util/translationManager');
const config = require('./config/config');

const ForecastIntentHandler = require('./handler/forecastHandler')
const DangerScaleIntentHandler = require('./handler/dangerScaleHandler')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME');

        let response = handlerInput.responseBuilder;
        console.log(config.hasScreenSupport(handlerInput))
        if(config.hasScreenSupport(handlerInput)) {
        	const template = "BodyTemplate6";
            const text = speakOutput;
            response = AlexaUtil.getDisplay(response, template, undefined, undefined, text)
            response.addHintDirective(handlerInput.t('SUGGESTION_WELCOME_1') + ' ' + handlerInput.t('SUGGESTION_NO_REGION_' + T.random([1,2,3])))
        }

        return response.speak(speakOutput).reprompt(handlerInput.t('HELP')).getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent');
    },
    handle(handlerInput) {
    	const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let context = sessionAttributes.context;

        if(context == 'dangerscale') {
            return DangerScaleIntentHandler.handle(handlerInput, true);
        } else {
        	handlerInput = AlexaUtil.clear(handlerInput);
            return FallbackIntentHandler.handle(handlerInput);
        }
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
    	handlerInput = AlexaUtil.clear(handlerInput);
    	return HelpIntentHandler.handle(handlerInput)
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
    	handlerInput = AlexaUtil.clear(handlerInput);
        const speakOutput = handlerInput.t('FALLBACK');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
    	handlerInput = AlexaUtil.clear(handlerInput);
        const speakOutput = handlerInput.t('FORECAST_ERROR');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings,
            returnObjects: true
        }).then((t) => {
            handlerInput.t = (...args) => T.random(t(...args));
        });
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ForecastIntentHandler,
        DangerScaleIntentHandler,
        HelpIntentHandler,
        YesIntentHandler,
        NoIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,)
    // .addErrorHandlers(
    //     ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor)
    .lambda();