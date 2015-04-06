'use strict';

/**
 * <%= className %> model specification
 *
 * @description :: Server-side model specification for <%= className %>
 */

//dependencies
var mongoose = require('mongoose');
var faker = require('faker');
var <%= className %> = mongoose.model('<%= className %>');

describe('<%= className %>', function() {
    before(function(done) {
        //TODO write spec setup
        done()
    });

    it('should be able to create new <%= modelName %>', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to find existing <%= modelName %>', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to update existing <%= modelName %>', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to delete existing <%= modelName %>', function(done) {
        //TODO write spec
        done()
    });

});