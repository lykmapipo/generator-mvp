'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        this.pkg = require('../package.json');
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
            default: 'localhost'
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

            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.mkdir('app');
            this.mkdir('app/models');
            this.mkdir('app/routers');


            this.template('_package.json', 'package.json');
            this.template('_bower.json', 'bower.json');
            this.template('app/_app.js', 'app/application.js');

            this.fs.copy(
                this.templatePath('_server.js'),
                this.destinationPath('server.js')
            );
        },

        views: function() {
            this.mkdir('app/views');

            this.fs.copy(
                this.templatePath('views/site.html'),
                this.destinationPath('views/site.html')
            );

            this.fs.copy(
                this.templatePath('views/errors.html'),
                this.destinationPath('views/errors.html')
            );
        },

        locals: function() {
            this.mkdir('app/locals');
            this.template('locals/_application_locals.js', 'app/locals/application_locals.js');
        },

        test: function() {
            this.mkdir('test');
            this.mkdir('test/models');
            this.mkdir('test/routers');
            this.mkdir('test/locals');
            this.mkdir('test/intergration');
        },

        config: function() {
            this.mkdir('config');

            this.template('config/_mongoose.js', 'config/mongoose.js');
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

            this.template('_README.md', 'README.md');
        },

        site: function() {

        }
    },

    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});