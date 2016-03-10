var sheetrock = require('sheetrock');
var generator = require('./generator');

var codes = ['en', 'pt', 'tr', 'zh', 'fr', 'es', 'it', 'ru', 'th', 'ja', 'de'],
    mainSheetUrl = "https://docs.google.com/spreadsheets/d/1jS4DdpYMlDIx_LEBjvdgNsp9H1nTqr_eICG4c5QUJws/edit#gid=1639650742";
// var overwriteSheetUrl = "https://docs.google.com/spreadsheets/d/1cuc65_-DO4kV9EGRJsOjEg-9hGByqHZsNkieMPbuZxE/edit#gid=0";

var overrideCallback = function(error,options,response,parsedResponse,files) {
   if (error) {
    console.log(error, response);
    return;
  }
  var overwrittenParsedResponse = generator.sheetrock.parseTimezones(codes, response);
  var overwrittenTimezoneObject = generator.parseOverrides(parsedResponse,overwrittenParsedResponse,codes);
  generator.createLanguageFilesFromParsedResponse(files, overwrittenLanguageObject);
};

var translationCallback = function(error, options, response) {
  if (error) {
    console.log(error, response);
    return;
  }
  var parsedResponse = generator.sheetrock.parseTimezones(codes, response);
  var files = [{ extension: 'json',
                 formatter: generator.jsonFormatter,
                 outputDirectory: './dist/cui-i18n/angular-translate/timezones/' }];

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
