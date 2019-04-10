const messages = {
    'en': {
        translation: {
            'WELCOME': 'Welcome to avalanche forecast. What region are you interested in? Examples are Tyrol, Stubai, South Tyrol or Trentino West.',
            'FALLBACK': 'Sorry, I did not get that. Can you try again?',
            'HELP': 'You can ask me for the latest avalanche forecast for a region in Tyrol, South Tyrol or Trentino. Examples are Stubai, Tyrol Lienz, Trentino Center or Bolzano. I can also explain you the european avalanche danger scale. What would you like to hear?',
            'NO_REGION': ['What region are you interested in? Examples are Tyrol, Stubai, South Tyrol or Trentino West.', 'What region do you need the forecast? Examples are Tyrol Center, Lienz, South Tyrol or Trentino East.'],

            'DANGER_LEVEL_INTRO': 'The avalanche danger is evaluated with the five-levelled European avalanche danger scale. The levels are described by three different parameters: Probability of avalanche release, distribution of hazardous sites as well as size and frequency of expected avalanches.',
            'DANGER_LEVEL': 'The danger level always applies to a region with an area of larger than 100 km² and not to a specific individual slope. The avalanche danger described is always a forecast with uncertainties. It should always be checked on site. Ask me for a specific danger level to learn more.',
            'DANGER_LEVEL_INTRO_5': 'Danger level 5, very high, stands for an extraordinary avalanche situation. Check the card for a detailed explanation. Do you want to inform about the next level?',
            'DANGER_LEVEL_INTRO_4': 'Danger level 4, high, stands for a very critical avalanche situation. Check the card for a detailed explanation. Do you want to check the next level?',
            'DANGER_LEVEL_INTRO_3': 'Danger level 3, considerable, stands for a critical avalanche situation. Check the card for a detailed explanation. Do you want to learn about the next level?',
            'DANGER_LEVEL_INTRO_2': 'Danger level 2, moderate, stands for mostly favorable avalanche situation. Check the card for a detailed explanation. Do you want information about the next level?',
            'DANGER_LEVEL_INTRO_1': 'Danger level 1, low, stands for a generally favourable avalanche situation. Check the card for a detailed explanation. Do you want to see the next level?',
            'DANGER_LEVEL_5': 'Numerous very large and extreme natural avalanches can be expected. These can reach roads and settlements in the valley. Recommendations for backcountry recreationists: You are advised not to engage in winter sports beyond open ski runs and trails.',
            'DANGER_LEVEL_4': 'Natural and often very large avalanches are likely. Avalanches can easily be triggered on many steep slopes. Remote triggering is typical. Whumpf sounds and shooting cracks occur frequently. Recommendations for backcountry recreationists: Stay on moderately steep terrain. Watch out below run out zones of large avalanches. Inexperienced persons should remain on open ski runs and trails. Forecast only on a few days throughout the winter.',
            'DANGER_LEVEL_3': 'Whumpf sounds and shooting cracks are typical. Avalanches can easily be triggered, particularly on steep slopes with the aspect and elevation indicated on avalanche.report. Natural avalanches and remote triggering may occur. The most critical situation for backcountry recreationists. Use terrain effecently and select best possible route and with minimal exposure. Avoid very steep slopes with the aspect and elevation indicated on avalanche.report. Inexperienced persons are advised to remain on open ski runs and trails.',
            'DANGER_LEVEL_2': 'Alarm signs can occur in isolated cases. Avalanches can be triggered in particular on very steep slopes with the aspect and elevation indicated on avalanche.report. Large natural avalanches are unlikely. Backcountry activities should be selected carefully, especially on slopes with the aspect and elevation indicated on avalanche.report. Travel very steep slopes one person at a time. Pay attention to unfavourable snowpack structure (persistent weak layers, old snow problem).',
            'DANGER_LEVEL_1': 'No alarm signs present. Avalanches can only be triggered in isolated cases, in particular on extremely steep slopes. Recommendations for backcountry recreationists: Travel extremely steep slopes one person at a time and mind the danger of falling.',

            'DANGER_LEVEL_UNKNOWN': 'The European avalanche danger scales goes from one to five. About what level do you want to learn more?',
            'DANGER_LEVEL_X_CARD_TITLE': 'Dangerscale level {{0}} explained',
            'DANGER_LEVEL_CARD_TITLE': 'The European avalanche dangerscale',

            'REPORT_INTRO': 'Here is the latest report for {{0}} valid for {{1}}.',
            'FORECAST_LEVEL_SINGLE': 'The danger level is {{0}}.',
            'FORECAST_LEVEL_DOUBLE': 'The danger level below {{0}} is {{1}}, above {{2}} it is {{3}}.',
            'FORECAST_ERROR': 'Sorry, currently the forecast is not available.',
            'FORECAST_CARD_TITLE': 'Avalanche report {{0}} valid until {{1}}',
            'FORECAST_TREELINE': 'the treeline',
            'FULL_REPORT': 'Show full report'
        }
    },
    'de': {
        translation: {

        }
    }
};

module.exports = messages;