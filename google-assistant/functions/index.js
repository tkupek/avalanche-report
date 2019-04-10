'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const https = require('https');
const xmlparser = require('xml2js').parseString;
const dateformat = require('dateformat');

const apiHost = 'avalanche.report';
const apiPath = '/albina_files/latest/{{locale}}.xml';

const regionMapping = {
    'Tyrol': 'AT-07-10',
    'Tyrol Stubai': 'AT-07-20',
    'Tyrol Lienz': 'AT-07-26',
    'South Tyrol': 'IT-32-BZ',
    'Trentino Central': 'IT-32-TN-12',
    'Trentino East West': 'IT-32-TN-02'
}

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add('Welcome to avalance forecast. What region are you interested in? Tyrol, Southtyrol or Trentino?');
    }

    function fallback(agent) {
        agent.add('Sorry, I did not get that. Can you try again?');
    }

    function help(agent) {
      agent.add('You can ask me for the latest avalanche forecast for Tyrol, South Tyrol or Trentino. I can also explain you the european avalanche danger scale. What would you like to hear?')
    }

    function forecast(agent) {
        let region = agent.parameters['region'];

        if (!region) {
            console.error('no region selected');
            return;
        }

        return getAvalancheReport(region).then(function(data) {
            let dateValid = Date.parse(data['validTime'][0]['TimePeriod'][0]['endPosition'][0]);
            let formatDateValid = dateformat(dateValid, 'dddd, mmmm dS');

            let text = 'Here is the latest report for ' + region + ' valid on ' + formatDateValid + '.'

            let dangerRating = data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['dangerRatings'][0]['DangerRating'];
            if (dangerRating.length > 1) {
                text += ' The danger level below x meter is ' + dangerRating[1]['mainValue'][0] + ', over x meter it is ' + dangerRating[0]['mainValue'][0] + '.';
            } else {
                text += ' The danger level is ' + dangerRating[0]['mainValue'] + '.'
            }
            text += data['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'];

            agent.add(text);
        }).catch(function(err) {
            console.error(err);
            agent.add('Sorry, currently the forecast is not available');
        });
    }

    function dangerscale(agent) {
        let selectedLevel = agent.parameters['number'];
        if (selectedLevel) {
            switch (selectedLevel) {
                case (5):
                    agent.add('Danger level 5, very high, stands for an extraordinary avalanche situation. Numerous very large and extreme natural avalanches can be expected. These can reach roads and settlements in the valley. Recommendations for backcountry recreationists: You are advised not to engage in winter sports beyond open ski runs and trails.')
                    break;
                case (4):
                    agent.add('Danger level 4, high, stands for a very critical avalanche situation. Natural and often very large avalanches are likely. Avalanches can easily be triggered on many steep slopes. Remote triggering is typical. Whumpf sounds and shooting cracks occur frequently. Recommendations for backcountry recreationists: Stay on moderately steep terrain. Watch out below run out zones of large avalanches. Inexperienced persons should remain on open ski runs and trails. Forecast only on a few days throughout the winter.');
                    break;
                case (3):
                    agent.add('Danger level 3, considerable, stands for a critical avalanche situation. Whumpf sounds and shooting cracks are typical. Avalanches can easily be triggered, particularly on steep slopes with the aspect and elevation indicated on avalanche.report. Natural avalanches and remote triggering may occur. Recommendations for backcountry recreationists: The most critical situation for backcountry recreationists. Use terrain effecently and select best possible route and with minimal exposure. Avoid very steep slopes with the aspect and elevation indicated on avalanche.report. Inexperienced persons are advised to remain on open ski runs and trails.');
                    break;
                case (2):
                    agent.add('Danger level 2, moderate, stands for mostly favorable avalanche situation. Alarm signs can occur in isolated cases. Avalanches can be triggered in particular on very steep slopes with the aspect and elevation indicated on avalanche.report. Large natural avalanches are unlikely. Recommendations for backcountry recreationists: Backcountry activities should be selected carefully, especially on slopes with the aspect and elevation indicated on avalanche.report. Travel very steep slopes one person at a time. Pay attention to unfavourable snowpack structure (persistent weak layers, old snow problem).');
                    break;
                case (1):
                    agent.add('Danger level 1, low, stands for a generally favourable avalanche situation. No alarm signs present. Avalanches can only be triggered in isolated cases, in particular on extremely steep slopes. Recommendations for backcountry recreationists: Travel extremely steep slopes one person at a time and mind the danger of falling.');
                    break;
            }
        } else {
            agent.add('The avalanche danger is evaluated with the five-levelled European avalanche danger scale. The levels are described by three different parameters: Probability of avalanche release, distribution of hazardous sites as well as size and frequency of expected avalanches. The danger level always applies to a region with an area of larger than 100 km² and not to a specific individual slope. The avalanche danger described is always a forecast with uncertainties. It should always be checked on site. Ask me for a specific danger level to learn more.')
        }
    }

    function getAvalancheReport(region) {
        return new Promise(function(resolve, reject) {
            executeServerRequest(getApiConfig()).then(function(returnData) {
                xmlparser(returnData, function(err, result) {
                    let localeObservation = result['ObsCollection']['observations'][0]['Bulletin'].find(function(element) {
                        let localeRef = element['locRef'].find(function(element) {
                            return element['$']['xlink:href'].startsWith(regionMapping[region]);
                        });
                        console.log(localeRef);
                        return localeRef !== undefined;
                    });

                    console.log(JSON.stringify(localeObservation));
                    if (localeObservation !== undefined) {
                        resolve(localeObservation);
                    } else {
                        reject('no observations found for requested region')
                    }
                });
            }).catch(function(err) {
                reject('error while executing the server request');
            });
        });

    }

    function executeServerRequest(config) {
        return new Promise(function(resolve, reject) {
            let req = https.request(config, res => {
                res.setEncoding('utf8');
                let returnData = '';

                res.on('data', chunk => {
                    returnData = returnData + chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        return resolve(returnData);
                    }
                    return reject('server request failed with code ' + JSON.stringify(res.statusCode) + ' and message ' + res);
                });

                res.on('error', function(err) {
                    return reject('server request failed with message ' + err);
                });

            });
            req.end();
        });
    }

    function getApiConfig() {
        return {
            host: apiHost,
            port: 443,
            path: apiPath.replace('{{locale}}', 'en'),
            method: 'GET'
        };
    }

    // // Uncomment and edit to make your own intent handler
    // // uncomment 'intentMap.set('your intent name here', yourFunctionHandler);'
    // // below to get this function to be run when a Dialogflow intent is matched
    // function yourFunctionHandler(agent) {
    //   agent.add('This message is from Dialogflow's Cloud Functions for Firebase editor!');
    //   agent.add(new Card({
    //       title: 'Title: this is a card title',
    //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //       text: 'This is the body text of a card.  You can even use line\n  breaks and emoji! 💁',
    //       buttonText: 'This is a button',
    //       buttonUrl: 'https://assistant.google.com/'
    //     })
    //   );
    //   agent.add(new Suggestion('Quick Reply'));
    //   agent.add(new Suggestion('Suggestion'));
    //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    // }

    // // Uncomment and edit to make your own Google Assistant intent handler
    // // uncomment 'intentMap.set('your intent name here', googleAssistantHandler);'
    // // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }
    // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
    // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Explain Danger Scale', dangerscale);
    intentMap.set('Get Avalanche Forecast', forecast);
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
});