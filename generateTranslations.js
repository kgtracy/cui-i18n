'use strict'

const sheetrock = require('sheetrock')
const generator = require('./generator')
const packageJson = require('./package.json')

const codes = ['en', 'pt', 'tr', 'zh', 'fr', 'es', 'it', 'ru', 'th', 'ja', 'de']
const mainSheetUrl = 'https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0'
// const overwriteSheetUrl = 'https://docs.google.com/spreadsheets/d/1cuc65_-DO4kV9EGRJsOjEg-9hGByqHZsNkieMPbuZxE/edit#gid=0'

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
            outputDirectory: './dist/' + packageJson.version + '/cui-i18n/angular-translate/' 
        }, { 
            extension: 'properties',
            prefix: 'locale-',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/' + packageJson.version + '/cui-i18n/java/' 
        }
    ]

    if (typeof overwriteSheetUrl === 'undefined') {
        generator.createLanguageFilesFromParsedResponse(files, parsedResponse)
    }
    else {
        sheetrock({
            url: overwriteSheetUrl,
            query: "select *",
            callback: function(error, options, response) {
                overrideCallback(error, options, response, parsedResponse, files)
            }
        })
    }
}

sheetrock({
    url: mainSheetUrl,
    query: "select *",
    callback: translationCallback
})
