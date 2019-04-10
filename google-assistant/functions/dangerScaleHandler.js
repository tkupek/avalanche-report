const T = require('./util/translationManager');

const handler = {
    registerHandler: function(agent, intentMap) {
        if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
            intentMap.set('Explain Danger Scale', handler.dangerscaleGA);

        } else {
            intentMap.set('Explain Danger Scale', handler.dangerscale);
        }
        return intentMap;
    },
    dangerscale: function(agent) {
        let selectedLevel = agent.parameters['number'];
        agent.add(handler.getDangerScaleText(selectedLevel));
    },
    dangerscaleGA: function(agent) {
        let selectedLevel = agent.parameters['number'];
        let conv = agent.conv();
        conv.ask(handler.getDangerScaleText(selectedLevel))
        agent.add(conv);
    },
    getDangerscaleText: function(selectedLevel) {
        if (selectedLevel) {
            if (selectedLevel < 1 || selectedLevel > 5) {
                return T.getMessage(agent, 'DANGER_LEVEL_UNKNOWN');
            }
            return T.getMessage(agent, 'DANGER_LEVEL_' + selectedLevel);
        }
        return T.getMessage(agent, 'DANGER_LEVEL' + selectedLevel);
    }
};

module.exports = handler;