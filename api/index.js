'use strict';

//dependencies
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var inflection = require('inflection');
var Utils = require(path.join(__dirname, '..', 'utils'));

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

        this.controllerName = this.modelName = splits.shift().toLowerCase();

        this.modelFields = !_.isEmpty(splits) ? splits : ['name:String'];


        //generator options
        this.frontend = !(this.options['skip-frontend'] || false);

        //preapare common class names for endpoints generation
        this.className = inflection.classify(this.controllerName);
        this.singular = this.className.toLowerCase();

        this.classPlural = inflection.pluralize(this.className);
        this.plural = this.classPlural.toLowerCase();

    },

    prepareFields: function() {
        Utils.prepareSchemaFields.call(this);
    },

    prepareFakerSeed: function() {
        //prepare faker model seed
        Utils.prepareFakerSeedFields.call(this);

        var template = this.read('_seed.js');
        this.seed = this.engine(template, this);
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