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
                    'server.js',
                    '<%= project.app %>/**/*.*',
                    '<%= project.appConfig %>/**/*.*'
                ],
                tasks: ['newer:jshint:all', 'express:dev'],
                options: {
                    spawn: false
                }
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
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
                    /* jshint ignore:start */
                    node_env: 'development'
                        /* jshint ignore:end */
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    /* jshint ignore:start */
                    node_env: 'production'
                        /* jshint ignore:end */
                }
            },
            test: {
                options: {
                    script: 'server.js',
                    /* jshint ignore:start */
                    node_env: 'test'
                        /* jshint ignore:end */
                }
            }
        },

        //---------------------------
        //js hint task configuration
        //---------------------------
        // Make sure code styles are up to par and 
        // there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: ['Gruntfile.js']
            },
            all: {
                src: [
                    'server.js',
                    '<%= project.app %>/**/*.js',
                    '<%= project.appConfig %>/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= project.test %>/**/*.js']
            }
        },
    });

    //run in development environment
    grunt.registerTask('dev', ['newer:jshint', 'express:dev', 'watch']);

    //run in production environment
    grunt.registerTask('prod', ['newer:jshint', 'express:prod', 'watch']);

    //runt in test environment
    grunt.registerTask('test', ['newer:jshint', 'express:test', 'watch']);


};