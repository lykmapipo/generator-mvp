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
        this.controllerPath = '';
        this.subpath = '';

        //check for subpath
        var subpath = this.controllerName.split('.');
        if (subpath && subpath.length > 1) {
            this.controllerName = this.modelName = subpath.pop();

            this.controllerPath = '';

            /*jshint quotmark:double*/
            for (var i = 0; i < subpath.length; i++) {
                this.controllerPath = this.controllerPath + "'..', ";
            }
            this.controllerPath = this.controllerPath + "'controllers', ";
            this.controllerPath = _.reduce(subpath, function(full, path) {
                return full + "'" + path + "', ";
            }, this.controllerPath);
            this.controllerPath = _.trimRight(this.controllerPath, ", ");
            /*jshint quotmark:single*/

            this.subpath = subpath.join('/');
        }

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
            this.template('_controller.js', 'app/controllers/' + this.subpath + '/' + this.controllerName + '_controller.js');
            this.template('_controller_spec.js', 'test/controllers/' + this.subpath + '/' + this.controllerName + '_controller_spec.js');
        },
        router: function() {
            this.template('_router.js', 'app/routers/' + this.subpath + '/' + this.controllerName + '_router.js');
            this.template('_router_spec.js', 'test/routers/' + this.subpath + '/' + this.controllerName + '_router_spec.js');

        },
        model: function() {
            this.composeWith('mvp:model', {
                args: this.arguments,
                options: this.options
            });
        }
    }
});