'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        appConfig: 'config',
        test: 'test'
    };


    // Define the configuration for all the tasks
    grunt.initConfig({
        project: appConfig,

        //--------------------------
        //watch task configuration
        //--------------------------
        watch: {
            options: {
                livereload: true
            },
            express: {
                files: [
                    '<%= project.app %>/**/*.*',
                    '<%= project.appConfig %>/**/*.*'
                ],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },

        //----------------------------------
        //express server task configuration
        //----------------------------------
        express: {
            dev: {
                options: {
                    script: 'server.js',
                    node_env: 'development'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'server.js',
                    node_env: 'test'
                }
            }
        },

        //---------------------------
        //jshint task configuration
        //---------------------------
    });

    //run in development environment
    grunt.registerTask('dev', ['express:dev', 'watch']);

    //run in production environment
    grunt.registerTask('prod', ['express:prod', 'watch']);

    //runt in test environment
    grunt.registerTask('test', ['express:test', 'watch']);

};