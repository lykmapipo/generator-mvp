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
var _<%= modelName %>_;


describe('<%= className %> Model', function() {
    before(function(done) {
        var __<%= modelName %>__ = <%= seed %>;

        <%= className %>.create(__<%= modelName %>__, function(error, <%= modelName %>) {
            _<%= modelName %>_ = <%= modelName %>;
            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to create new <%= modelName %>', function(done) {
        var __<%= modelName %>__ = <%= seed %>;

        <%= className %>.create(__<%= modelName %>__, function(error, <%= modelName %>) {
            
            expect(error).to.not.exist;
            expect(<%= modelName %>).to.exist;
            
            //TODO application specific assertions

            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to find existing <%= modelName %>', function(done) {
        <%= className %>.findById(_<%= modelName %>_._id, function(error, <%= modelName %>) {

            expect(error).to.not.exist;
            expect(<%= modelName %>).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to update existing <%= modelName %>', function(done) {
        var __<%= modelName %>__ = <%= seed %>;

        <%= className %>.findByIdAndUpdate(_<%= modelName %>_._id, __<%= modelName %>__,{
            upsert: true,
            new: true
        }, function(error, <%= modelName %>) {
            //update <%= modelName %> references
            _<%= modelName %>_ = <%= modelName %>;

            expect(error).to.not.exist;
            expect(<%= modelName %>).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= modelName %>);
        });
    });

    
    it('should be able to delete existing <%= modelName %>', function(done) {
        <%= className %>.findByIdAndRemove(_<%= modelName %>_._id, function(error, <%= modelName %>) {

            expect(error).to.not.exist;
            expect(<%= modelName %>).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= modelName %>);
        });
    });


    it('should be able to list existing <%= modelNamePlural %>', function(done) {
        <%= className %>.paginate({}, {
            page: 1,
            limit: 10
        }, function(error, <%= modelNamePlural %>, pages, total) {

            expect(error).to.not.exist;
            expect(pages).to.exist;
            expect(<%= modelNamePlural %>).to.exist;
            expect(total).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= modelNamePlural %>);
        });
    });


    //TODO alternative test specs

    
    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});