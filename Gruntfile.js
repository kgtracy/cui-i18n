module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  const packageJson = require('./package.json')

  grunt.initConfig ({
    browserSync: {
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
    },
    copy: {
      index: {
        src: 'index.html',
        dest: 'build/index.html'
      },
      index2: {
        src: 'index2.html',
        dest: 'build/index2.html'
      },
      countries: {
        expand: true,
        cwd: 'assets/countries/',
        src: '*.json',
        dest: 'dist/' + packageJson.version + '/cui-i18n/angular-translate/countries/'
      },
      localeFiles: {
        src: 'bower_components/angular-i18n/*.js',
        dest: 'build/'
      },
      dist: {
        src : 'dist/**/*.json',
        dest: 'build/'
      }
    },
    useminPrepare: {
      html: '*.html',
      options: {
        dest: 'build'
      }

    },
    usemin: {
      css: ['build/assets/css/{,*/}*.css'],
      js: ['build/assets/js/{,*/}*.js'],
      html: ['build/*.html'],
      options: {
        assetsDirs: ['build']
      }
    },
    uglify: {
      options: {
        mangle: false
      }
    },
    exec: {
      init: 'node initDist.js',
      generate: 'node generateTranslations.js && node generateMessaging.js && node generateTimezones.js' 
    },
    clean: ['dist/']

  });

  grunt.registerTask('default', ['browserSync:dev']);

  grunt.registerTask('build', [
    'clean',
    'exec:init',
    'exec:generate',
    'copy',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin'
  ]);

  grunt.registerTask('demo', ['browserSync:demo']);
}