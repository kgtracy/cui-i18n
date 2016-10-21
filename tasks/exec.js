module.exports = function(grunt) {
    return {
        init: 'node initDist.js',
        generate: 'node generateTranslations.js && node generateMessaging.js && node generateTimezones.js' 
    }
}
