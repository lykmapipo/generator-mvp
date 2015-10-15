'use strict';

//dependencies
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var inflection = require('inflection');

//borrowed from angular-generator
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * @description common shared helpers
 * @type {Object}
 */
module.exports = exports = {
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
                placeholder: generator.className + ' ' + attributeName,
                label: inflection.classify(attributeName),
                accessor: '<%= ' + className + '.' + attributeName + ' %>',
                value: '<%= ' + accessor + ' ? ' + accessor + ' : ' + '\'\'' + ' %>'
            };

            //extend input with generator options
            input = _.merge(input, {
                singular: generator.singular,
                plural: generator.plural
            });

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
    },

    /***************************************************************************
     * Borrowed from angular-generator utils
     **************************************************************************/
    rewrite: function(args) {
        /* jshint -W044 */
        // check if splicable is already in the body text
        var re = new RegExp(args.splicable.map(function(line) {
            return '\s*' + escapeRegExp(line);
        }).join('\n'));

        if (re.test(args.haystack)) {
            return args.haystack;
        }

        var lines = args.haystack.split('\n');

        var otherwiseLineIndex = 0;
        lines.forEach(function(line, i) {
            if (line.indexOf(args.needle) !== -1) {
                otherwiseLineIndex = i;
            }
        });

        var spaces = 0;
        while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
            spaces += 1;
        }

        var spaceStr = '';
        while ((spaces -= 1) >= 0) {
            spaceStr += ' ';
        }

        lines.splice(otherwiseLineIndex, 0, args.splicable.map(function(line) {
            return spaceStr + line;
        }).join('\n'));

        return lines.join('\n');
    },


    //rewrite file
    rewriteFile: function(args) {
        args.path = args.path || process.cwd();
        var fullPath = path.join(args.path, args.file);

        args.haystack = fs.readFileSync(fullPath, 'utf8');
        var body = exports.rewrite(args);

        fs.writeFileSync(fullPath, body);
    },


    /**
     * @description deduce angular application name suffix
     * @param  {Object} self mvp:angular subgenerator context
     * @return {String}      application name
     */
    suffix: function(self) {
        var counter = 0,
            suffix = self.options['app-suffix'];
        // Have to check this because of generator bug #386
        process.argv.forEach(function(val) {
            if (val.indexOf('--app-suffix') > -1) {
                counter++;
            }
        });
        if (counter === 0 || (typeof suffix === 'boolean' && suffix)) {
            suffix = 'App';
        }
        return suffix ? self._.classify(suffix) : '';
    }
};