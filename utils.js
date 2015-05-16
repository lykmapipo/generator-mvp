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
                //prepare input template
                var template = generator.read('inputs/_number.html');
                template = generator.engine(template, input);

                formFields.push(_.extend(input, {
                    type: 'number',
                    template: template
                }));
            }

            //prepare date input type
            else if (attributeType == 'Date') {
                //prepare input template
                var template = generator.read('inputs/_date.html');
                template = generator.engine(template, input);

                formFields.push(_.extend(input, {
                    type: 'date',
                    template: template
                }));
            }

            //prepare boolean input type
            else if (attributeType == 'Boolean') {
                //prepare input template
                var template = generator.read('inputs/_checkbox.html');
                template = generator.engine(template, input);

                formFields.push(_.extend(input, {
                    type: 'checkbox',
                    template: template
                }));
            }

            //prepare text input type
            else {
                //prepare input template
                var template = generator.read('inputs/_text.html');
                template = generator.engine(template, input);

                formFields.push(_.extend(input, {
                    type: 'text',
                    template: template
                }));
            }
        });

        this.attributes = formFields;
    }
}