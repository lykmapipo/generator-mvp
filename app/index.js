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
        }];

        this.prompt(prompts, function(props) {

            this.applicationName = props.applicationName;
            this.applicationVersion = props.applicationVersion;
            this.applicationDescription = props.applicationDescription;

            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.template('_package.json', 'package.json');
            this.template('_bower.json', 'bower.json');
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
                this.templatePath('travic.yml'),
                this.destinationPath('.travic.yml')
            );
        }
    },

    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});