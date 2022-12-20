const { Suggestion } = require('dialogflow-fulfillment');

const T = require('../util/translationManager');
const dangerScaleHandler = require('./dangerScaleHandler');

const handler = {
    registerHandler: function(intentMap) {
        intentMap.set('Help Intent', handler.deprecated);
        intentMap.set('Default Welcome Intent', handler.deprecated);
        intentMap.set('Default Fallback Intent', handler.deprecated);
        intentMap.set('Yes Intent', handler.deprecated);
        intentMap.set('No Intent', handler.deprecated);
        intentMap.set('Explain Danger Scale', handler.deprecated);
        intentMap.set('Get Avalanche Forecast', handler.deprecated);
        return intentMap;
    },
    deprecated: function(agent) {
        agent.add(T.getMessage(agent, 'DEPRECATED'));
    }
};

module.exports = handler;