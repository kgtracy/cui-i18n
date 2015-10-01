# cui-i18n
Internationalization / localization module

## Usage
1. Run ```npm install``` and ```bower install```
2. Run ```grunt``` from the root folder..

### To add more locales
Edit this part of the translate.js file.
```javascript
    .constant('LOCALES', {
        'locales': {
        	//add more locales here
            'pt_PT': 'Portugal',
            'en_US': 'United States'
        },
        'preferredLocale': 'en_US'
    })
```
The translate.js module will get translations from the files located in the directory defined at
```javascript
    $translateProvider.useStaticFilesLoader({
        prefix: 'dist/cui-i18n/angular-translate/locale-',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
    });
```

## Locale file generator
Running ```npm install``` and ```node node.js``` in this folder will output locale files for whatever languages codes you insert into the ```codes``` array inside of node.js. It fetches this info from the spreadsheet you put into the ```url``` var.
<b>The spreadsheet MUST be public.</b>

The layout of the spreadsheet should be:

    Language Key     |      en-US       |       pt-PT     |
    
    say-hello		 |      Hello!      |        Ola!     |
    say-goodbye      |       Bye!       |       Adeus!    |	

The script will ignore anything that doesn't have a language key or any language codes that aren't in the ```codes``` array.
