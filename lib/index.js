'use strict';

//dependencies
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    initializing: function() {

        //grab commandline arguments
        this.libraryName = this.arguments[0];

        //normalize library name
        this.libraryName = this.libraryName.toLowerCase();
    },


    writing: {
        library: function() {
            this.template('_lib.js', 'app/libs/' + this.libraryName + '.js');
        },
        test: function() {
            this.template('_spec.js', 'test/libs/' + this.libraryName + '_spec.js');
        }
    }
});