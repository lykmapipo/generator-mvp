'use strict';

//dependencies
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var inflection = require('inflection');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {

        //grab commandline arguments
        this.modelDefinition = this.arguments[0];

        //prepare model name and fields
        var splits = this.modelDefinition.split(' ');

        //handle console & test adapters
        if (splits.length <= 1) {
            splits = _.union(splits, this.arguments);
        }

        this.controllerName = splits.shift().toLowerCase();

        //generator options
        this.frontend = !(this.options['skip-frontend'] || false);

        //preapare common class names for endpoints generation
        this.className = inflection.camelize(this.controllerName);
        this.singular = this.className.toLowerCase();

        this.classPlural = inflection.pluralize(this.className);
        this.plural = this.classPlural.toLowerCase();

    },

    writing: {
        controller: function() {
            this.template('_controller.js', 'app/controllers/' + this.controllerName + '_controller.js');
            this.template('_controller_spec.js', 'test/controllers/' + this.controllerName + '_controller_spec.js');
        },
        router: function() {
            this.template('_router.js', 'app/routers/' + this.controllerName + '_router.js');
            this.template('_router_spec.js', 'test/routers/' + this.controllerName + '_router_spec.js');

        },
        model: function() {
            this.composeWith('mvp:model', {
                args: this.arguments,
                options: this.options
            });
        }
    }
});