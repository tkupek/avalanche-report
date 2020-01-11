const Alexa = require('ask-sdk-core');
const MESSAGES = require('../config/messages');
const config = require('../config/config');

const locale = require("locale");
const supported = new locale.Locales(config.supportedLanguages, config.defaultLanguage);

const translationManager = {
    getLanguage(handlerInput) {
        console.log('trigger')
        userloc = Alexa.getLocale(handlerInput.requestEnvelope)
        console.log(userloc)
        res = (new locale.Locales(userloc)).best(supported).toString()
        console.log(res)
        return res;
    },
    random(input) {
        return Array.isArray(input) ? input[Math.floor(Math.random() * input.length)] : input;
    }
};

module.exports = translationManager;
