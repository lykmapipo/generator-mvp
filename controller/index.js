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

        this.actions = !_.isEmpty(splits) ? splits : ['index'];


        //preapare common class names for model generation
        this.className = inflection.camelize(this.controllerName);
        this.classPlural = inflection.pluralize(this.className);
        this.plural = this.classPlural.toLowerCase();

        //generator options
        this.frontend = !(this.options['skip-frontend'] || false);

    },


    writing: {
        controller: function() {
            this.template('_controller.js', 'app/controllers/' + this.controllerName + '_controller.js');
        },
        router: function() {
            this.template('_router.js', 'app/routers/' + this.controllerName + '_router.js');
        },
        test: function() {
            this.template('_controller_spec.js', 'test/controllers/' + this.controllerName + '_controller_spec.js');
            this.template('_router_spec.js', 'test/routers/' + this.controllerName + '_router_spec.js');
        }
    }
});