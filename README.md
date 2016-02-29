# cui-i18n
Internationalization / localization module for use with angular on CUI products. The module will look up the value for the selected language based on the translation key.

## Usage

### How to generate a new dist folder for your own custom translations (please read if you're forking this repo)

After forking and cloning to your machine, run `bower install` and `npm install`.
Copy this spreadsheet https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0
Then, in generateTranslation.js, set the language keys that you are using to `var codes` and the url for your spreadsheet, here
```javascript
 sheetrock({
  url: "https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0",
  query: "select *",
  callback: translationCallback
});
```
After doing that, run `grunt build`. If this runs successfully, you should now have an updated dist folder, check under
`dist -> cui-i18n -> angular-translate -> locale-xy.json` for your translations.
Then, in your project's bower.json, make sure to point `cui-i18n` to your fork, like this:
`'cui-i18n':'git@github.com:gitgubUsernameHere/cui-i18n.git#master’.


### In your Angular app

```javascript
  //...
  .run(['LocaleService','$cuiI18n', function(LocaleService,$cuiI18n){
      var languageNameObject=$cuiI18n.getLocaleCodesAndNames();
      for(var LanguageKey in languageNameObject){
        LocaleService.setLocales(LanguageKey,languageNameObject[LanguageKey]);
      };
  }])
  .config(['$translateProvider','$cuiI18nProvider',function($translateProvider,$cuiI18nProvider){
        $cuiI18nProvider.setLocaleCodesAndNames( // put these in the order of preference for language fallback
        // ADD LANGUAGES HERE ONLY
        {
            'en':'English',
            'pt':'Portuguese',
            'pl':'Polish',
            'zh':'Chinese'
        }
    )

    var languageKeys=Object.keys($cuiI18nProvider.getLocaleCodesAndNames());

    var returnRegisterAvailableLanguageKeys=function(){
        var object={'*':languageKeys[0]}; // set unknown languages to use prefered language as fallback
        languageKeys.forEach(function(languageKey){
            object[languageKey+'*']=languageKey // redirect language keys such as en_US to en or en-US to en
        })
        return object;
    }

    $translateProvider
    .useLoader('LocaleLoader',{
        url:'bower_components/cui-i18n/dist/cui-i18n/angular-translate/',
        prefix:'locale-',
        suffix:'.json'
    })
    .registerAvailableLanguageKeys(languageKeys,returnRegisterAvailableLanguageKeys())
    .uniformLanguageTag('java')
    .determinePreferredLanguage() // gets browser language and uses that as default
    .fallbackLanguage(languageKeys);

    $cuiI18nProvider.setLocalePreference(languageKeys);
  }]);
```

Then, in your html

```html
{{"translation_key" | translate}}

<!-- example -->
{{"cui-create-security-admin-account" | translate}}
```
## Change log 1/18/2016

* localeloader now takes a suffix for different file types and urls