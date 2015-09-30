var sheetrock = require('sheetrock');
var fs = require('fs');

var codes = ['en-US','pt-PT'];
var url = "https://docs.google.com/spreadsheets/d/1ZHAW_42AArB6z7BIRLjJPPgzWnQmSJqRoOR8fILiJuE/edit#gid=0";
var outputDirectory = "./dist/cui-i18n/angular-translate/";

var myCallback = function (error, options, response) {
  if (!error) {
    parseResponse(response.rows);
  }
  else{
  	console.log(error);
  }
};

var parseResponse = function(res){
	createFiles(res[0].cells);
	for(i=0;i<codes.length;i++){
		writeToFiles(codes[i],res);
	}
};

var createFiles = function(cells){
	for(i=0;i<codes.length;i++){
		fs.writeFile(outputDirectory+'locale-'+codes[i].replace(/-/g, '_')+'.json','{',function(err){
			if(err) throw err;
		})
	}
};

var writeToFiles = function(code,res){
	var valueInserted=false;
	for(j=1; j<res.length ; j++){
		if(res[j].cells.LanguageKey!=='N/A' && (res[j].cells[code]!=='' && res[j].cells[code]!==undefined)){
			if(res[j].cells[code].includes('"')){
				res[j].cells[code]=res[j].cells[code].replace(/"/g,'&quot;');
			}
			var fileName=outputDirectory + 'locale-' + code.replace(/-/g, '_') + '.json';
			if(!valueInserted){
				fs.appendFile(fileName, '\n    "' + res[j].cells.LanguageKey + '": ' + '"' + res[j].cells[code] + '"' ,function(err){
					if(err) throw err;
				})
			}
			else{
				fs.appendFile(fileName, ',\n    "' + res[j].cells.LanguageKey + '": ' + '"' + res[j].cells[code] + '"' ,function(err){
					if(err) throw err;
				})
			}
			valueInserted=true;
		}
	}
	fs.appendFile(fileName, '\n}' ,function(err){
		if(err) throw err;
	})	
};


sheetrock({
  url: url,
  query: "select *",
  callback: myCallback
});