'use strict'

const sheetrock = require('sheetrock')
const generator = require('./generator')
const packageJson = require('./package.json')

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
            outputDirectory: './dist/' + packageJson.version + '/cui-i18n/messaging/json/' 
        }, { 
            extension: 'properties',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/' + packageJson.version + '/cui-i18n/messaging/java/' 
        }
    ]

    generator.createLanguageFilesFromParsedResponse(files, parsedResponse)
}

sheetrock({
    url: "https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=56492656",
    query: "select *",
    callback: messagingCallback
})
