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

        //prepare controller name and fields
        var splits = this.modelDefinition.split(' ');

        //handle console & test adapters
        if (splits.length <= 1) {
            splits = _.union(splits, this.arguments);
        }

        this.controllerName = splits.shift().toLowerCase();

        this.modelFields = !_.isEmpty(splits) ? splits : ['name:String'];

        //preapare common class names for endpoints generation
        this.className = inflection.camelize(this.controllerName);
        this.singular = this.className.toLowerCase();

        this.classPlural = inflection.pluralize(this.className);
        this.plural = this.classPlural.toLowerCase();

    },

    prepareFormFields: function(argument) {
        Utils.prepareSchemaFields.call(this);
        Utils.schemaFieldsToFormFields.call(this);
    },

    prepareLinks: function() {
        this.createLink = '/' + this.plural + '/new';
        this.editLink = '/' + this.plural + '/<%= ' + this.singular + '._id %>/edit';
        this.viewLink = '/' + this.plural + '/<%= ' + this.singular + '._id %>/show';
        this.deleteLink = '/' + this.plural + '/<%= ' + this.singular + '._id %>?_method=DELETE';
        this.tableDataLoopStart = '<% ' + this.plural + '.forEach(function (' + this.singular + ') {%>';
        this.tableDataCheck = '<% if(' + this.plural + '){ %>';
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
        },
        model: function() {
            this.composeWith('mvp:model', {
                args: this.arguments,
                options: this.options
            });
        },
        views: function() {

            //writes templates
            this.template('views/_new.html', 'app/views/' + this.plural + '/new.html');
            this.template('views/_edit.html', 'app/views/' + this.plural + '/edit.html');
            this.template('views/_show.html', 'app/views/' + this.plural + '/show.html');
            this.template('views/_index.html', 'app/views/' + this.plural + '/index.html');
        }
    }
});