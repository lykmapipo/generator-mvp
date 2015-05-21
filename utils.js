'use strict';

//dependencies
var _ = require('lodash');
var inflection = require('inflection');

/**
 * @description common shared helpers
 * @type {Object}
 */
module.exports = {
    /**
     * @description prepare model schema fields
     * @return {Object} a hash contain all schema fields definitions
     */
    prepareSchemaFields: function() {
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
                    /*jshint quotmark: double*/
                    ref: "'" + attributeMeta.shift() + "'"
                        /*jshint quotmark: single*/
                };

            }

            //Mixed, Boolean, Date,Number & String no special ops
            else {
                fields[attributeName] = {
                    type: attributeType
                };
            }
        });

        this.fields = fields;
    },


    prepareFakerSeedFields: function() {
        var fields = {};
        var attributes = this.modelFields;

        //prepare model fields
        attributes.forEach(function(attribute) {

            var attributeMeta = attribute.split(':');

            var attributeName = attributeMeta.shift();
            var attributeType =
                inflection.classify(attributeMeta.shift());


            fields[attributeName] = {
                type: attributeType
            };
        });

        this.seedFields = fields;
    },


    /**
     * @description convert given model schema field to HTML5 input types
     * @return {Object}
     */
    schemaFieldsToFormFields: function() {
        var generator = this;
        var formFields = [];
        var className = this.singular;
        var attributes = this.fields || {};
        var attributeNames = _.keys(attributes);

        attributeNames.forEach(function(attributeName) {

            var attributeType = attributes[attributeName].type;
            var accessor = className + '.' + attributeName;

            var input = {
                name: attributeName,
                label: inflection.classify(attributeName),
                accessor: '<%= ' + className + '.' + attributeName + ' %>',
                value: '<%= ' + accessor + ' ? ' + accessor + ' : ' + '\'\'' + ' %>'
            };

            //prepare number input type
            if (attributeType === 'Number') {

                formFields.push(_.extend(input, {
                    type: 'number',
                    template: generator.engine(generator.read('inputs/_number.html'), input)
                }));
            }

            //prepare date input type
            else if (attributeType === 'Date') {

                formFields.push(_.extend(input, {
                    type: 'date',
                    template: generator.engine(generator.read('inputs/_date.html'), input)
                }));
            }

            //prepare boolean input type
            else if (attributeType === 'Boolean') {

                formFields.push(_.extend(input, {
                    type: 'checkbox',
                    template: generator.engine(generator.read('inputs/_checkbox.html'), input)
                }));
            }

            //prepare text input type
            else {

                formFields.push(_.extend(input, {
                    type: 'text',
                    template: generator.engine(generator.read('inputs/_text.html'), input)
                }));
            }
        });

        this.attributes = formFields;
    },

    //check if schema fields contain mixed type
    hasMixedDataTypes: function() {
        var result = _.where(this.fields, {
            type: 'Mixed'
        });


        this.hasMixed = !_.isEmpty(result);
    },

    //check if schema fields contain ref
    hasRefDataTypes: function() {
        var result = _.where(this.fields, {
            type: 'ObjectId'
        });

        this.hasRefs = !_.isEmpty(result);
    }
};