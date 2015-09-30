# cui-i18n
Internationalization / localization module

## Usage
1. Run ```npm install``` and ```bower install```
2. Go into resources and run ```npm install``` from there. Running ```node node.js``` in this folder will fetch translations from a google spreadsheet and output them to the correct files.
2. Run ```grunt``` from the root folder..


## Locale file generator
Running ```npm install``` and ```node node.js``` in this folder will output locale files for whatever languages codes you insert into the ```codes``` array inside of node.js. It fetches this info from the spreadsheet you put into the ```url``` var.
<b>The spreadsheet MUST be public.</b>

The layout of the spreadsheet should be:

    Language Key     |      en-US       |       pt-PT     |
    
    say-hello		 |      Hello!      |        Ola!     |
    say-goodbye      |       Bye!       |       Adeus!    |	

The script will ignore anything that doesn't have a language key or any language codes that aren't in the ```codes``` array.