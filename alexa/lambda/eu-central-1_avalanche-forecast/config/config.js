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
    	'danger_scale': 'https://cms.avalanche.report/sites/default/files/2019-03/ava_danger_en.png',
    	'danger_scale_5': 'https://cms.avalanche.report/sites/default/files/2019-03/level_5.png',
    	'danger_scale_4': 'https://cms.avalanche.report/sites/default/files/2019-03/level_4.png',
    	'danger_scale_3': 'https://cms.avalanche.report/sites/default/files/2019-03/level_3.png',
    	'danger_scale_2': 'https://cms.avalanche.report/sites/default/files/2019-03/level_2.png',
    	'danger_scale_1': 'https://cms.avalanche.report/sites/default/files/2019-03/level_1.png',
    },

    fullReport: 'https://avalanche.report/albina-web/bulletin/latest?lang={{0}}&region={{1}}',

    hasScreenSupport: function(agent) {
        let conv = agent.conv()
        return conv && conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    },
    hasBrowserSupport: function(agent) {
        let conv = agent.conv()
        return conv && conv.surface.capabilities.has('actions.capability.WEB_BROWSER');
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
    },
    DATEFORMAT: {
        'de': {
                  dayNames: [
                      'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa',
                      'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
                  ],
                  monthNames: [
                      'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',
                      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
                  ],
                  timeNames: [
                      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
                  ]
              },
        'it': {
                  dayNames: [
                      'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab',
                      'Domenicale', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
                  ],
                  monthNames: [
                      'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic',
                      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
                  ],
                  timeNames: [
                      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
                  ]
              },
        'en': {
                  dayNames: [
                      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
                      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
                  ],
                  monthNames: [
                      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
                  ],
                  timeNames: [
                      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
                  ]
              }
    }
});