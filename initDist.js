'use strict'

const fs = require('fs')
const packageJson = require('./package.json')

const distDir = './dist/'
const versionDir = distDir + packageJson.version + '/'
const cuiI18nDir = versionDir + 'cui-i18n/'

const files = [
	'angular-translate/',
	'angular-translate/countries/',
	'angular-translate/timezones/',
	'java/',
	'messaging/',
	'messaging/java/',
	'messaging/json'
]

if (!fs.existsSync(distDir)) fs.mkdir(distDir)
if (!fs.existsSync(versionDir)) fs.mkdir(versionDir)
if (!fs.existsSync(cuiI18nDir)) fs.mkdir(cuiI18nDir)

files.forEach(directory => {
	if (!fs.existsSync(cuiI18nDir + directory)) fs.mkdir(cuiI18nDir + directory)
})
