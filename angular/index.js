'use strict';

//dependencies
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var inflection = require('inflection');
var chalk = require('chalk');
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

        this.modelName = splits.shift().toLowerCase();

        this.modelFields = !_.isEmpty(splits) ? splits : ['name:String'];

        //preapare common class names for endpoints generation
        this.className = inflection.camelize(this.modelName);
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
            (bowerJson.moduleName ||
                this._.camelize(this.appname) + Utils.suffix(this));

        if (typeof this.env.options.appPath === 'undefined') {
            this.env.options.appPath = this.options.appPath || bowerJson.appPath || 'app';
            this.options.appPath = this.env.options.appPath;
        }

        this.env.options.testPath = this.env.options.testPath || bowerJson.testPath || 'test/spec';

    },

    prepareFormFields: function() {
        Utils.prepareSchemaFields.call(this);
        Utils.schemaFieldsToFormFields.call(this);
    },

    writing: {
        factory: function() {
            this.template('_factory.js', 'app/scripts/services/' + this.singular + '.js');
        },
        controllers: function() {
            this.template('controllers/_create.js', 'app/scripts/controllers/' + this.plural + '/create.js');
            this.template('controllers/_edit.js', 'app/scripts/controllers/' + this.plural + '/edit.js');
            this.template('controllers/_index.js', 'app/scripts/controllers/' + this.plural + '/index.js');
            this.template('controllers/_main.js', 'app/scripts/controllers/' + this.plural + '/main.js');
            this.template('controllers/_show.js', 'app/scripts/controllers/' + this.plural + '/show.js');
        },
        states: function() {
            this.template('_states.js', 'app/scripts/states/' + this.singular + '.js');
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
            this.template('views/_main.html', 'app/views/' + this.plural + '/main.html');
            this.template('views/_show.html', 'app/views/' + this.plural + '/show.html');
        },
        addScriptsToIndex: function(script) {
            try {
                var appPath = this.env.options.appPath;
                var fullPath = path.join(appPath, 'index.html');

                var scripts = [
                    'services/' + this.singular,
                    'controllers/' + this.plural + '/create',
                    'controllers/' + this.plural + '/edit',
                    'controllers/' + this.plural + '/index',
                    'controllers/' + this.plural + '/main',
                    'controllers/' + this.plural + '/show',
                    'states/' + this.singular
                ];

                _.forEach(scripts, function(script) {
                    Utils.rewriteFile({
                        file: fullPath,
                        needle: '<!-- endbuild -->',
                        splicable: [
                            '<script src="scripts/' + script.toLowerCase().replace(/\\/g, '/') + '.js"></script>'
                        ]
                    });
                });

            } catch (e) {
                this.log.error(chalk.yellow(
                    '\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
                ));
            }
        }
    }
});