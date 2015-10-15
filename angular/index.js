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

        this.controllerName = this.modelName = splits.shift().toLowerCase();

        this.modelFields = !_.isEmpty(splits) ? splits : ['name:String'];

        //preapare common class names for endpoints generation
        this.className = inflection.camelize(this.controllerName);
        this.singular = this.className.toLowerCase();

        this.classPlural = inflection.pluralize(this.className);
        this.plural = this.classPlural.toLowerCase();

    },

    prepare: function() {
        //borrowed from angular generator to compute appname and scriptAppName
        var bowerJson = {};

        try {
            bowerJson = require(path.join(process.cwd(), 'bower.json'));
        } catch (e) {}

        if (bowerJson.name) {
            this.appname = bowerJson.name;
        } else {
            this.appname = path.basename(process.cwd());
        }

        this.appname = this._.slugify(this._.humanize(this.appname));

        this.scriptAppName =
            bowerJson.moduleName || this._.camelize(this.appname) + Utils.suffix(this);
    },

    prepareFormFields: function() {
        Utils.prepareSchemaFields.call(this);
        Utils.schemaFieldsToFormFields.call(this);
    },

    writing: {
        //TODO update index.html file
        controllers: function() {
            this.template('controllers/_create.js', 'app/scripts/controllers/' + this.plural + '/create.js');
            this.template('controllers/_edit.js', 'app/scripts/controllers/' + this.plural + '/edit.js');
            this.template('controllers/_index.js', 'app/scripts/controllers/' + this.plural + '/index.js');
            this.template('controllers/_main.js', 'app/scripts/controllers/' + this.plural + '/main.js');
            this.template('controllers/_show.js', 'app/scripts/controllers/' + this.plural + '/show.js');
        },
        factory: function() {
            this.template('_factory.js', 'app/scripts/services/' + this.singular + '.js');
        },
        test: function() {
            this.template('spec/controllers/_create.js', 'test/spec/controllers/' + this.plural + '/create.js');
            this.template('spec/controllers/_edit.js', 'test/spec/controllers/' + this.plural + '/edit.js');
            this.template('spec/controllers/_index.js', 'test/spec/controllers/' + this.plural + '/index.js');
            this.template('spec/controllers/_main.js', 'test/spec/controllers/' + this.plural + '/main.js');
            this.template('spec/controllers/_show.js', 'test/spec/controllers/' + this.plural + '/show.js');
            this.template('spec/_factory.js', 'test/spec/services/' + this.singular + '.js');
        },
        views: function() {
            this.template('views/_create.html', 'app/views/' + this.plural + '/create.html');
            this.template('views/_edit.html', 'app/views/' + this.plural + '/edit.html');
            this.template('views/_form.html', 'app/views/' + this.plural + '/_form.html');
            this.template('views/_index.html', 'app/views/' + this.plural + '/index.html');
            this.template('views/_layout.html', 'app/views/' + this.plural + '/layout.html');
            this.template('views/_show.html', 'app/views/' + this.plural + '/show.html');
        }
    }
});