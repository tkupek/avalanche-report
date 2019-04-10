const { Suggestion } = require('dialogflow-fulfillment');

const T = require('../util/translationManager');
const dangerScaleHandler = require('./dangerScaleHandler');

const handler = {
    registerHandler: function(intentMap) {
        intentMap.set('Help Intent', handler.help);
        intentMap.set('Default Welcome Intent', handler.welcome);
        intentMap.set('Default Fallback Intent', handler.fallback);
        intentMap.set('Yes Intent', handler.yes);
        intentMap.set('No Intent', handler.no);
        return intentMap;
    },
    welcome: function(agent) {
        agent.add(T.getMessage(agent, 'WELCOME'));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_WELCOME_1')));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_WELCOME_2')));
        agent.add(new Suggestion(T.getMessage(agent, 'SUGGESTION_WELCOME_3')));
    },
    fallback: function(agent) {
        agent.add(T.getMessage(agent, 'FALLBACK'));
    },
    help: function(agent) {
        agent.add(T.getMessage(agent, 'HELP'));
    },
    yes: function(agent) {
        let context = agent.context.get('dangerscale');
        if(context) {
            dangerScaleHandler.dangerscale(agent);
        } else {
            handler.fallback(agent);
        }
    },
    no: function(agent) {
        agent.add(T.getMessage(agent, 'HELP'));
    }
};

module.exports = handler;