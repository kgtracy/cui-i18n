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
const mainSheetUrl = 'https://docs.google.com/spreadsheets/d/1yIYGAL7nOObK1QVczGto7LWAPzYaWR4gSQHfD3qYJDA/edit#gid=521689317'
// const mainSheetUrl = 'https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0'
const overwriteSheetUrl = 'https://docs.google.com/spreadsheets/d/1RcsgKcYAes2faA-5PzcO17UEs2OkqBmr_x0362N9a38/edit?usp=sharing&gid=0'

const overrideCallback = (error, options, response, parsedResponse, files) => {
    if (error) {
        console.log(error, response)
        return
    }

    const overwrittenParsedResponse = generator.sheetrock.parseLanguages(codes, response)
    const overwrittenLanguageObject= generator.parseOverrides(parsedResponse, overwrittenParsedResponse, codes)

    generator.createLanguageFilesFromParsedResponse(files, overwrittenLanguageObject)
}

const translationCallback = (error, options, response) => {
    if (error) {
        console.log(error, response)
        return
    }

    const parsedResponse = generator.sheetrock.parseLanguages(codes, response)
    const files = [
        {
            extension: 'json',
            prefix: 'locale-',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/' + currentVersion + '/cui-i18n/angular-translate/'
        }, {
            extension: 'properties',
            prefix: 'locale-',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/' + currentVersion + '/cui-i18n/java/'
        }, {
            extension: 'json',
            prefix: 'locale-',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/cui-i18n/angular-translate/'
        }, {
            extension: 'properties',
            prefix: 'locale-',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/cui-i18n/java/'
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
