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

        this.modelName = splits.shift().toLowerCase();

        this.modelNamePlural = inflection.pluralize(this.modelName);
        this.modelFields = !_.isEmpty(splits) ? splits : ['name:String'];


        //preapare common class names for model generation
        this.className = inflection.classify(this.modelName);
        this.classPlural = inflection.pluralize(this.className);

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

    checkMixedAndRefTypesPresense: function() {
        Utils.hasMixedDataTypes.call(this);
        Utils.hasRefDataTypes.call(this);
    },

    writing: {
        model: function() {
            this.template('_model.js', 'app/models/' + this.modelName + '_model.js');
        },
        test: function() {
            this.template('_spec.js', 'test/models/' + this.modelName + '_model_spec.js');
        }
    }
});