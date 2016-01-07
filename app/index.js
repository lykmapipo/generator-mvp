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
        }, {
            name: 'gitHost',
            message: 'What is your git host url?',
            default: 'https://github.com'
        }, {
            name: 'gitName',
            message: 'What is your git username?',
            default: ''
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

            //version control options
            this.gitHost = props.gitHost;
            this.gitName = props.gitName || this.applicationName;

            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.mkdir('app');

            //models dir
            this.mkdir('app/models');
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('app/models/.gitkeep')
            );

            //routers dir
            this.mkdir('app/routers');
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('app/routers/.gitkeep')
            );

            //controllers dir
            this.mkdir('app/controllers');
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('app/controllers/.gitkeep')
            );

            //middleware dir
            this.mkdir('app/middlewares');
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('app/middlewares/.gitkeep')
            );

            //libs dir
            this.mkdir('app/libs');
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('app/libs/.gitkeep')
            );

            this.template('_package.json', 'package.json');

            //writing pm2 file
            this.template('_production.json', 'production.json');

            this.template('app/_app.js', 'app/application.js');

            this.fs.copy(
                this.templatePath('_server.js'),
                this.destinationPath('server.js')
            );
        },


        config: function() {
            this.mkdir('config');
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('config/.gitkeep')
            );

            this.template('config/_default.js', 'config/default.js');
            this.template('config/_development.js', 'config/development.js');
            this.template('config/_production.js', 'config/production.js');
            this.template('config/_test.js', 'config/test.js');
        },

        initializers: function() {
            this.mkdir('app/initializers');
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('app/initializers/.gitkeep')
            );

            this.template('initializers/_mongoose.js', 'app/initializers/mongoose.js');
            this.template('initializers/_winston.js', 'app/initializers/winston.js');
        },

        setup: function() {
            this.fs.copy(
                this.templatePath('app/_party.js'),
                this.destinationPath('app/models/party_model.js')
            );

            this.fs.copy(
                this.templatePath('app/_app_controller.js'),
                this.destinationPath('app/controllers/application_controller.js')
            );

            this.fs.copy(
                this.templatePath('app/_app_router.js'),
                this.destinationPath('app/routers/application_router.js')
            );

            this.fs.copy(
                this.templatePath('app/_jwtAuth.js'),
                this.destinationPath('app/middlewares/jwtAuth.js')
            );

            //copy libs
            this.fs.copy(
                this.templatePath('libs'),
                this.destinationPath('app/libs')
            );

        },

        views: function() {

            this.mkdir('app/views');

            this.fs.copy(
                this.templatePath('views/emails'),
                this.destinationPath('app/views/emails')
            );
        },

        test: function() {
            this.mkdir('test');
            this.template('test/_bootstrap.js', 'test/bootstrap_spec.js');

            this.mkdir('test/models');
            this.mkdir('test/routers');
            this.mkdir('test/controllers');
            this.mkdir('test/middlewares');
            this.mkdir('test/libs');
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
        }
    },

    install: function() {
        if (this.install) {
            //npm install app dependencies
            this.npmInstall(
                [
                    'async', 'lodash', 'require-all', 'ejs', 'serve-favicon',
                    'mongoose', 'mongoose-valid8', 'mongoose-searchable',
                    'mongoose-hidden',
                    'mongoose-timestamp', 'mongoose-autopopulate', 'express',
                    'express-mquery', 'irina', 'email-templates',
                    'express-paginate', 'serve-favicon', 'helmet',
                    'jsonwebtoken', 'nodemailer', 'nodemailer-wellknown',
                    'nodemailer-sendgrid-transport', 'seed-mongoose',
                    'body-parser', 'method-override', 'winston', 'express-winston',
                    'cors', 'mkdir-p', 'config', 'express-respond'
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
                    'grunt-contrib-watch', 'mock-express-request',
                    'mock-express-response'
                ], {
                    saveDev: true
                });
        }
    }
});