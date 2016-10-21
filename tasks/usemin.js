module.exports = function(grunt) {
    return {
        css: ['build/assets/css/{,*/}*.css'],
        js: ['build/assets/js/{,*/}*.js'],
        html: ['build/*.html'],
        options: {
            assetsDirs: ['build']
        }
    }
}
