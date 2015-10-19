'use strict';

// dependencies
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = yeoman.generators.base.extend({

    prepare: function() {
        //deduce database name from application name
        var packageJson = {};

        try {
            packageJson = require(path.join(process.cwd(), 'package.json'));
        } catch (e) {}

        if (packageJson.name) {
            this.applicationName = packageJson.name;
        } else {
            this.applicationName = path.basename(process.cwd());
        }

        this.databaseName = this.applicationName;

    },

    writing: {
        openshift: function() {
            //add openshift nodejs pre start hook
            this.fs.copy(
                this.templatePath('_pre_start_nodejs'),
                this.destinationPath('.openshift/action_hooks/pre_start_nodejs')
            );

            //override production configurations
            this.template('_production.js', 'app/config/production.js');
        }
    }

});
