'use strict';

//dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        this.pkg = require('../package.json');

        //we expect this options
        this.option('skip-frontend');
    },

    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the riveting ' + chalk.red('mvp') + ' generator!'
        ));

        var prompts = [{
            name: 'applicationName',
            message: 'What would you like to call your application?',
            default: 'mvp'
        }, {
            name: 'applicationVersion',
            message: 'What is a version of your application?',
            default: '0.1.0'
        }, {
            name: 'applicationDescription',
            message: 'How do you describe your application?',
            default: 'A best application ever'
        }, {
            name: 'databaseName',
            message: 'What is your application database name?',
            default: 'mvp'
        }, {
            name: 'databaseHost',
            message: 'What is your application database host?',
            default: '127.0.0.1'
        }, {
            name: 'databaseUser',
            message: 'What is your application database username?',
            default: ''
        }, {
            type: 'password',
            name: 'databasePassword',
            message: 'What is your application database user password?',
            default: ''
        }, {
            name: 'databasePort',
            message: 'What is your application database port?',
            default: 27017
        }];

        this.prompt(prompts, function(props) {
            //application options
            this.applicationName = props.applicationName;
            this.applicationVersion = props.applicationVersion;
            this.applicationDescription = props.applicationDescription;

            //database options
            this.databaseName = props.databaseName;
            this.databaseHost = props.databaseHost;
            this.databaseUser = props.databaseUser;
            this.databasePassword = props.databasePassword;
            this.databasePort = props.databasePort;

            //generator options
            this.frontend = !(this.options['skip-frontend'] || false);
            this.install = !(this.options['skip-install'] || false);

            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.mkdir('app');
            this.mkdir('app/models');
            this.mkdir('app/routers');
            this.mkdir('app/controllers');


            this.template('_package.json', 'package.json');

            if (this.frontend) {
                this.template('_bower.json', 'bower.json');
            }

            this.template('app/_app.js', 'app/application.js');

            this.fs.copy(
                this.templatePath('_server.js'),
                this.destinationPath('server.js')
            );
        },


        config: function() {
            this.mkdir('config');

            this.template('config/_default.js', 'config/default.js');
            this.template('config/_development.js', 'config/development.js');
            this.template('config/_production.js', 'config/production.js');
            this.template('config/_test.js', 'config/test.js');
        },

        initializers: function() {
            this.mkdir('app/initializers');

            this.template('initializers/_mongoose.js', 'app/initializers/mongoose.js');
            this.template('initializers/_winston.js', 'app/initializers/winston.js');
        },

        views: function() {
            if (this.frontend) {

                this.mkdir('app/views');

                this.fs.copy(
                    this.templatePath('views/_site.html'),
                    this.destinationPath('app/views/site.html')
                );

                this.fs.copy(
                    this.templatePath('views/_site.html'),
                    this.destinationPath('app/views/layout.html')
                );

                this.fs.copy(
                    this.templatePath('views/_errors.html'),
                    this.destinationPath('app/views/errors.html')
                );

                this.fs.copy(
                    this.templatePath('views/_partials/_errors.html'),
                    this.destinationPath('app/views/_partials/_errors.html')
                );
            }
        },

        locals: function() {
            this.mkdir('app/locals');
            this.template('locals/_application_locals.js', 'app/locals/application_locals.js');
        },

        test: function() {
            this.mkdir('test');
            this.template('test/_bootstrap.js', 'test/bootstrap_spec.js');

            this.mkdir('test/models');
            this.mkdir('test/routers');
            this.mkdir('test/controllers');
            this.mkdir('test/locals');
            this.mkdir('test/intergration');
        },

        projectfiles: function() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );

            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );

            this.fs.copy(
                this.templatePath('test_jshintrc'),
                this.destinationPath('test/.jshintrc')
            );

            if (this.frontend) {

                this.fs.copy(
                    this.templatePath('bowerrc'),
                    this.destinationPath('.bowerrc')
                );
            }

            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copy(
                this.templatePath('gitattributes'),
                this.destinationPath('.gitattributes')
            );
            this.fs.copy(
                this.templatePath('travis.yml'),
                this.destinationPath('.travis.yml')
            );

            this.fs.copy(
                this.templatePath('_Gruntfile.js'),
                this.destinationPath('Gruntfile.js')
            );

            this.fs.copy(
                this.templatePath('yo-rc.json'),
                this.destinationPath('.yo-rc.json')
            );

            this.template('_README.md', 'README.md');
        },

        site: function() {
            if (this.frontend) {

                this.template('site/_site_router.js', 'app/routers/site_router.js');
                this.template('site/_site_controller.js', 'app/controllers/site_controller.js');

                this.fs.copy(
                    this.templatePath('site/_index.html'),
                    this.destinationPath('app/views/site/index.html')
                );
            } else {
                this.composeWith('mvp:controller', {
                    args: ['site', 'index'],
                    options: {
                        'skip-frontend': !this.frontend
                    }
                });
            }
        }
    },

    install: function() {
        //TODO split api and others dependencies
        if (this.install) {
            //npm install app dependencies
            this.npmInstall(
                [
                    'async', 'lodash', 'require-all', 'ejs', 'serve-favicon',
                    'ejs-mate', 'mongoose', 'mongoose-paginate', 'mongoose-hidden',
                    'mongoose-timestamp', 'mongoose-autopopulate', 'express',
                    'express-paginate', 'serve-favicon', 'helmet',
                    'body-parser', 'method-override', 'winston', 'express-winston',
                    'cors', 'mkdir-p', 'config'
                ], {
                    save: true
                });

            //install dev dependencies
            this.npmInstall(
                [
                    'mocha', 'chai', 'faker', 'grunt', 'grunt-express-server',
                    'supertest', 'jshint-stylish', 'time-grunt',
                    'load-grunt-tasks', 'grunt-newer', 'grunt-mocha-test',
                    'grunt-concurrent', 'grunt-contrib-clean',
                    'grunt-contrib-copy', 'grunt-contrib-jshint',
                    'grunt-contrib-watch', 'mock-express-response'
                ], {
                    saveDev: true
                });

            //install bower components if frontend enabled
            if (this.frontend) {

                this.bowerInstall(
                    [
                        'jquery', 'bootstrap', 'fontawesome'
                    ], {
                        save: true
                    });
            }

            //install bower and npm dependencies
            this.installDependencies();
        }
    }
});