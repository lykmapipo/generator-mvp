'use strict';

//dependencies
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {

        //grab commandline arguments
        this.middlewareName = this.arguments[0];

        //normalize middleware name
        this.middlewareName = this.middlewareName.toLowerCase();
    },


    writing: {
        middleware: function() {
            this.template('_middleware.js', 'app/middlewares/' + this.middlewareName + '_middleware.js');
        },
        test: function() {
            this.template('_spec.js', 'test/middlewares/' + this.middlewareName + '_middleware_spec.js');
        }
    }
});