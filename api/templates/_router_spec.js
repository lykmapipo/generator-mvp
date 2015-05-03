'use strict';

/**
 * <%= className %> router specification
 *
 * @description :: Server-side router specification for <%= className %>
 */

//dependencies
var path = require('path');
var expect = require('chai').expect;
var faker = require('faker');
var request = require('supertest');
var <%= className %>Router = require(path.join(__dirname, '..', '..', 'app', 'routers', '<%=singular%>_router'));

describe('<%= className %> Router', function() {
    before(function(done) {
        //TODO write spec setup
        done()
    });

    it('should be able to find <%= plural %> when http get on /<%=plural%>', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to create new <%= singular%> when http post on /<%=plural%>', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to find <%= singular %> when http get on /<%=plural%>/:id', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to update existing <%= singular %> when http put on /<%=plural%>/:id', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to update existing <%= singular %> when http patch on /<%=plural%>/:id', function(done) {
        //TODO write spec
        done()
    });

    it('should be able to delete existing <%= singular %> when http delete on /<%=plural%>/:id', function(done) {
        //TODO write spec
        done()
    });


    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});