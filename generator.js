var fs = require('fs');

module.exports = {
  parseOverrides: function(parsedResponse,overrideParsedResponse,languageCodes){
    var tempObject=parsedResponse;
    var overrideKeys=Object.keys(overrideParsedResponse[languageCodes[0]]);
    overrideKeys.forEach(function(overrideKey){
      languageCodes.forEach(function(languageCode){
          tempObject[languageCode][overrideKey]=overrideParsedResponse[languageCode][overrideKey];
      });
    });
    return tempObject;
  },

  createLanguageFilesFromParsedResponse: function(files, parsedResponse) {
    for (var code in parsedResponse) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var content = file.formatter(parsedResponse[code]);
        var prefix = file.prefix || '';
        var suffix = file.suffix || '';
        var filename = prefix + code.replace(/-/g, '_') + '.' + file.extension;
        var filePath = file.outputDirectory + filename;
        this.createLanguageFile(filePath, content);
      }
    }
  },

  createLanguageFile: function(filePath, content) {
    fs.writeFile(filePath, content, function (err) {
      if (err) { console.log(err); }
    });
  },

  sheetrock: {
    parseLanguages: function(codes, response) {
      var languages = {};

      for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        if (response.rows[0].labels.indexOf(code) >= 0) {
          languages[code] = this.extractLanguageKeys(code, response);
        }
      }

      return languages;
    },

    extractLanguageKeys: function(code, response) {
      var keys = {};

      for (var i = 0; i < response.rows.length; i++) {
        var row = response.rows[i];

        if (row.labels.indexOf(code) < 0) continue;
        if (row.cells[code] === "") continue;

        keys[row.cells.LanguageKey] = row.cells[code];
      }

      return keys;
    }
  },

  jsonFormatter: function (json) {
    var preparedJSON = JSON.stringify(json, null, 4)
                           .replace(/\\\\n/g, '\\n'); // in case stringify escapes already escaped newlines
    return preparedJSON;
  },

  javaPropertiesFormatter: function (json) {
    var lines = [];

    for (var key in json) {
      lines.push(key + "=" + json[key]);
    }

    return lines.join('\n');
  }
};
