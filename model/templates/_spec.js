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

//seed
var _<%= modelName %>_ = <%= seed %>;


describe('<%= className %> Model', function() {
    before(function(done) {
        <%= className %>.create(_<%= modelName %>_, function(error, <%= modelName %>) {
            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to create new <%= modelName %>', function(done) {
        var __<%= modelName %>__ = <%= seed %>;

        <%= className %>.create(__<%= modelName %>__, function(error, <%= modelName %>) {
            
            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;
            //TODO more assertions

            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to find existing <%= modelName %>', function(done) {
        <%= className %>.findOne(_<%= modelName %>_, function(error, <%= modelName %>) {

            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;
            //TODO more assertions
            
            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to update existing <%= modelName %>', function(done) {
        var __<%= modelName %>__ = <%= seed %>;

        <%= className %>.findOneAndUpdate(_<%= modelName %>_, __<%= modelName %>__, function(error, <%= modelName %>) {
            //update <%= modelName %> references
            _<%= modelName %>_ = __<%= modelName %>__;

            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;
            //TODO more assertions
            
            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to delete existing <%= modelName %>', function(done) {
        <%= className %>.findOneAndRemove(_<%= modelName %>_, function(error, <%= modelName %>) {

            expect(error).to.be.null;
            expect(<%= modelName %>).to.not.be.undefined;
            expect(<%= modelName %>).to.not.be.null;
            //TODO more assertions
            
            done(error, <%= modelName %>);
        });
    });

    
    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});