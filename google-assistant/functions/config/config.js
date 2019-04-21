module.exports = Object.freeze({

    debug: true,

    supportedLanguages: ['en', 'de'],
    defaultLanguage: 'en',
    getApiConfig: function(language) {
        return {
            host: 'avalanche.report',
            port: 443,
            path: '/albina_files/latest/{{locale}}.xml'.replace('{{locale}}', language),
            method: 'GET'
        };
    },
    getRegionsConfig: function(mode) {
        return {
            host: 'avalanche.report',
            port: 443,
            path: '/albina_files/latest/' + mode + '_regions.json',
            method: 'GET'
        };
    },

    regionModes: ['fd', 'am', 'pm'],

    images: {
    	'latest_forecast': 'https://avalanche.report/albina_files/latest/{{0}}.jpg',
    	'danger_scale': 'https://cms.avalanche.report/sites/default/files/2019-03/ava_danger_en.png',
    	'danger_scale_5': 'https://cms.avalanche.report/sites/default/files/2019-03/level_5.png',
    	'danger_scale_4': 'https://cms.avalanche.report/sites/default/files/2019-03/level_4.png',
    	'danger_scale_3': 'https://cms.avalanche.report/sites/default/files/2019-03/level_3.png',
    	'danger_scale_2': 'https://cms.avalanche.report/sites/default/files/2019-03/level_2.png',
    	'danger_scale_1': 'https://cms.avalanche.report/sites/default/files/2019-03/level_1.png',
    },

    fullReport: 'https://avalanche.report/albina-web/bulletin/latest?lang={{0}}&region={{1}}',

    hasScreenSupport: function(conv) {
        return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    },
    hasBrowserSupport: function(conv) {
        return conv.surface.capabilities.has('actions.capability.WEB_BROWSER');
    }
});