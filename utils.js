'use strict';

//dependencies
var _ = require('lodash');
var inflection = require('inflection');

/**
 * @description common shared helpers
 * @type {Object}
 */
module.exports = {
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

    schemaFieldsToFormFields: function() {
        var formFields = [];
        var className = this.singular;
        var attributes = this.fields || {};
        var attributeNames = _.keys(attributes);

        attributeNames.forEach(function(attributeName) {

            var attributeType = attributes[attributeName].type;

            if (attributeType === 'Number') {
                formFields.push({
                    name: attributeName,
                    label: inflection.classify(attributeName),
                    accessor: '<%= ' + className + '.' + attributeName + ' %>',
                    type: 'number'
                });
            } else {
                formFields.push({
                    name: attributeName,
                    label: inflection.classify(attributeName),
                    accessor: '<%= ' + className + '.' + attributeName + ' %>',
                    type: 'text'
                });
            }
        });

        this.attributes = formFields;
    }
}