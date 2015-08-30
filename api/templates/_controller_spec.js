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
var Request = require('mock-express-request');
var Response = require('mock-express-response');
var <%=className%>Controller = require(path.join(__dirname, '..', '..', 'app', 'controllers', '<%=singular%>_controller'));

var _<%= modelName %>_;

describe('<%= className %> Controller', function() {
    before(function(done) {
        var __<%= modelName %>__ = <%= seed %>;

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            body: __<%= modelName %>__
        });

        var response = new Response({
            request: request,
            finish: function() {
                _<%= modelName %>_ = response._getJSON();
                //TODO handle response errors
                done();
            }
        });

        <%=className%>Controller.create(request, response);
    });


    it('should be able to create new <%=singular %> on <%= className%>Controller#create', function(done) {
        var __<%= modelName %>__ = <%= seed %>;

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            body: __<%= modelName %>__
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%= modelName %> = response._getJSON();

                //TODO handle response errors
                expect(response.statusCode).to.be.equal(200);

                expect(__<%= modelName %>).to.not.be.null;
                expect(__<%= modelName %>).to.not.be.undefined;
                expect(__<%= modelName %>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        <%=className%>Controller.create(request, response);
    });

	
    it('should be able to find existing <%= singular %> on <%= className%>Controller#show', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _<%=singular%>_._id
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%=singular%> = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__<%=singular%>).to.not.be.null;
                expect(__<%=singular%>).to.not.be.undefined;
                expect(__<%=singular%>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        <%=className%>Controller.show(request, response);
    });
    

    it('should be able to update existing <%= singular %> on <%= className%>Controller#update', function(done) {
        var __<%=singular%>__ = <%=seed%>;

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _<%=singular%>_._id
            },
            body: __<%=singular%>__
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%=singular%> = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__<%=singular%>).to.not.be.null;
                expect(__<%=singular%>).to.not.be.undefined;
                expect(__<%=singular%>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        <%=className%>Controller.update(request, response);

    });

    
    it('should be able to delete existing <%= singular %> on <%= className%>Controller#destroy', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _<%=singular%>_._id
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%=singular%> = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__<%=singular%>).to.not.be.null;
                expect(__<%=singular%>).to.not.be.undefined;
                expect(__<%=singular%>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        <%=className%>Controller.destroy(request, response);
    });


     it('should be able to list existing <%= plural %> on <%= className%>Controller#index', function(done) {
       var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            query: {
                page: 1,
                limit: 10
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var _data = response._getJSON();

                expect(_data).to.not.be.undefined;
                expect(_data).to.not.be.null;
                expect(_data.<%=plural%>.length).to.be.above(0);

                //TODO application specific assertions

                done();
            }
        });


        <%=className%>Controller.index(request, response);

    });

    
    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});