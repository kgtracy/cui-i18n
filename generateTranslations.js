var sheetrock = require('sheetrock');
var generator = require('./generator');

var codes = ['en-US','pt-PT','zh-CN','pl-PL'];

var translationCallback = function(error, options, response) {
  if (error) {
    console.log(error, response);
    return;
  }

  var parsedResponse = generator.parseLanguages(codes, response);
  var files = [{ extension: 'json',
                 prefix: 'locale-',
                 formatter: generator.jsonFormatter,
                 outputDirectory: './dist/cui-i18n/angular-translate/' },
               { extension: 'properties',
                 prefix: 'locale-',
                 formatter: generator.javaPropertiesFormatter,
                 outputDirectory: './dist/cui-i18n/java/' }];

  generator.createLanguageFilesFromParsedResponse(files, parsedResponse);
}

sheetrock({
  url: "https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0",
  query: "select *",
  callback: translationCallback
});
