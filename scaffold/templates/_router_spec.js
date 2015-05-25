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

var app = require('express')();
//parsing body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//TODO additional middlewares that will be require for <%= plural %> to work
var <%= className %>Router = require(path.join(__dirname, '..', '..', 'app', 'routers', '<%=singular%>_router'));
//add <%= className %>Router to app middlewares
app.use(<%= className %>Router);
var <%= modelName %>;

describe('<%= className %> Router', function() {
    before(function(done) {
        var _<%= modelName %>_ = <%= seed %>;

        request(app)
            .post('/<%=plural%>')
            .send(_<%= modelName %>_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                <%= modelName %> = JSON.parse(response.text);
                done(error, response);
            });
    });

    
    it('should be able to find <%= plural %> when http get on /<%=plural%>', function(done) {
        request(app)
            .get('/<%=plural%>')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.be.null;
                expect(response).to.not.be.null;
                //TODO more <%=plural%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to create new <%= singular%> when http post on /<%=plural%>', function(done) {
        var _<%= modelName %>_ = <%= seed %>;
        
        request(app)
            .post('/<%=plural%>')
            .send(_<%= modelName %>_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.be.null;
                expect(response).to.not.be.null;
                //TODO more <%=singular%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to find <%= singular %> when http get on /<%=plural%>/:id', function(done) {
        request(app)
            .get('/<%=plural%>/'+ <%= modelName %>._id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.be.null;
                expect(response).to.not.be.null;
                //TODO more <%=singular%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to update existing <%= singular %> when http put on /<%=plural%>/:id', function(done) {
        var _<%= modelName %>_ = <%= seed %>;

        request(app)
            .put('/<%=plural%>/'+ <%= modelName %>._id)
            .send(_<%= modelName %>_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.be.null;
                expect(response).to.not.be.null;
                //TODO more <%=singular%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to update existing <%= singular %> when http patch on /<%=plural%>/:id', function(done) {
        var _<%= modelName %>_ = <%= seed %>;

        request(app)
            .patch('/<%=plural%>/'+ <%= modelName %>._id)
            .send(_<%= modelName %>_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.be.null;
                expect(response).to.not.be.null;
                //TODO more <%=singular%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to delete existing <%= singular %> when http delete on /<%=plural%>/:id', function(done) {
       request(app)
            .delete('/<%=plural%>/'+ <%= modelName %>._id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.be.null;
                expect(response).to.not.be.null;
                //TODO more <%=singular%> response assertions

                done(error, response);
            });
    });


    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});