var sheetrock = require('sheetrock');
var generator = require('./generator');

var codes = ['en', 'pt', 'tr', 'zh', 'fr', 'es', 'it', 'ru', 'th', 'ja', 'de'],
    mainSheetUrl = "https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0";
// var overwriteSheetUrl = "https://docs.google.com/spreadsheets/d/1cuc65_-DO4kV9EGRJsOjEg-9hGByqHZsNkieMPbuZxE/edit#gid=0";

var overrideCallback = function(error,options,response,parsedResponse,files) {
   if (error) {
    console.log(error, response);
    return;
  }
  var overwrittenParsedResponse = generator.sheetrock.parseLanguages(codes, response);
  var overwrittenLanguageObject= generator.parseOverrides(parsedResponse,overwrittenParsedResponse,codes);
  generator.createLanguageFilesFromParsedResponse(files, overwrittenLanguageObject);
};

var translationCallback = function(error, options, response) {
  if (error) {
    console.log(error, response);
    return;
  }
  var parsedResponse = generator.sheetrock.parseLanguages(codes, response);
  var files = [{ extension: 'json',
                 prefix: 'locale-',
                 formatter: generator.jsonFormatter,
                 outputDirectory: './dist/cui-i18n/angular-translate/' },
               { extension: 'properties',
                 prefix: 'locale-',
                 formatter: generator.javaPropertiesFormatter,
                 outputDirectory: './dist/cui-i18n/java/' }];

  if(typeof overwriteSheetUrl==='undefined') {
    generator.createLanguageFilesFromParsedResponse(files, parsedResponse);
  }
  else {
    sheetrock({
      url: overwriteSheetUrl,
      query: "select *",
      callback: function(error,options,response){
        overrideCallback(error,options,response,parsedResponse,files);
      }
    });
  }
};

sheetrock({
  url: mainSheetUrl,
  query: "select *",
  callback: translationCallback
});
