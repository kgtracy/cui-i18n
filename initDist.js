'use strict'

const fs = require('fs')

/*
*	This script creates a versioned dist directory
*	Running: 	node initDist.js <version>
*/

const args = process.argv.slice(2)

if (!args[0]) {
	console.error('initDist: Must provide a version to create the directory under!')
	return
}

// Top level directories
const distDir = './dist/'
const versionDir = distDir + args[0] + '/'
const i18nDir = distDir + 'cui-i18n/'
const versionedI18nDir = versionDir + 'cui-i18n/'

// Directories under ./dist/{{version}}/cui-i18n/
const files = [
	'angular-translate/',
	'angular-translate/countries/',
	'angular-translate/timezones/',
	'java/',
	'java/ascii/',
	'messaging/',
	'messaging/java/',
	'messaging/json'
]

// Create top level directories
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir)
if (!fs.existsSync(versionDir)) fs.mkdirSync(versionDir)
if (!fs.existsSync(i18nDir)) fs.mkdirSync(i18nDir)
if (!fs.existsSync(versionedI18nDir)) fs.mkdirSync(versionedI18nDir)

// Create sub-directories
files.forEach(directory => {
	if (!fs.existsSync(i18nDir + directory)) fs.mkdirSync(i18nDir + directory)
	if (!fs.existsSync(versionedI18nDir + directory)) fs.mkdirSync(versionedI18nDir + directory)
})
