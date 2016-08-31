# cui-i18n
## Description
Internationalization / localization module for use with angular on CUI products. Extracted from [angular-translate](https://github.com/angular-translate/angular-translate).

This package provides all of the language keys that are used throughout cui-ng projects.

Additionally, a "safe list" of [Countries](https://github.com/Covisint/cui-i18n/blob/master/src/main/java/com/covisint/cui/i18n/ListCountry.java) and [Timezones](https://github.com/Covisint/cui-i18n/blob/master/generateTimezones.js) supported by the Covisint APIs are also managed through this package.

Based on a certain configuration (look at the repo for more info on this) allows to easily internationalize an app.

Along with the angular module, in this repo we also provide a generator that creates the language .json (for javascript) and .properties (for java) based of a google spreadsheet.

## Usage

### If you're using the default bundle

1. Install cui-i18n as a dependency to your repo - `npm install --save @covisint/cui-i18n`
2. In your index file, add the following script tags (before your app's script)
  ```html
  <!-- All of these scripts ensure that the language loader will work as efficientely as possible
  and that we have built in translations for things like weekdays, dates and currencies. -->
  <script src="node_modules/angular-sanitize/angular-sanitize.js"></script>
  <script src="node_modules/angular-dynamic-locale/tmhDynamicLocale.min.js"></script>
  <script src="node_modules/angular-translate/dist/angular-translate.js"></script>
  <script src="node_modules/angular-translate-storage-local/angular-translate-storage-local.js"></script>
  <script src="node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
  <script src="node_modules/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
  <script src="node_modules/angular-translate-handler-log/angular-translate-handler-log.js"></script>

  <script src="node_modules/@covsint/cui-i18n/translate.js"></script>
  ```
3. Then, in your app, make sure to to pass `translate` as a dependency
  ```
  angular.module('yourApp', ['translate'])
  ```
4. Configure your app, like this
  ```javascript
  angular.app('yourApp')
  .config(['$translateProvider',($translateProvider) => {
    const languageKeys = ['en','pt','fr'];

    const returnRegisterAvailableLanguageKeys = () => {
        // Reroute unknown language to prefered language
        let object = {'*': languageKeys[0]};
        languageKeys.forEach(function(languageKey) {
            // Redirect language keys such as en_US to en
            object[languageKey + '*'] = languageKey;
        });
        return object;
    };

    $translateProvider.useLoader('LocaleLoader', {
        url: 'node_modules/@covisint/cui-i18n/dist/cui-i18n/angular-translate/',
        prefix: 'locale-',
        suffix: '.json'
    })
    .registerAvailableLanguageKeys(languageKeys, returnRegisterAvailableLanguageKeys())
    .uniformLanguageTag('java')
    .determinePreferredLanguage()
    .fallbackLanguage(languageKeys);

  }])
  .run(['LocaleService',(LocaleService) => {

     const languageNameObject = {
      'en': 'English',
      'pt': 'Portugues',
      'fr': 'Français'
     }

     for (const LanguageKey in languageNameObject) {
      LocaleService.setLocales(LanguageKey, languageNameObject[LanguageKey]);
     }
  }]);
  ```
5. Then, in your html files, use the language dropdown directive wherever you want
  ```html
  <div ng-translate-language-select></div>
  ```
and use labels wherever you want to

{% raw %}

  ```html
  {{"translation-key" | translate}}

  <!-- example -->
  {{"cui-create-security-admin-account" | translate}}
  ```
{% endraw %}

## How to build your own translations

1. Set up your fork
  1. Fork this repo
  2. Clone the fork
2. Set up the sheet that will hold your translations
  1. [Copy this sheet](https://docs.google.com/spreadsheets/d/1VbMLi5EPmkE-_tiBIgB_HRu_HNPg2-i1F9OXXzWJqGk/edit#gid=0)
  2. Customize it, following the structure by adding custom language keys and/or using keys from the default cui set as overrides
  3. [Make your sheet public](http://www.wikihow.com/Make-a-Google-Doc-Public)
3. Setup your cui-i18n project to point to that sheet
  1. In [`./generateTranslations.js`](./generateTranslations.js) customize `var codes` on line 4 to match the ones on your sheet
  2. Then, you have 2 options
    1. Build your translations on top of the default bundle, or
    2. Build solely out of your own translations
    <br/>If a. then uncomment overwriteSheetUrl and set it to your sheet's url (should end in `edit#gid=<number`)
    <br/> If b. then just set the mainSheetUrl to your sheet's url
4. Build your translations
  1. Run `npm install`
  2. Run `node generateTranslations.js`
  <br/> If everything went right, then your translations should now be under `dist/cui-i18n/angular-translate/locale-xy.json`
5. Edit your package.json, inside of the translations project 

  ```json
  {
    "name": "cui-i18n-nameOfYourProject",
    "version": "1.0.0",
    "devDependencies": {
      "grunt": "^0.4.5",
      "grunt-browser-sync": "^2.1.3",
      "grunt-contrib-concat": "^0.5.1",
      "grunt-contrib-copy": "^0.8.2",
      "grunt-contrib-cssmin": "^0.14.0",
      "grunt-contrib-uglify": "^0.10.0",
      "grunt-contrib-watch": "^0.6.1",
      "grunt-exec": "^0.4.6",
      "grunt-filerev": "^2.3.1",
      "grunt-usemin": "^3.1.1",
      "load-grunt-tasks": "^3.3.0",
      "sheetrock": "^1.0.0"
    },
    "files":
    [
      "dist/"
    ]
  }
  ```

6. Push your edited repo upstream
7. Add that dependency to your app's package.json
  1. Go into your package.json file, inside of your app's project
  2. Add `"cui-i18n-nameOfYourProject": "git+ssh://git@github.com:GitHubUserOrGroupName/cui-i18n-nameOfYourProject.git"`
  3. Run `npm install`
