const T = require('./util/translationManager');

const handler = {
    registerHandler: function(intentMap) {
        intentMap.set('Help Intent', handler.help);
        intentMap.set('Default Welcome Intent', handler.welcome);
        intentMap.set('Default Fallback Intent', handler.fallback);
        return intentMap;
    },
    welcome: function(agent) {
        agent.add(T.getMessage(agent, 'WELCOME'));
    },
    fallback: function(agent) {
        agent.add(T.getMessage(agent, 'FALLBACK'));
    },
    help: function(agent) {
        agent.add(T.getMessage(agent, 'HELP'));
    }
};

module.exports = handler;