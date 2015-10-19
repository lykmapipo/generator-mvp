'use strict';

// dependencies
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = yeoman.generators.base.extend({

    prompting: function() {
        var done = this.async();

        this.log(yosay(
            'Welcome to Openshift ' + chalk.red('mvp') + 'generator'
        ));

        var prompts = []; // questions to interact with use
    };
});
