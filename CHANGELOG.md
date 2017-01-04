# Cui-i18n Changelog

## [1.0.21] - 2017-1-4

### Changed
* Adds angular as a dependency to possibly prevent angular-translate from bringing in the newest version of angular in downstream projects


## [1.0.20] - 2017-1-4

#### Changed
* Locked all dependency versions


## [1.0.16] - 2016-10-25

### Changed
* The dist directory contains the original structure, plus a versioned structure.
* `grunt build` now requires that you supply it a version number.
* Adds ascii script to `grunt build`.
	* `grunt build --newVersion=<version>`
* Generate scripts (generateTimezones.js, generateTranslations.js, generateMessaging.js) now require the `initDist.js`
script to be run beforehand.
* `initDist.js` now requires a version number to be passed as a parameter.

## [1.0.15] - 2016-10-21

### Changed
* The dist directory now follows a slightly changes folder structure. This is a breaking change for projects using this dependency. 
	* Before: `dist/cui-i18n/...`
	* After: `dist/<i18n version number>/cui-i18n/...`


## [1.0.13] - 2016-09-08

### Added
- addition of "unlock" button, confirmation message and error message when unlocking a user account
- added automated Google Translate content for new rows that did not have any translations yet. (row 290 + at the time of the release.)

### Changed
- README updates for better parsing by upstream Gitbook
- CHANGELOG updates


## [1.0.12] - 2016-08-22

### Added
- latest official translations from actual people, not Google translate.
- Changes link in the README to point to an empty sample translation template. The empty template is encuraged to be used instead of having a full set of translation keys in your own custom repository.

### Fixed
- the password rules had variables that were not working correctly in some langauges. this has been resolved.


## [1.0.10] - 2016-08-06

### Changed
- Additional language keys updated by humans.


## [1.0.9] - 2016-06-28

### Added
- Initial public release of the CUI i18n Library
