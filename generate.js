var sheetrock = require('sheetrock');
var fs = require('fs');

var codes = ['en','pt','zh','pl'];
var url = "https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0";
var messagingUrl = "https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=56492656";

var outputDirectory = "./dist/cui-i18n/angular-translate/";
var outputDirectoryJava = "./dist/cui-i18n/java/";
var messagingOutputDirectory = "./dist/cui-i18n/messaging/json/";
var messagingOutputDirectoryJava = "./dist/cui-i18n/messaging/java/";

var callback = function (error, options, response) {
  if (!error) {
    options.user.url==url? parseResponse(response.rows,'idm') : true;
    options.user.url==messagingUrl? parseResponse(response.rows,'messaging') : true;
  }
  else{
  	console.log(error);
  }
};

var parseResponse = function(res,mode){
	createFiles(res[0].cells, res, mode);
	for(i=0;i<codes.length;i++){
		writeToFiles(codes[i], res, mode);
	}
};

var createFiles = function(cells, res, mode){
    if(mode==='idm'){
        for(i=0;i<codes.length;i++){
            fs.writeFile(outputDirectory+'locale-'+codes[i].replace(/-/g, '_')+'.json','{\n',function(err){
                if(err){ console.log(err);}
            })
            fs.writeFile(outputDirectoryJava+'locale-'+codes[i].replace(/-/g, '_')+'.properties','',function(err){
                if(err){ console.log(err);}
            })
        }
    }
    if(mode==='messaging'){
        for(i=0;i<codes.length;i++){
            fs.writeFile(messagingOutputDirectory+codes[i].replace(/-/g, '_')+'.json','{\n',function(err){
                if(err){ console.log(err);}
            })
            fs.writeFile(messagingOutputDirectoryJava+codes[i].replace(/-/g, '_')+'.properties','',function(err){
                if(err){ console.log(err);}
            })
        }
    }
};

var writeToFiles = function(code,res,mode){
	var valueInserted=false;
	if (mode==='idm'){
        var fileName=outputDirectory + 'locale-' + code.replace(/-/g, '_') + '.json';
	    var fileName2=outputDirectoryJava + 'locale-' + code.replace(/-/g, '_') + '.properties';
    }
    if (mode==='messaging'){
        var fileName=messagingOutputDirectory + code.replace(/-/g, '_') + '.json';
        var fileName2=messagingOutputDirectoryJava + code.replace(/-/g, '_') + '.properties';
    }
	for(j=0; j < res.length ; j++){
		if(res[j].cells.LanguageKey!=='N/A' && (res[j].cells[code]!=='' && res[j].cells[code]!==undefined)){
			fs.appendFileSync(fileName2, '\n' + res[j].cells.LanguageKey + '=' + res[j].cells[code]);
			if(res[j].cells[code].includes('"')){
				res[j].cells[code]=res[j].cells[code].replace(/"/g,'&quot;');
			}
			if(!valueInserted){
				fs.appendFileSync(fileName, '      "' + res[j].cells.LanguageKey + '": "' + res[j].cells[code] + '"');
			}
			else{
				fs.appendFileSync(fileName, ',\n    "' + res[j].cells.LanguageKey + '": "' + res[j].cells[code] + '"');
			}
			valueInserted=true;
		}
	}
	fs.appendFileSync(fileName, '\n}')
};


sheetrock({
  url: url,
  query: "select *",
  callback: callback
});

sheetrock({
  url: messagingUrl,
  query: "select *",
  callback: callback
});

if (!String.prototype.includes) {
  String.prototype.includes = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
