'use strict';

//dependencies
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var inflection = require('inflection');

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

        this.controllerName = splits.shift().toLowerCase();
        this.controllerPath = '';
        this.subpath = '';

        //check for subpath
        var subpath = this.controllerName.split('.');
        if (subpath && subpath.length > 1) {
            this.controllerName = subpath.pop();

            this.controllerPath = '';

            /*jshint quotmark:double*/
            for (var i = 0; i < subpath.length; i++) {
                this.controllerPath = this.controllerPath + "'..', ";
            }
            this.controllerPath = this.controllerPath + "'controllers', ";
            this.controllerPath = _.reduce(subpath, function(full, path) {
                return full + "'" + path + "', ";
            }, this.controllerPath);
            this.controllerPath = _.trimRight(this.controllerPath, ", ");
            /*jshint quotmark:single*/

            this.subpath = subpath.join('/');
        }

        this.actions = !_.isEmpty(splits) ? splits : ['index'];


        //preapare common class names for model generation
        this.className = inflection.camelize(this.controllerName);
        this.classPlural = inflection.pluralize(this.className);
        this.plural = this.classPlural.toLowerCase();

        //generator options
        this.frontend = !(this.options['skip-frontend'] || false);

    },


    writing: {
        controller: function() {
            this.template('_controller.js', 'app/controllers/' + this.subpath + '/' + this.controllerName + '_controller.js');
        },
        router: function() {
            this.template('_router.js', 'app/routers/' + this.subpath + '/' + this.controllerName + '_router.js');
        },
        views: function() {
            if (this.frontend) {
                var me = this;
                //write view for each controller action
                this.actions.forEach(function(controllerAction) {
                    me.fs.copy(
                        me.templatePath('_view.js'),
                        me.destinationPath('app/views/' + me.subpath + '/' + me.plural + '/' + controllerAction + '.html')
                    );
                });
            }
        },
        test: function() {
            this.template('_controller_spec.js', 'test/controllers/' + this.subpath + '/' + this.controllerName + '_controller_spec.js');
            this.template('_router_spec.js', 'test/routers/' + this.subpath + '/' + this.controllerName + '_router_spec.js');
        }
    }
});