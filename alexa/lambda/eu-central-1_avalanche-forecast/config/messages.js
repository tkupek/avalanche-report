const messages = {
    'en': {
        translation: {
            'WELCOME': 'Welcome to the avalanche forecast. What location are you interested in?',
            'FALLBACK': 'Sorry, I did not get that. Can you try again?',
            'HELP': 'You can ask me for the latest avalanche forecast for a region in Tyrol, South Tyrol or Trentino. I can also explain you the european avalanche danger scale. What would you like to hear?',
            'NO_REGION': ['What location are you interested in? Supported regions are Tyrol, South Tyrol and Trentino.', 'For which location do you need the forecast? Supported regions are Tyrol, South Tyrol and Trentino.'],
            'LOCATION_UNSUPPORTED': 'The region you are asking for is not supported. Only data for Tyrol, South Tyrol and Trentino is available.',

            'DANGER_LEVEL_INTRO': 'The avalanche danger is evaluated with the five-levelled European avalanche danger scale. The levels are described by three different parameters: Probability of avalanche release, distribution of hazardous sites as well as size and frequency of expected avalanches. Ask me for a specific level.',
            'DANGER_LEVEL': 'The danger level always applies to a region with an area of larger than 100 km² and not to an individual slope. The avalanche danger described is always a forecast with uncertainties. It should always be checked on site. Ask me for a specific danger level to learn more.',
            'DANGER_LEVEL_INTRO_5': 'Danger level 5, very high, applies for an extraordinary avalanche situation. Numerous very large and extreme natural avalanches can be expected. These can reach roads and settlements in the valley. Do you want to inform about the next level?',
            'DANGER_LEVEL_INTRO_4': 'Danger level 4, high, applies for a very critical avalanche situation. Natural and often very large avalanches are likely. Avalanches can easily be triggered on many steep slopes. Remote triggering is typical. Whumpf sounds and shooting cracks occur frequently. Do you want to check the next level?',
            'DANGER_LEVEL_INTRO_3': 'Danger level 3, considerable, characterises a critical avalanche situation. Whumpf sounds and shooting cracks are typical. Avalanches can easily be triggered, particularly on steep slopes with the aspect and elevation indicated on avalanche.report. Natural avalanches and remote triggering may occur. Do you want to learn more about the next level?',
            'DANGER_LEVEL_INTRO_2': 'Danger level 2, moderate, applies for a mostly favorable avalanche situation. Alarm signs can occur in isolated cases. Avalanches can be triggered in particular on very steep slopes with the aspect and elevation indicated on avalanche.report. Large natural avalanches are unlikely. Do you want information about the next level?',
            'DANGER_LEVEL_INTRO_1': 'Danger level 1, low, characterises a generally favourable avalanche situation. No alarm signs present. Avalanches can only be triggered in isolated cases, in particular on extremely steep slopes. Do you want to see the next level?',
            'DANGER_LEVEL_5': 'Numerous very large and extreme natural avalanches can be expected. These can reach roads and settlements in the valley. Recommendations for backcountry recreationists: You are advised not to engage in winter sports beyond open ski runs and trails.',
            'DANGER_LEVEL_4': 'Natural and often very large avalanches are likely. Avalanches can easily be triggered on many steep slopes. Remote triggering is typical. Whumpf sounds and shooting cracks occur frequently. Recommendations for backcountry recreationists: Stay on moderately steep terrain. Watch out below run out zones of large avalanches. Inexperienced persons should remain on open ski runs and trails. Forecast only on a few days throughout the winter.',
            'DANGER_LEVEL_3': 'Whumpf sounds and shooting cracks are typical. Avalanches can easily be triggered, particularly on steep slopes with the aspect and elevation indicated on avalanche.report. Natural avalanches and remote triggering may occur. The most critical situation for backcountry recreationists. Use terrain effecently and select best possible route and with minimal exposure. Avoid very steep slopes with the aspect and elevation indicated on avalanche.report. Inexperienced persons are advised to remain on open ski runs and trails.',
            'DANGER_LEVEL_2': 'Alarm signs can occur in isolated cases. Avalanches can be triggered in particular on very steep slopes with the aspect and elevation indicated on avalanche.report. Large natural avalanches are unlikely. Backcountry activities should be selected carefully, especially on slopes with the aspect and elevation indicated on avalanche.report. Travel very steep slopes one person at a time. Pay attention to unfavourable snowpack structure (persistent weak layers, old snow problem).',
            'DANGER_LEVEL_1': 'No alarm signs present. Avalanches can only be triggered in isolated cases, in particular on extremely steep slopes. Recommendations for backcountry recreationists: Travel extremely steep slopes one person at a time and mind the danger of falling.',

            'DANGER_LEVEL_UNKNOWN': 'The European avalanche danger scale is a five-level scale from one to five. About what level do you want to learn more?',
            'DANGER_LEVEL_X_CARD_TITLE': 'Danger level {{0}}',
            'DANGER_LEVEL_CARD_TITLE': 'The European avalanche danger scale',

            'REPORT_INTRO': 'Here is the latest report for {{0}}, valid for {{1}}.',
            'FORECAST_LEVEL_SINGLE_FULL': 'The danger level is {{0}}.',
            'FORECAST_LEVEL_DOUBLE_FULL': 'The danger level below {{0}} is {{1}} and {{3}} above {{2}}.',
            'FORECAST_LEVEL_SINGLE_AM': 'The danger level in the morning is {{0}}.',
            'FORECAST_LEVEL_DOUBLE_AM': 'In the morning, the danger level below {{0}} is {{1}} and {{3}} above {{2}}.',
            'FORECAST_LEVEL_SINGLE_PM': 'The danger level in the afternoon is {{0}}.',
            'FORECAST_LEVEL_DOUBLE_PM': 'In the afternoon, the danger level below {{0}} is {{1}} and {{3}} above {{2}}.',

            'FORECAST_LEVEL_1': '1 - low',
            'FORECAST_LEVEL_2': '2 - moderate',
            'FORECAST_LEVEL_3': '3 - considerable',
            'FORECAST_LEVEL_4': '4 - high',
            'FORECAST_LEVEL_5': '5 - very high',
            'FORECAST_LEVEL_n/a': '0 - no snow',

            'FORECAST_ERROR': 'Sorry, currently the forecast is not available.',
            'FORECAST_CARD_TITLE': 'Avalanche report {{0}} valid until {{1}}',
            'FORECAST_TREELINE': 'the treeline',
            'FULL_REPORT': 'Show full report',
            'FORECAST_PM_NOTICE': 'There is a separate report for the afternoon.',
            'FORECAST_DANGER_FAV': 'In general, the avalanche situation is favourable {{0}}.',
            'FORECAST_DANGER_SINGLE': 'There are problems by {{0}} on {{1}} {{2}}.',
            'FORECAST_DANGER_SECOND': 'There are further problems through {{0}} on {{1}} {{2}}.',

            'DANGERS_drifting snow': 'wind-drifted snow',
            'DANGERS_old snow': 'persistent weak layers',
            'DANGERS_new snow': 'new snow',
            'DANGERS_wet snow': 'wet snow',
            'DANGERS_gliding snow': 'gliding snow',

            'EXPOSITIONS_n': 'north',
            'EXPOSITIONS_nw': 'northwest',
            'EXPOSITIONS_w': 'west',
            'EXPOSITIONS_sw': 'southwest',
            'EXPOSITIONS_s': 'south',
            'EXPOSITIONS_se': 'southeast',
            'EXPOSITIONS_e': 'east',
            'EXPOSITIONS_ne': 'northeast',
            'EXPOSITIONS_all': 'all aspects',
            'EXPOSITIONS_single': '{{0}} facing aspects',
            'EXPOSITIONS_double': '{{0}} and {{1}} facing aspects',
            'EXPOSITIONS_multi': '{{0}} to {{1}} to {{2}} facing aspects',

            'EXPOSITION_ELEVATIONHI': 'above {{0}}',
            'EXPOSITION_ELEVATIONLW': 'below {{0}}',
            'EXPOSITION_ELEVATION_RANGE': 'between {{0}} and {{1}}',
            'EXPOSITION_ELEVATION_ALL': 'in all elevations',

            'SUGGESTION_WELCOME_1': 'forecast',
            'SUGGESTION_WELCOME_2': 'danger scale',
            'SUGGESTION_WELCOME_3': 'help',

            'SUGGESTION_DL_UNKNOWN_1': 'explain level 3',
            'SUGGESTION_DL_UNKNOWN_2': 'check the forecast',
            'SUGGESTION_DL_1': 'explain level {{0}}',
            'SUGGESTION_DL_2': 'check forecast',
            'SUGGESTION_DL_3': 'explain level 3',
            'SUGGESTION_DL_4': 'forecast',

            'SUGGESTION_NO_REGION_1': 'Innsbruck',
            'SUGGESTION_NO_REGION_2': 'Bolzano',
            'SUGGESTION_NO_REGION_3': 'Trento',
            
            'DATES': {
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
    },
    'de': {
        translation: {
            'WELCOME': 'Willkommen zur Lawinenvorhersage. Welche Region interessiert dich?',
            'FALLBACK': 'Entschuldige, das habe ich nicht verstanden. Kannst du es wiederholen?',
            'HELP': 'Du kannst mich nach dem neusten Lawinenreport für eine Region in Tirol, Südtirol oder Trentino fragen. Ich kann dir außerdem etwas über die europäische Lawinengefahrenstufen erzählen. Was würdest du gerne hören?',
            'NO_REGION': ['Welche Region interessiert dich? Vorhersagen für die Regionen Tirol, Südtirol und Trentino sind verfügbar.', 'Für welche Region möchtest du die Vorhersage? Vorhersagen für die Regionen Tirol, Südtirol und Trentino sind verfügbar.'],
            'LOCATION_UNSUPPORTED': 'Die gesuchte Region wird aktuell nicht unterstützt. Es sind nur Daten für Tirol, Südtirol und Trentino verfügbar.',

            'DANGER_LEVEL_INTRO': 'Die Lawinenvorhersage beschreibt die Lawinengefahr mit der fünfteiligen europäischen Lawinengefahrenstufenskala. Dabei werden die fünf Gefahrenstufen durch drei verschiedene Parameter beschrieben: Die Auslösewahrscheinlichkeit von Lawinen, der Umfang der Gefahrenstellen bzw. die Größe und Häufigkeit der zu erwartenden Lawinen. Frag mich nach einer Stufe.',
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

            'DANGER_LEVEL_UNKNOWN': 'Die europäische Lawinengefahrenstufenskala geht von Stufe eins bis fünf. Über welche Stufe möchtest du mehr erfahren?',
            'DANGER_LEVEL_X_CARD_TITLE': 'Gefahrenstufe {{0}}',
            'DANGER_LEVEL_CARD_TITLE': 'Die europäische Lawinengefahrenstufenskala',

            'REPORT_INTRO': 'Hier ist der aktuelle Bericht {{0}}, gültig für {{1}}.',
            'FORECAST_LEVEL_SINGLE_FULL': 'Die Gefahrenstufe liegt bei {{0}}.',
            'FORECAST_LEVEL_DOUBLE_FULL': 'Die Gefahrenstufe liegt unter {{0}} bei {{1}}, über {{2}} bei {{3}}.',
            'FORECAST_LEVEL_SINGLE_AM': 'Die Gefahrenstufe liegt vormittags bei {{0}}.',
            'FORECAST_LEVEL_DOUBLE_AM': 'Vormittags liegt die Gefahrenstufe unter {{0}} bei {{1}}, über {{2}} bei {{3}}.',
            'FORECAST_LEVEL_SINGLE_PM': 'Die Gefahrenstufe liegt nachmittags bei {{0}}.',
            'FORECAST_LEVEL_DOUBLE_PM': 'Am Nachmittag liegt die Gefahrenstufe unter {{0}} bei {{1}}, über {{2}} bei {{3}}.',

            'FORECAST_LEVEL_1': '1 - gering',
            'FORECAST_LEVEL_2': '2 - mäßig',
            'FORECAST_LEVEL_3': '3 - erheblich',
            'FORECAST_LEVEL_4': '4 - groß',
            'FORECAST_LEVEL_5': '5 - sehr groß',
            'FORECAST_LEVEL_n/a': '0 - kein Schnee',

            'FORECAST_ERROR': 'Entschuldige, aktuell ist die Vorhersage nicht verfügbar.',
            'FORECAST_CARD_TITLE': 'Lawinenreport {{0}} gültig für {{1}}',
            'FORECAST_TREELINE': 'der Waldgrenze',
            'FULL_REPORT': 'Ganzen Bericht lesen',
            'FORECAST_PM_NOTICE': 'Für den Nachmittag gibt es einen separaten Report.',
            'FORECAST_DANGER_FAV': 'Allgemeinen herrscht eine günstige Lawinensituation {{0}}.',
            'FORECAST_DANGER_SINGLE': 'Probleme gibt es vor allem durch {{0}} in {{1}} {{2}}.',
            'FORECAST_DANGER_SECOND': 'Weitere Probleme gibt es durch {{0}} in {{1}} {{2}}.',

            'DANGERS_drifting snow': 'Triebschnee',
            'DANGERS_old snow': 'Altschnee',
            'DANGERS_new snow': 'Neuschnee',
            'DANGERS_wet snow': 'Nassschnee',
            'DANGERS_gliding snow': 'Gleitschnee',

            'EXPOSITIONS_n': 'Nord',
            'EXPOSITIONS_nw': 'Nord-West',
            'EXPOSITIONS_w': 'West',
            'EXPOSITIONS_sw': 'Süd-West',
            'EXPOSITIONS_s': 'Süd',
            'EXPOSITIONS_se': 'Süd-Ost',
            'EXPOSITIONS_e': 'Ost',
            'EXPOSITIONS_ne': 'Nord-Ost',
            'EXPOSITIONS_all': 'allen Expositionen',
            'EXPOSITIONS_single': 'der Exposition {{0}}',
            'EXPOSITIONS_double': 'den Expositionen {{0}} und {{1}}',
            'EXPOSITIONS_multi': 'den Expositionen {{0}} über {{1}} bis {{2}}',

            'EXPOSITION_ELEVATIONHI': 'oberhalb {{0}}',
            'EXPOSITION_ELEVATIONLW': 'unterhalb {{0}}',
            'EXPOSITION_ELEVATION_RANGE': 'zwischen {{0}} und {{1}}',
            'EXPOSITION_ELEVATION_ALL': 'in allen Höhenlagen',

            'SUGGESTION_WELCOME_1': 'Vorhersage',
            'SUGGESTION_WELCOME_2': 'Gefahrenstufen',
            'SUGGESTION_WELCOME_3': 'Hilfe',

            'SUGGESTION_DL_UNKNOWN_1': 'Erkläre Stufe 3',
            'SUGGESTION_DL_UNKNOWN_2': 'Vorhersage',
            'SUGGESTION_DL_1': 'Erkläre Stufe {{0}}',
            'SUGGESTION_DL_2': 'Vorhersage',
            'SUGGESTION_DL_3': 'Erkläre Stufe 3',
            'SUGGESTION_DL_4': 'Vorhersage',

            'SUGGESTION_NO_REGION_1': 'Innsbruck',
            'SUGGESTION_NO_REGION_2': 'Bozen',
            'SUGGESTION_NO_REGION_3': 'Trient',

            'DATES': {
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
              }
            }
    },
    'it': {
        translation: {
            'WELCOME': 'Benvenuti al bollettino valanghe. A quale zona siete interessati?',
            'FALLBACK': 'Scusa, non l\'ho capito. Puoi riprovare?',
            'HELP': 'Potete chiedermi la previsione valanghe attuale per una zona del Tirolo, dell\'Alto Adige o del Trentino. Posso anche spiegarvi la scala europea del pericolo valanghe. Cosa vorresti sentire?',
            'NO_REGION': ['Quale zona ti interessa? Le regioni supportate sono il Tirolo, l\'Alto Adige e il Trentino.', 'In quale zona avete bisogno della previsione? Le regioni supportate sono il Tirolo, l\'Alto Adige e il Trentino..'],
            'LOCATION_UNSUPPORTED': 'La zona cercata non è supportata. Sono disponibili solo i dati per il Tirolo, l\'Alto Adige e il Trentino.',

            'DANGER_LEVEL_INTRO': 'Per descrivere il pericolo valanghe, valanghe.report usa la scala europea del pericolo valanghe divisa in cinque gradi. Il grado di pericolo dipende dai seguenti fattori: Probabilità di distacco valanghe, distribuzione dei luoghi pericolosi, dimensioni e frequenza delle valanghe previste. Chiedimi un livello specifico.',
            'DANGER_LEVEL': 'Il grado di pericolo si riferisce sempre a una zona con un area >100 km² e non a un singolo pendio. Il pericolo valanghe descritto nel bollettino su valanghe.report è sempre una previsione e come tale include un certo grado di incertezze. È quindi necessario verificare sempre il pericolo valanghe sul campo. Chiedimi un livello di pericolo specifico per saperne di più.',
            'DANGER_LEVEL_INTRO_5': 'Grado di pericolo 5, molto forte, rappresenta una situazione straordinaria di valanghe. Si prevedono numerose valanghe spontanee di dimensioni molto grandi e estremi che possono raggiungere le strade e i centri abitati situati a fondovalle. Vuoi informarti sul livello successivo?',
            'DANGER_LEVEL_INTRO_4': 'Grado di pericolo 4, forte, rappresenta una situazione valanghiva molto critica. Probabili valanghe spontanee, spesso anche di grandi dimensioni. Su molti pendii ripidi è facile provocare il distacco di valanghe. I distacchi a distanza sono tipici di questo grado di pericolo. I rumori di “whum” e le fessure sono frequenti. Vuoi informazioni sul livello successivo?',
            'DANGER_LEVEL_INTRO_3': 'Grado di pericolo 3, marcato, rappresenta una situazione critica di valanghe. I rumori di “whum” e le fessure sono tipici. Le valanghe possono facilmente essere staccate, soprattutto sui pendii ripidi alle esposizioni e alle quote indicate nel bollettino valanghe su valanghe.report. Possibili valanghe spontanee e distacchi a distanza. Vuoi conoscere il livello successivo?',
            'DANGER_LEVEL_INTRO_2': 'Grado di pericolo 2, moderato, rappresenta una situazione valanghe per lo più favorevole. È possibile la presenza di singoli segnali di allarme. Le valanghe possono essere staccate specialmente sui pendii molto ripidi alle esposizioni e alle quote indicate nel bollettino valanghe su valanghe.report. Non sono previste valanghe spontanee di grandi dimensioni. Vuoi informazioni sul livello successivo?',
            'DANGER_LEVEL_INTRO_1': 'Grado di pericolo 1, debole, è sinonimo di una situazione valanghiva generalmente favorevole. Non si manifestano segnali di allarme. Possibile solo il distacco di valanghe isolate, soprattutto sui pendii estremamente ripidi. Vuoi vedere il livello successivo?',
            'DANGER_LEVEL_5': 'Si consiglia di rinunciare alle attività sportive al di fuori degli itinerari controllati.',
            'DANGER_LEVEL_4': 'Limitarsi ai pendii poco ripidi. Attenzione alla zona di deposito di valanghe di grandi dimensioni. Le persone inesperte rimangano sulle piste e sugli itinerari controllati.',
            'DANGER_LEVEL_3': 'Questa è la situazione più critica per gli appassionati di sport invernali! Sono necessarie una scelta ottimale dell’itinerario e l’adozione di misure atte a ridurre il rischio. Evitare i pendii molto ripidi alle esposizioni e alle quote indicate nel bollettino valanghe su valanghe.report. È meglio che le persone inesperte rimangano sulle discese e sugli itinerari aperti.',
            'DANGER_LEVEL_2': 'Prudente scelta dell’itinerario, soprattutto sui pendii alle esposizioni e alle quote indicate nel bollettino valanghe su valanghe.report. Percorrere i pendii molto ripidi una persona alla volta. Attenzione particolare è richiesta quando la struttura del manto nevoso è sfavorevole (problema valanghivo: strati deboli persistenti).',
            'DANGER_LEVEL_1': 'Scendere da pendii estremamente ripidi solo una persona alla volta e prestare attenzione al rischio di scivolamento.',

            'DANGER_LEVEL_UNKNOWN': 'La scala europea del pericolo valanghe parte con grado una e va fino al grado cinque. Di quale grado volete saperne di più?',
            'DANGER_LEVEL_X_CARD_TITLE': 'Grado di pericolo {{0}}',
            'DANGER_LEVEL_CARD_TITLE': 'Scala europea del pericolo valanghe',

            'REPORT_INTRO': 'Ecco l\'ultimo bollettino per {{0}}, valido per {{1}}.',
            'FORECAST_LEVEL_SINGLE_FULL': 'Il grado di pericolo è {{0}}.',
            'FORECAST_LEVEL_DOUBLE_FULL': 'Il grado di pericolo sotto {{0}} è {{1}}, sopra {{2}} è {{3}}.',
            'FORECAST_LEVEL_SINGLE_AM': 'Il grado di pericolo al mattino è {{0}}.',
            'FORECAST_LEVEL_DOUBLE_AM': 'Al mattino, il grado di pericolo sotto {{0}} è {{1}}, sopra {{2}} è {{3}}.',
            'FORECAST_LEVEL_SINGLE_PM': 'Il grado di pericolo nel pomeriggio è {{0}}.',
            'FORECAST_LEVEL_DOUBLE_PM': 'Nel pomeriggio, il grado di pericolo sotto {{0}} è {{1}}, sopra {{2}} è {{3}}.',

            'FORECAST_LEVEL_1': '1 - debole',
            'FORECAST_LEVEL_2': '2 - moderato',
            'FORECAST_LEVEL_3': '3 - marcato',
            'FORECAST_LEVEL_4': '4 - forte',
            'FORECAST_LEVEL_5': '5 - molto forte',
            'FORECAST_LEVEL_n/a': '0 - niente neve',

            'FORECAST_ERROR': 'Spiacente, al momento le previsioni non sono disponibili.',
            'FORECAST_CARD_TITLE': 'Bollettino valanghe {{0}} valido fino a {{1}}.',
            'FORECAST_TREELINE': 'del limite del bosco',
            'FULL_REPORT': 'Mostra rapporto completo',
            'FORECAST_PM_NOTICE': 'Esiste un bollettino diverso per il pomeriggio.',
            'FORECAST_DANGER_SINGLE': 'Ci sono problemi soprattutto a causa di {{0}}} in {{1}} {{2}}.',
            'FORECAST_DANGER_FAV': 'In generale, la situazione valanghiva è favorevole {{0}}.',
            'FORECAST_DANGER_SECOND': 'Ci sono altri problemi attraverso {{0}} in {{1}} {{2}}.',

            'DANGERS_drifting snow': 'neve ventata',
            'DANGERS_old snow': 'strati deboli persistenti',
            'DANGERS_new snow': 'neve fresca',
            'DANGERS_wet snow': 'neve bagnata',
            'DANGERS_gliding snow': 'valanghe di slittamento',

            'EXPOSITIONS_n': 'nord',
            'EXPOSITIONS_nw': 'nord-est',
            'EXPOSITIONS_w': 'ovest',
            'EXPOSITIONS_sw': 'sud-ovest',
            'EXPOSITIONS_s': 'sud',
            'EXPOSITIONS_se': 'sud-est',
            'EXPOSITIONS_e': 'est',
            'EXPOSITIONS_ne': 'nord-est',
            'EXPOSITIONS_all': 'tutte le esposizioni',
            'EXPOSITIONS_single': 'l\'esposizione a {{0}}',
            'EXPOSITIONS_double': 'le esposizioni {{0}} e {{1}}.',
            'EXPOSITIONS_multi': 'esposizioni {{0}} via {{1}} a {{2}}.',

            'EXPOSITION_ELEVATIONHI': 'al di sopra {{0}}',
            'EXPOSITION_ELEVATIONLW': 'al di sotto {{0}}',
            'EXPOSITION_ELEVATION_RANGE': 'tra {{0}} e {{1}}',
            'EXPOSITION_ELEVATION_ALL': 'in tute le quote',

            'SUGGESTION_WELCOME_1': 'Previsione',
            'SUGGESTION_WELCOME_2': 'Scala del pericolo',
            'SUGGESTION_WELCOME_3': 'Aiuto',

            'SUGGESTION_DL_UNKNOWN_1': 'spiegare il grado di pericolo 3',
            'SUGGESTION_DL_UNKNOWN_2': 'controllare le previsioni',
            'SUGGESTION_DL_1': 'spiegare il grado di pericolo {{0}}.',
            'SUGGESTION_DL_2': 'controllare le previsioni',
            'SUGGESTION_DL_3': 'spiegare il grado di pericolo 3',
            'SUGGESTION_DL_4': 'previsioni',

            'SUGGESTION_NO_REGION_1': 'Innsbruck',
            'SUGGESTION_NO_REGION_2': 'Bolzano',
            'SUGGESTION_NO_REGION_3': 'Trento',
            
            'DATES': {
                  dayNames: [
                      'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab',
                      'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
                  ],
                  monthNames: [
                      'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic',
                      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
                  ],
                  timeNames: [
                      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
                  ]
              }
            }
    }
};

module.exports = messages;
