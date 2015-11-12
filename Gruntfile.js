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
      translations: {
        src: 'dist/cui-i18n/**/*.json',
        dest: 'build/bower_components/cui-i18n/'
      },
      localeFiles: {
        src: 'bower_components/angular-i18n/*.js',
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
      generate: 'node generate.js'
    }

  });
  
  grunt.registerTask('default', ['browserSync:dev']);
  grunt.registerTask('build', ['exec:generate','copy:translations','copy:localeFiles','copy:index','copy:index2','useminPrepare','concat:generated','cssmin:generated','uglify:generated','usemin']);
  grunt.registerTask('demo', ['browserSync:demo']);
}