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
var _<%= classCamel %>_;


describe('<%= className %> Model', function() {
    before(function(done) {
        var __<%= classCamel %>__ = <%= seed %>;

        <%= className %>.create(__<%= classCamel %>__, function(error, <%= classCamel %>) {
            _<%= classCamel %>_ = <%= classCamel %>;
            done(error, <%= classCamel %>);
        });
    });

    
    it('should be able to create new <%= classCamel %>', function(done) {
        var __<%= classCamel %>__ = <%= seed %>;

        <%= className %>.create(__<%= classCamel %>__, function(error, <%= classCamel %>) {
            
            expect(error).to.not.exist;
            expect(<%= classCamel %>).to.exist;
            
            //TODO application specific assertions

            done(error, <%= classCamel %>);
        });
    });

    
    it('should be able to find existing <%= classCamel %>', function(done) {
        <%= className %>.findById(_<%= classCamel %>_._id, function(error, <%= classCamel %>) {

            expect(error).to.not.exist;
            expect(<%= classCamel %>).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= classCamel %>);
        });
    });

    
    it('should be able to update existing <%= classCamel %>', function(done) {
        var __<%= classCamel %>__ = <%= seed %>;

        <%= className %>.findByIdAndUpdate(_<%= classCamel %>_._id, __<%= classCamel %>__,{
            upsert: true,
            new: true
        }, function(error, <%= classCamel %>) {
            //update <%= classCamel %> references
            _<%= classCamel %>_ = <%= classCamel %>;

            expect(error).to.not.exist;
            expect(<%= classCamel %>).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= classCamel %>);
        });
    });

    
    it('should be able to delete existing <%= classCamel %>', function(done) {
        <%= className %>.findByIdAndRemove(_<%= classCamel %>_._id, function(error, <%= classCamel %>) {

            expect(error).to.not.exist;
            expect(<%= classCamel %>).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= classCamel %>);
        });
    });


    it('should be able to list existing <%= classCamelPlural %>', function(done) {
        <%= className %>.paginate({
            page: 1,
            limit: 10
        }, function(error, <%= classCamelPlural %>, pages, total) {

            expect(error).to.not.exist;
            expect(pages).to.exist;
            expect(<%= classCamelPlural %>).to.exist;
            expect(total).to.exist;
            
            //TODO application specific assertions
            
            done(error, <%= classCamelPlural %>);
        });
    });


    //TODO alternative test specs

    
    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});