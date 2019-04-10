const MESSAGES = require('../config/messages');
const config = require('../config/config');

const locale = require("locale");
const supported = new locale.Locales(config.supportedLanguages, config.defaultLanguage);

const translationManager = {
    getMessage(agent, key, args) {
        let messagesLocale = MESSAGES[translationManager.getLanguage(agent)];

        let value = translationManager.random(messagesLocale.translation[key]);
        value = translationManager.fillArgs(value, args);

        return value;
    },
    fillArgs(value, args) {
        if(!args || !Array.isArray(args)) {
            return value;
        }

        for (let i = 0; i < args.length; i++) {
            value && (value = value.replace('{{' + i + '}}', args[i]));
        }
        return value;
    },
    getLanguage(agent) {
        return (new locale.Locales(agent.locale)).best(supported).toString();
    },
    random(input) {
        return Array.isArray(input) ? input[Math.floor(Math.random() * input.length)] : input;
    }
};

module.exports = translationManager;
