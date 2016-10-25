'use strict'

/*
*   Note:
*   This script assumes that 'node initDist.js <version>' has already been ran.
*/

const sheetrock = require('sheetrock')
const generator = require('./generator')
const fs = require('fs')

const currentVersion = fs.readdirSync('./dist/')[0]
const codes = ['en', 'pt', 'tr', 'zh', 'fr', 'es', 'it', 'ru', 'th', 'ja', 'de']

const messagingCallback = (error, options, response) => {
    if (error) {
        console.log(error)
        return
    }

    const parsedResponse = generator.sheetrock.parseLanguages(codes, response)
    const files = [
        { 
            extension: 'json',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/' + currentVersion + '/cui-i18n/messaging/json/'
        }, { 
            extension: 'properties',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/' + currentVersion + '/cui-i18n/messaging/java/' 
        }, { 
            extension: 'json',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/cui-i18n/messaging/json/'
        }, { 
            extension: 'properties',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/cui-i18n/messaging/java/' 
        }
    ]

    generator.createLanguageFilesFromParsedResponse(files, parsedResponse)
}

sheetrock({
    url: 'https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=56492656',
    query: 'select *',
    callback: messagingCallback
})
