const config = require('../config/config');
const apiKeys = require('../config/apiKeys');

const crypto = require('crypto');

const googleMapsClient = require('@google/maps').createClient({
  key: apiKeys.googleGeocodingAPI,
  Promise: Promise
});

const firestoreClient = require('@google-cloud/firestore');
const db = new firestoreClient();

const geocodingUtil = {
    geocodeLocation: async function(location, lang) {
        config.debug && console.log('geocoding location [' + location + ']');
        let resolvedLoc = { name: location };

        let cachedResult = await geocodingUtil.readGeocodeCache(location);
        if(cachedResult && cachedResult.gcode && !geocodingUtil.invalidateCache(cachedResult.ts)) {
            config.debug && console.log('cache hit');
            resolvedLoc.coordinates = cachedResult.gcode;
            return resolvedLoc;
        }

        let geocodingResult = await geocodingUtil.callGeocodingApi(location, lang);
        let coordinates = geocodingUtil.getCoordinatesFromResult(geocodingResult, lang)
        await geocodingUtil.insertToGeocodeCache(location, coordinates);

        resolvedLoc.coordinates = coordinates;
        return resolvedLoc;
    },
    getCoordinatesFromResult(response, location) {
        if(!response.json.results[0]) {
            console.error('failed to geocode location [' + location + '] response [' + JSON.stringify(response) + ']');
            throw config.ERRORS.GEOCODE_ERROR;
        }
        return [response.json.results[0].geometry.location.lng, response.json.results[0].geometry.location.lat];
    },
    callGeocodingApi: async function(location, lang) {
        config.debug && console.log('call google geocoding API');
        let data = {
            address: location,
            language: lang
        };

        try {
            return await googleMapsClient.geocode(data).asPromise();
        } catch(err) {
            console.error('unable to call google geocoding API [' + JSON.stringify(err) + ']');
            throw config.ERRORS.GEOCODE_ERROR;
        }
    },
    readGeocodeCache: async function(location) {
        config.debug && console.log('read geocode from cache');
        try {
            const document = db.collection(config.firestoreCollection).doc(geocodingUtil.getDocumentId(location));
            let data = await document.get();
            return data.exists ? data.data() : false;
        } catch(err) {
            console.error('unable to call firestore read API [' + JSON.stringify(err) + ']');
            throw config.ERRORS.CACHE_ERROR;
        }
    },
    insertToGeocodeCache: async function(location, coordinates) {
        config.debug && console.log('insert geocode to caching database');
        let data = {
            loc: location,
            ts: new Date(),
            gcode: coordinates
        };

        try {
            const document = db.collection(config.firestoreCollection).doc(geocodingUtil.getDocumentId(location));
            await document.set(data);
        } catch(err) {
            console.error('unable to call firestore create API [' + JSON.stringify(err) + ']');
            throw config.ERRORS.CACHE_ERROR;
        }
    },
    getDocumentId: function(location) {
        return crypto.createHash('sha256').update(location.toLowerCase()).digest('hex');
    },
    invalidateCache: function(cacheDate) {
        let timeInMs = config.geocodingCacheDays * 24 * 60 * 60 * 1000;
        let limit = new Date(new Date() - timeInMs);

        return cacheDate.toDate() < limit;
    }
};

module.exports = geocodingUtil;
