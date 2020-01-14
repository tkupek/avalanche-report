module.exports = Object.freeze({
    debug: true,

    supportedLanguages: ['en', 'de', 'it'],
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
    	'danger_scale': 'https://tkupek.eu/avalanche-forecast/content_files/ava_danger_en.png',
    	'danger_scale_5': 'https://avalanche.report/content_files/level_5.png',
    	'danger_scale_4': 'https://avalanche.report/content_files/level_4.png',
    	'danger_scale_3': 'https://avalanche.report/content_files/level_3.png',
    	'danger_scale_2': 'https://avalanche.report/content_files/level_2.png',
    	'danger_scale_1': 'https://avalanche.report/content_files/level_1.png',
    },

    fullReport: 'https://avalanche.report/albina-web/bulletin/latest?lang={{0}}&region={{1}}',

    hasScreenSupport: function(handlerInput) {
        var hasDisplay =
          handlerInput.requestEnvelope.context &&
          handlerInput.requestEnvelope.context.System &&
          handlerInput.requestEnvelope.context.System.device &&
          handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
          handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
        return hasDisplay;
    },

    firestoreCollection: 'geocodingCache',
    geocodingCacheDays: 30,

    ERRORS: {
        'CACHE_ERROR': 'CACHE_ERROR',
        'GEOCODE_ERROR': 'GEOCODE_ERROR'
    },
    OBS_TIME: {
        'FULL': 'FULL',
        'AM': 'AM',
        'PM': 'PM'
    }
});