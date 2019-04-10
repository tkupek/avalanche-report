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

    hasScreenSupport: function(conv) {
        return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    },
    hasBrowserSupport: function(conv) {
        return conv.surface.capabilities.has('actions.capability.WEB_BROWSER');
    }
});