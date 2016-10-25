module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)

    const packageJson = require('./package.json')

    const config = {
        version: packageJson.version,
        newVersion: grunt.option('newVersion')
    }

    const tasks = ['browserSync', 'clean', 'copy', 'exec', 'uglify', 'usemin', 'useminPrepare']

    const opts = {
        config: config
    }

    tasks.forEach(task => {
        opts[task] = require('./tasks/' + task + '.js')(grunt, config)
    })

    grunt.initConfig(opts)
    

    // Grunt Tasks --------------------------------------------------

    grunt.registerTask('default', [
        'browserSync:dev'
    ])

    grunt.registerTask('build', [
        'clean',
        'exec:init',
        'exec:generate',
        'exec:ascii',
        'copy',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin'
    ])

    grunt.registerTask('demo', [
        'browserSync:demo'
    ])
}
