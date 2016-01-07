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
var respond = require('express-respond')();
var Request = require('mock-express-request');
var Response = require('mock-express-response');
var <%=className%>Controller = require(path.join(__dirname, '..', '..', 'app', 'controllers', '<%= controllerName %>_controller'));

var _<%= classCamel %>_;

describe('<%= className %> Controller', function() {
    before(function(done) {
        var __<%= classCamel %>__ = <%= seed %>;

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            body: __<%= classCamel %>__
        });

        var response = new Response({
            request: request,
            finish: function() {
                _<%= classCamel %>_ = response._getJSON();
                //TODO handle response errors
                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        <%=className%>Controller.create(request, response);
    });


    it('should be able to create new <%=classCamel %> on <%= className%>Controller#create', function(done) {
        var __<%= classCamel %>__ = <%= seed %>;

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            body: __<%= classCamel %>__
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%= classCamel %> = response._getJSON();

                //TODO handle response errors
                expect(response.statusCode).to.be.equal(201);

                expect(__<%= classCamel %>).to.not.be.null;
                expect(__<%= classCamel %>).to.not.be.undefined;
                expect(__<%= classCamel %>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        <%=className%>Controller.create(request, response);
    });

	
    it('should be able to find existing <%= classCamel %> on <%= className%>Controller#show', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _<%=classCamel%>_._id
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%=classCamel%> = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__<%=classCamel%>).to.not.be.null;
                expect(__<%=classCamel%>).to.not.be.undefined;
                expect(__<%=classCamel%>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        <%=className%>Controller.show(request, response);
    });
    

    it('should be able to update existing <%= classCamel %> on <%= className%>Controller#update', function(done) {
        var __<%=classCamel%>__ = <%=seed%>;

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _<%=classCamel%>_._id
            },
            body: __<%=classCamel%>__
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%=classCamel%> = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__<%=classCamel%>).to.not.be.null;
                expect(__<%=classCamel%>).to.not.be.undefined;
                expect(__<%=classCamel%>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        <%=className%>Controller.update(request, response);

    });

    
    it('should be able to delete existing <%= classCamel %> on <%= className%>Controller#destroy', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _<%=classCamel%>_._id
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __<%=classCamel%> = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__<%=classCamel%>).to.not.be.null;
                expect(__<%=classCamel%>).to.not.be.undefined;
                expect(__<%=classCamel%>._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

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
                expect(_data.<%=plural%>.length).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        <%=className%>Controller.index(request, response);

    });

    
    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});