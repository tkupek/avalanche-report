module.exports = Object.freeze({

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

    regionMapping: {
        'Tyrol': 'AT-07-10',
        'Tyrol Stubai': 'AT-07-20',
        'Tyrol Lienz': 'AT-07-26',
        'South Tyrol': 'IT-32-BZ',
        'Trentino Central': 'IT-32-TN-12',
        'Trentino East West': 'IT-32-TN-02'
    },

    images: {
    	'latest_forecast': 'https://avalanche.report/albina_files/latest/{{0}}.jpg',
    	'danger_scale': 'https://cms.avalanche.report/sites/default/files/2019-03/ava_danger_en.png',
    	'danger_scale_5': 'https://cms.avalanche.report/sites/default/files/2019-03/level_5.png',
    	'danger_scale_4': 'https://cms.avalanche.report/sites/default/files/2019-03/level_4.png',
    	'danger_scale_3': 'https://cms.avalanche.report/sites/default/files/2019-03/level_3.png',
    	'danger_scale_2': 'https://cms.avalanche.report/sites/default/files/2019-03/level_2.png',
    	'danger_scale_1': 'https://cms.avalanche.report/sites/default/files/2019-03/level_1.png',
    },

    fullReport: 'https://avalanche.report/albina-web/bulletin/latest?lang={{0}}',

    hasScreenSupport: function(conv) {
        return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    },
    hasBrowserSupport: function(conv) {
        return conv.surface.capabilities.has('actions.capability.WEB_BROWSER');
    }
});