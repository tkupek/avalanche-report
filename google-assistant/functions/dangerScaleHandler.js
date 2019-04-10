const { Card, Suggestion } = require('dialogflow-fulfillment');

const config = require('./config/config');
const T = require('./util/translationManager');

const handler = {
    registerHandler: function(intentMap) {
        intentMap.set('Explain Danger Scale', handler.dangerscale);
        return intentMap;
    },
    dangerscale: function(agent) {
        let selectedLevel = agent.parameters['number'];

        if (!selectedLevel && agent.context.get('dangerscale')) {
            let context = agent.context.get('dangerscale');
            let parameter = context.parameters['selected-level'];
            if (parameter) {
                selectedLevel = parameter > 5 ? 1 : parameter;
            }
        }

        if (selectedLevel && (selectedLevel < 1 || selectedLevel > 5)) {
            agent.add(T.getMessage(agent, 'DANGER_LEVEL_UNKNOWN'));
            agent.add(new Suggestion('explain level 3'));
            agent.add(new Suggestion('check the forecast'));
            return;
        }

        if (selectedLevel) {
            agent.add(T.getMessage(agent, 'DANGER_LEVEL_INTRO_' + selectedLevel));

            agent.add(new Card({
                title: T.getMessage(agent, 'DANGER_LEVEL_X_CARD_TITLE', [selectedLevel]),
                imageUrl: config.images['danger_scale_' + selectedLevel],
                text: T.getMessage(agent, 'DANGER_LEVEL_' + selectedLevel),
            }));

            agent.add(new Suggestion('yes'));
            agent.add(new Suggestion('explain level ' + ((--selectedLevel < 1) ? '5' : selectedLevel)));
            agent.add(new Suggestion('forecast'));

            agent.context.set({
                'name': 'dangerscale',
                'lifespan': 1,
                'parameters': {
                    'selected-level': selectedLevel
                }
            });
        } else {
            agent.add(T.getMessage(agent, 'DANGER_LEVEL_INTRO'));

            agent.add(new Card({
                title: T.getMessage(agent, 'DANGER_LEVEL_CARD_TITLE'),
                imageUrl: config.images['danger_scale'],
                text: T.getMessage(agent, 'DANGER_LEVEL'),

            }));

            agent.add(new Suggestion('explain level 3'));
            agent.add(new Suggestion('check the forecast'));
        }
    }
};

module.exports = handler;