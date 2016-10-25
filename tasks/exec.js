module.exports = function(grunt, config) {
    return {
        init: 'node initDist.js ' + config.newVersion,
        generate: 'node generateTranslations.js && node generateMessaging.js && node generateTimezones.js',
        ascii: 'source scripts/native2ascii ' + config.newVersion
    }
}
