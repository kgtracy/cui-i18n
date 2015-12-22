# cui-i18n
Internationalization / localization module for use with angular on CUI products. The module will look up the value for the selected language based on the translation key.

## Usage

### In your Angular app

```javascript
  //...
  .run(['LocaleService', function(LocaleService){
        LocaleService.setLocales('en_US','English (United States)');
        LocaleService.setLocales('pl_PL','Polish (Poland)');
        LocaleService.setLocales('zh_CN','Chinese (Simplified)');
        LocaleService.setLocales('pt_PT','Portuguese (Portugal)');
  }])
  .config(['$translateProvider',function($translateProvider){
        $translateProvider.useLoader('LocaleLoader',{
            url:'bower_components/cui-i18n/dist/cui-i18n/angular-translate/',
            prefix:'locale-'  // Look in bower_components/cui-i18n/dist/cui-i18n/angular-translate/ for files that
                  // look like locale-<language code>, so ex: locale-en_US.json. This can also be pointed
                  // at a URL.
        });
  }]);
```

Then, in your html

```html
{{"translation_key" | translate}}

<!-- example -->
{{"cui-create-security-admin-account" | translate}}
```



