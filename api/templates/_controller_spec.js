'use strict';

/**
 * <%= className %> controller specification
 *
 * @description :: Server-side controller specification for <%= className %>
 */

//dependencies
var path = require('path');
var expect = require('chai').expect;
var faker = require('faker');
var <%=className%>Controller = require(path.join(__dirname, '..', '..', 'app', 'controllers', '<%=singular%>_controller'));

describe('<%= className %> Controller', function() {
    before(function(done) {
        //TODO write spec setup
        done()
    });

    it('should be able to find existing <%= plural %> on <%= className%>Controller#index', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to create new <%=singular %> on <%= className%>Controller#create', function(done) {
        //TODO write spec
        done()
    });

	it('should be able to find existing <%= singular %> on <%= className%>Controller#show', function(done) {
        //TODO write spec
        done()
    });
    

    it('should be able to update existing <%= singular %> on <%= className%>Controller#update', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to delete existing <%= singular %> on <%= className%>Controller#destroy', function(done) {
        //TODO write spec
        done()
    });

    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});