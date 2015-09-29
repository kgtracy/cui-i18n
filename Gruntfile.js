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
      }
    },

  });

 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  
  grunt.registerTask('default', ['browserSync']);
}