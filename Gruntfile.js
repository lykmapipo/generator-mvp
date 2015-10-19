'use strict';

module.exports = function(grunt) {

    // add grunt tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 20000
                },
                src: ['test/**/*.js']
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'utils.js',
                'angular/index.js',
                'api/index.js',
                'app/index.js',
                'controller/index.js',
                'lib/index.js',
                'middleware/index.js',
                'model/index.js',
                'scaffold/index.js',
                'test/**/*.js'
            ]
        },
        watch: {
            all: {
                files: [
                    'Gruntfile.js',
                    'utils.js',
                    'api/index.js',
                    'app/index.js',
                    'controller/index.js',
                    'scaffold/index.js',
                    'model/index.js',
                    'test/**/*.js'
                ],
                tasks: ['default']
            }
        }
    });

    //custom tasks
    grunt.registerTask('default', ['jshint', 'mochaTest', 'watch']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);

};