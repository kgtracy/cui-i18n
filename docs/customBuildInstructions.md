# How to build your own translations

1. Set up your fork
  1. Fork this repo
  2. Clone the fork
2. Set up the sheet that will hold your translations
  1. [Copy this sheet](https://docs.google.com/spreadsheets/d/1HM5GLoTXQSuSn0tJxAK6jT1qqNLz1Vc3SbvHZbvxeHo/edit#gid=0)
  2. Customize it, following the structure
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
5. Push your edited repo upstream
6. Use that repo as your bower dependency, instead of cui-i18n
  1. Go into your bower.json file, inside of your app's project
  2. Change `'cui-i18n':'#master'` to `'cui-i18n':'git@github.com:gitgubUsernameHere/cui-i18n.git#master'`
  3. Run bower update
7. Make sure you setup your translations in your app's config to match your new language keys (follow the instructions [here](./README.md))
