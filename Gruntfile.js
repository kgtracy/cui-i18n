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
      translations: {
        src: 'dist/cui-i18n/angular-translate/*.json',
        dest: 'build/bower_components/cui-i18n/'
      },
      localeFiles: {
        src: 'bower_components/angular-i18n/*.js',
        dest: 'build/'
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'build'
      }
    },
    usemin: {
      options: {
        assetsDirs: ['build']
      },
      css: ['build/assets/css/{,*/}*.css'],
      js: ['build/assets/js/{,*/}*.js'],
      html: ['build/index.html']
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

 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-exec');
  
  grunt.registerTask('default', ['browserSync:dev']);
  grunt.registerTask('build', ['exec:generate','copy:translations','copy:localeFiles','copy:index','useminPrepare','concat:generated','cssmin:generated','uglify:generated','usemin']);
  grunt.registerTask('demo', ['browserSync:demo']);
}