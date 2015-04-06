'use strict';
var yeoman = require('yeoman-generator');
var inflection = require('inflection');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        //grab commandline argumrnts
        this.modelDefinition = this.arguments[0];

        //prepare model name and fields
        var splits = this.modelDefinition.split(' ');
        this.modelName = splits[0];
        this.modelFields = splits[1] || 'name:String';

        //preapare common class names for model generation
        this.className = inflection.camelize(this.modelName);
        this.classPlural = inflection.pluralize(this.className);

    },

    prepareFields: function() {
        var fields = this.modelFields;
    },

    writing: {
        model: function() {
            this.template('_model.js', 'app/models/' + this.modelName + '_model.js');
        },
        test: function() {}
    }
});