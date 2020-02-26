# Avalanche Report
Avalanche Report is an Action / Skill for the Google Assistant and Amazon Alexa that gets the latest data from the Avalanche Warning Services Tyrol - South Tyrol - Trentino.

## Description
[https://tkupek.eu/avalanche-report/](https://tkupek.eu/avalanche-report/)

## Possible improvements
- implementation for Siri Shortcort
- implement dynamodb geocoding cache in alexa app
- search for zip code
- forecast for current device location, https://developers.google.com/actions/reference/rest/Shared.Types/Location
- fix Google pronounciation of date
- full-report intent that reads the complete text
- switch to JSON API, https://admin.avalanche.report/swagger/#/
- refactor avalancheReportAPI.js to use async functions
- in summer: static hint to blog, when API gives no result
- warn user if he is very close to the border of a region

## Thanks to
*Land Tirol* for providing the data for this application and for releasing their website avalanche.report under an CC license.
*Christoph Mitterer* for strongly improving the translations and helping with the official wording.