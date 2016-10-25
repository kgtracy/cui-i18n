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
const mainSheetUrl = 'https://docs.google.com/spreadsheets/d/1jS4DdpYMlDIx_LEBjvdgNsp9H1nTqr_eICG4c5QUJws/edit#gid=1639650742'
// const overwriteSheetUrl = 'https://docs.google.com/spreadsheets/d/1cuc65_-DO4kV9EGRJsOjEg-9hGByqHZsNkieMPbuZxE/edit#gid=0'

const overrideCallback = (error,options,response,parsedResponse,files) => {
    if (error) {
        console.log(error, response)
        return
    }

    const overwrittenParsedResponse = generator.sheetrock.parseTimezones(codes, response)
    const overwrittenTimezoneObject = generator.parseOverrides(parsedResponse, overwrittenParsedResponse, codes)

    generator.createLanguageFilesFromParsedResponse(files, overwrittenLanguageObject)
}

const translationCallback = (error, options, response) => {
    if (error) {
        console.log(error, response)
        return
    }

    const parsedResponse = generator.sheetrock.parseTimezones(codes, response)
    const files = [
        { 
            extension: 'json',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/' + currentVersion + '/cui-i18n/angular-translate/timezones/' 
        }, {
            extension: 'json',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/cui-i18n/angular-translate/timezones/' 
        }
    ]

    if (typeof overwriteSheetUrl === 'undefined') {
        generator.createLanguageFilesFromParsedResponse(files, parsedResponse)
    }
    else {
        sheetrock({
            url: overwriteSheetUrl,
            query: 'select *',
            callback: function(error, options, response) {
                overrideCallback(error, options, response, parsedResponse, files)
            }
        })
    }
}

sheetrock({
    url: mainSheetUrl,
    query: 'select *',
    callback: translationCallback
})
