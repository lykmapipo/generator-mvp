'use strict';

/**
 * <%= className %> model specification
 *
 * @description :: Server-side model specification for <%= className %>
 */

//dependencies
var mongoose = require('mongoose');
var faker = require('faker');
var expect = require('chai').expect;
var <%= className %> = mongoose.model('<%= className %>');

describe('<%= className %> Model', function() {
    before(function(done) {
        var <%= modelName %> = <%= seed %>;
        done();
    });

    it('should be able to create new <%= modelName %>', function(done) {
        <%= className %>.create({}, function(error, <%= modelName %>) {
            
            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;

            done(error, <%= modelName %>);
        });
    });

    it('should be able to find existing <%= modelName %>', function(done) {
        <%= className %>.findOne({}, function(error, <%= modelName %>) {

            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;
            
            done(error, <%= modelName %>);
        });
    });

    it('should be able to update existing <%= modelName %>', function(done) {
        <%= className %>.findOneAndUpdate({}, {}, function(error, <%= modelName %>) {

            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;
            
            done(error, <%= modelName %>);
        });
    });

    it('should be able to delete existing <%= modelName %>', function(done) {
        <%= className %>.remove({}, function(error, <%= modelName %>) {

            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;
            
            done(error, <%= modelName %>);
        });
    });

    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});