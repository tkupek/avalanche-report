'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');

const defaultHandler = require('./defaultHandler');
const forecastHandler = require('./forecastHandler');
const dangerScaleHandler = require('./dangerScaleHandler');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    let intentMap = new Map();

    intentMap = defaultHandler.registerHandler(intentMap);
    intentMap = forecastHandler.registerHandler(intentMap);
    intentMap = dangerScaleHandler.registerHandler(intentMap);

    agent.handleRequest(intentMap);
});