module.exports = function(grunt) {
    return {
        dev: {
            bsFiles: {
                src : [
                    '*.html',
                    '*.js',
                    '*.css'
                ]
            },
            options: {
                watchTask: false,
                online: true,
                server:{
                    baseDir: './'
                }
            }
        },
        demo: {
            bsFiles: {
                src : [
                    '*.html',
                    '*.js',
                    '*.css'
                ]
            },
            options: {
                watchTask: false,
                online: true,
                server:{
                    baseDir: 'build/'
                }
            }
        }
    }
}
