module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
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
      generate: 'node generateTranslations.js && node generateMessaging.js'
    }

  });

  grunt.registerTask('default', ['browserSync:dev']);
  grunt.registerTask('build', ['exec:generate','copy','useminPrepare','concat:generated','cssmin:generated','uglify:generated','usemin']);
  grunt.registerTask('demo', ['browserSync:demo']);
}