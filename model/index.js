'use strict';
var yeoman = require('yeoman-generator');
var inflection = require('inflection');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        //grab commandline argumrnts
        this.modelDefinition = this.arguments[0];

        //prepare model name and fields
        var splits = this.modelDefinition.split(' ');
        this.modelName = splits.shift();
        this.modelFields = splits || 'name:String';

        //preapare common class names for model generation
        this.className = inflection.camelize(this.modelName);
        this.classPlural = inflection.pluralize(this.className);

    },

    prepareFields: function() {
        var fields = {};
        var attributes = this.modelFields;

        //prepare model fields
        attributes.forEach(function(attribute) {

            var attributeMeta = attribute.split(':');

            var attributeName = attributeMeta.shift();
            var attributeType =
                inflection.classify(attributeMeta.shift());


            if (attributeType === 'Array') {
                fields[attributeName] = {
                    type: JSON.stringify([attributeMeta.shift() || {}])
                };
            } else if (attributeType === 'ObjectId') {
                fields[attributeName] = {
                    type: attributeType,
                    ref: "'" + attributeMeta.shift() + "'"
                };

            } else {
                fields[attributeName] = {
                    type: attributeType
                }
            }
        });

        this.fields = fields;
    },

    writing: {
        model: function() {
            this.template('_model.js', 'app/models/' + this.modelName + '_model.js');
        },
        test: function() {
            this.template('_spec.js', 'test/models/' + this.modelName + '.spec.js');
        }
    }
});