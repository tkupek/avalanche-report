const messages = {
    'en': {
        translation: {
            'WELCOME': 'Welcome to avalanche forecast. What region are you interested in? Examples are Tyrol, Stubai, South Tyrol or Trentino West.',
            'FALLBACK': 'Sorry, I did not get that. Can you try again?',
            'HELP': 'You can ask me for the latest avalanche forecast for a region in Tyrol, South Tyrol or Trentino. Examples are Stubai, Tyrol Lienz, Trentino Center or Bolzano. I can also explain you the european avalanche danger scale. What would you like to hear?',
            'NO_REGION': ['What region are you interested in? Examples are Tyrol, Stubai, South Tyrol or Trentino West.', 'What region do you need the forecast? Examples are Tyrol Center, Lienz, South Tyrol or Trentino East.'],

            'DANGER_LEVEL_INTRO': 'The avalanche danger is evaluated with the five-levelled European avalanche danger scale. The levels are described by three different parameters: Probability of avalanche release, distribution of hazardous sites as well as size and frequency of expected avalanches.',
            'DANGER_LEVEL': 'The danger level always applies to a region with an area of larger than 100 km² and not to a specific individual slope. The avalanche danger described is always a forecast with uncertainties. It should always be checked on site. Ask me for a specific danger level to learn more.',
            'DANGER_LEVEL_INTRO_5': 'Danger level 5, very high, stands for an extraordinary avalanche situation. Numerous very large and extreme natural avalanches can be expected. These can reach roads and settlements in the valley. Do you want to inform about the next level?',
            'DANGER_LEVEL_INTRO_4': 'Danger level 4, high, stands for a very critical avalanche situation. Natural and often very large avalanches are likely. Avalanches can easily be triggered on many steep slopes. Remote triggering is typical. Whumpf sounds and shooting cracks occur frequently. Do you want to check the next level?',
            'DANGER_LEVEL_INTRO_3': 'Danger level 3, considerable, stands for a critical avalanche situation. Whumpf sounds and shooting cracks are typical. Avalanches can easily be triggered, particularly on steep slopes with the aspect and elevation indicated on avalanche.report. Natural avalanches and remote triggering may occur. Do you want to learn about the next level?',
            'DANGER_LEVEL_INTRO_2': 'Danger level 2, moderate, stands for mostly favorable avalanche situation. Alarm signs can occur in isolated cases. Avalanches can be triggered in particular on very steep slopes with the aspect and elevation indicated on avalanche.report. Large natural avalanches are unlikely. Do you want information about the next level?',
            'DANGER_LEVEL_INTRO_1': 'Danger level 1, low, stands for a generally favourable avalanche situation. No alarm signs present. Avalanches can only be triggered in isolated cases, in particular on extremely steep slopes. Do you want to see the next level?',
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
            'FULL_REPORT': 'Show full report',

            'SUGGESTION_WELCOME_1': 'forecast',
            'SUGGESTION_WELCOME_2': 'dangerscale',
            'SUGGESTION_WELCOME_3': 'help',

            'SUGGESTION_DL_UNKNOWN_1': 'explain level 3',
            'SUGGESTION_DL_UNKNOWN_2': 'check the forecast',
            'SUGGESTION_DL_1': 'explain level {{0}}',
            'SUGGESTION_DL_2': 'check forecast',
            'SUGGESTION_DL_3': 'explain level 3',
            'SUGGESTION_DL_4': 'forecast',

            'SUGGESTION_NO_REGION_3': 'tyrol',
            'SUGGESTION_NO_REGION_3': 'stubai',
            'SUGGESTION_NO_REGION_3': 'south tyrol',
            'SUGGESTION_NO_REGION_3': 'trentino'
        }
    },
    'de': {
        translation: {
            'WELCOME': 'Willkommen zur Lawinenvorhersage. Welche Region interessiert dich? Beispiele sind Tirol, Stubai, Südtirol oder Trentino West.',
            'FALLBACK': 'Entschuldige, das habe ich nicht verstanden. Kannst du es wiederholen?',
            'HELP': 'Du kannst mich nach dem neusten Lawinenreport für eine Region in Tirol, Südtirol oder Trentino fragen. Beispiele sind das Stubaital, Lienz, Trentino Zentral oder Bozen. Ich kann dir außerdem etwas über die europäische Lawinengefahrenstufen erzählen. Was würdest du gerne hören?',
            'NO_REGION': ['Welche Region interessiert dich? Beispiele sind Tirol, Stubai, Südtirol oder Trentino West.', 'Für welche Region möchtest du die Vorhersage? Beispiele sind Tirol Zentral, Lienz, Südtirol oder Trentino Ost.'],

            'DANGER_LEVEL_INTRO': 'Die Lawinenvorhersage beschreibt die Lawinengefahr mit der fünfteiligen europäischen Lawinengefahrenstufenskala. Dabei werden die fünf Gefahrenstufen durch drei verschiedene Parameter beschrieben: Die Auslösewahrscheinlichkeit von Lawinen, der Umfang der Gefahrenstellen bzw. die Größe und Häufigkeit der zu erwartenden Lawinen.',
            'DANGER_LEVEL': 'Die Gefahrenstufe gilt immer für eine Region mit einer Fläche von >100 km² und nicht für einen bestimmten Einzelhang. Die auf lawinen.report beschriebene Lawinengefahr ist immer eine Prognose, die mit Unsicherheiten behaftet ist. Sie sollte vor Ort immer überprüft werden.',
            'DANGER_LEVEL_INTRO_5': 'Gefahrenstufe 5, sehr groß, steht für eine außerordentliche Lawinensituation. Viele sehr große und extreme spontane Lawinen sind zu erwarten. Diese können Straßen und Siedlungen in Tallagen erreichen. Möchtest du etwas über die nächste Stufe erfahren?',
            'DANGER_LEVEL_INTRO_4': 'Gefahrenstufe 4, groß, steht für eine sehr kritische Lawinensituation. Spontane, oft auch sehr große Lawinen sind wahrscheinlich. An vielen Steilhängen können Lawinen leicht ausgelöst werden. Fernauslösungen sind typisch. Wummgeräusche und Risse sind häufig. Möchtest du etwas über die nächste Stufe lernen?',
            'DANGER_LEVEL_INTRO_3': 'Gefahrenstufe 3, erheblich, steht für eine kritische Lawinensituation. Wummgeräusche und Risse sind typisch. Lawinen können vor allem an Steilhängen der im Bericht angegebenen Expositionen und Höhenlagen leicht ausgelöst werden. Spontane Lawinen und Fernauslösungen sind möglich. Soll ich die nächste Stufe erklären?',
            'DANGER_LEVEL_INTRO_2': 'Gefahrenstufe 2, mäßig, steht für eine mehrheitlich günstige Lawinensituation. Alarmzeichen können vereinzelt auftreten. Lawinen können vor allem an sehr steilen Hängen der im lawinen.report angegebenen Expositionen und Höhenlagen ausgelöst werden. Größere spontane Lawinen sind nicht zu erwarten. Möchtest du Informationen zur nächsten Stufe?',
            'DANGER_LEVEL_INTRO_1': 'Gefahrenstufe 1, gering, steht für eine allgemein günstige Lawinensituation. Es sind keine Alarmzeichen feststellbar. Lawinen können nur vereinzelt, vor allem an extrem steilen Hängen ausgelöst werden. Soll ich die nächste Stufe aufrufen?',
            'DANGER_LEVEL_5': 'Viele sehr große und extreme spontane Lawinen sind zu erwarten. Diese können Straßen und Siedlungen in Tallagen erreichen. Empfehlungen für Personen im ungesicherten Gelände Verzicht auf Schneesport abseits geöffneter Abfahrten und Routen empfohlen.',
            'DANGER_LEVEL_4': 'Spontane, oft auch sehr große Lawinen sind wahrscheinlich. An vielen Steilhängen können Lawinen leicht ausgelöst werden. Fernauslösungen sind typisch. Wummgeräusche und Risse sind häufig. Empfehlungen für Personen im ungesicherten Gelände: Sich auf mäßig steiles Gelände beschränken. Auslaufbereiche großer Lawinen beachten. Unerfahrene bleiben auf den geöffneten Abfahrten und Routen. Für wenige Tage des Winters prognostiziert.',
            'DANGER_LEVEL_3': 'Wummgeräusche und Risse sind typisch. Lawinen können vor allem an Steilhängen der im lawinen.report angegebenen Expositionen und Höhenlagen leicht ausgelöst werden. Spontane Lawinen und Fernauslösungen sind möglich. Empfehlungen für Personen im ungesicherten Gelände: Für Wintersportler kritischste Situation! Optimale Routenwahl und Anwendung von risikomindernden Maßnahmen sind nötig. Sehr steile Hänge der im lawinen.report angegebenen Expositionen und Höhenlagen meiden. Unerfahrene bleiben besser auf den geöffneten Abfahrten und Routen. ',
            'DANGER_LEVEL_2': 'Alarmzeichen können vereinzelt auftreten. Lawinen können vor allem an sehr steilen Hängen der im lawinen.report angegebenen Expositionen und Höhenlagen ausgelöst werden. Größere spontane Lawinen sind nicht zu erwarten. Empfehlungen für Personen im ungesicherten Gelände: Vorsichtige Routenwahl, vor allem an Hängen der im lawinen.report angegebenen Expositionen und Höhenlagen. Sehr steile Hänge einzeln befahren. Besondere Vorsicht bei ungünstigem Schneedeckenaufbau (Altschneeproblem).',
            'DANGER_LEVEL_1': 'Es sind keine Alarmzeichen feststellbar. Lawinen können nur vereinzelt, vor allem an extrem steilen Hängen ausgelöst werden. Empfehlungen für Personen im ungesicherten Gelände: Extrem steile Hänge einzeln befahren und Absturzgefahr beachten.',

            'DANGER_LEVEL_UNKNOWN': 'Die europäische Lawinengefahrenstufenskala geht von eins bis fünf. Über welche Stufe möchtest du mehr erfahren?',
            'DANGER_LEVEL_X_CARD_TITLE': 'Gefahrenstufe {{0}} erklärt',
            'DANGER_LEVEL_CARD_TITLE': 'Die europäische Lawinengefahrenstufenskala',

            'REPORT_INTRO': 'Hier ist der aktuelle Bericht {{0}} gültig für {{1}}.',
            'FORECAST_LEVEL_SINGLE': 'Die Gefahrenstufe ist {{0}}.',
            'FORECAST_LEVEL_DOUBLE': 'Die Gefahrenstufe unter {{0}} ist {{1}}, über {{2}} bei {{3}}.',
            'FORECAST_ERROR': 'Entschuldige, aktuell ist die Vorhersage nicht verfügbar.',
            'FORECAST_CARD_TITLE': 'Avalanche report {{0}} valid until {{1}}',
            'FORECAST_TREELINE': 'der Waldgrenze',
            'FULL_REPORT': 'Ganzen Bericht lesen',

            'SUGGESTION_WELCOME_1': 'vorhersage',
            'SUGGESTION_WELCOME_2': 'gefahrenstufen',
            'SUGGESTION_WELCOME_3': 'hilfe',

            'SUGGESTION_DL_UNKNOWN_1': 'erkläre stufe 3',
            'SUGGESTION_DL_UNKNOWN_2': 'warnbericht',
            'SUGGESTION_DL_1': 'erkläre stufe {{0}}',
            'SUGGESTION_DL_2': 'vorhersage',
            'SUGGESTION_DL_3': 'erkläre stufe 3',
            'SUGGESTION_DL_4': 'vorhersage',

            'SUGGESTION_NO_REGION_3': 'tirol',
            'SUGGESTION_NO_REGION_3': 'stubai',
            'SUGGESTION_NO_REGION_3': 'südtirol',
            'SUGGESTION_NO_REGION_3': 'trentino'
        }
    }
};

module.exports = messages;