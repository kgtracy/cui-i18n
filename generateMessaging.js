var sheetrock = require('sheetrock');
var generator = require('./generator');

var codes = ['en-US','pt-PT','zh-CN','pl-PL'];
var messagingUrl = "https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=56492656";

var messagingCallback = function(error, options, response) {
  if (error) {
    console.log(error);
    return;
  }

  var parsedResponse = generator.parseLanguages(codes, response);
  var files = [{ extension: 'json',
                 formatter: generator.jsonFormatter,
                 outputDirectory: './dist/cui-i18n/messaging/json/' },
               { extension: 'properties',
                 formatter: generator.javaPropertiesFormatter,
                 outputDirectory: './dist/cui-i18n/messaging/java/' }]

  generator.createLanguageFilesFromParsedResponse(files, parsedResponse);
}

sheetrock({
  url: messagingUrl,
  query: "select *",
  callback: messagingCallback
});
