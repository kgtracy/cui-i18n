# cui-i18n
Internationalization / localization module for use with angular on CUI products. 
The module will look up the value for the selected language based on the translation key.

## Usage

### If you're using the default bundle

* Install cui-i18n as a dependency to your repo - `bower install --save cui-i18n`
* In your index file, add the following script tags (before your app's script)
```html
<!-- All of these scripts ensure that the language loader will work as efficientely as possible
and that we have built in translations for things like weekdays, dates and currencies. -->
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/angular-dynamic-locale/tmhDynamicLocale.min.js"></script>
<script src="bower_components/angular-translate/angular-translate.js"></script>
<script src="bower_components/angular-translate-storage-local/angular-translate-storage-local.js"></script>
<script src="bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
<script src="bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
<script src="bower_components/angular-translate-handler-log/angular-translate-handler-log.js"></script>

<script src="bower_components/cui-i18n/translate.js"></script>
```
* Then, in your app, make sure to to pass `translate` as a dependency
```javascript
angular.module('yourApp', ['translate'])
```
* Configure your app, like this
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
      url: 'bower_components/cui-i18n/dist/cui-i18n/angular-translate/',
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
* Then, in your html files, use the language dropdown directive wherever you want
```html
<div ng-translate-language-select></div>
```
and use labels wherever you want to
```html
{{"translation_key" | translate}}

<!-- example -->
{{"cui-create-security-admin-account" | translate}}
```

### [If want to build your own set of translations](docs/customBuildInstructions.md)

## Change log 1/18/2016

* localeloader now takes a suffix for different file types and urls

## Change log 3/10/2016

* Adds translations to timezones

## Change log 3/10/2016

* Updates keys for timezones JSON files
