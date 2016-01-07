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
var app = require(path.join(__dirname, '..', '..', 'app', 'application'));
var <%= classCamel %>;

describe('<%= className %> Router', function() {
    before(function(done) {
        var _<%= classCamel %>_ = <%= seed %>;

        request(app)
            .post('/<%=plural%>')
            .send(_<%= classCamel %>_)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                <%= classCamel %> = JSON.parse(response.text);
                done(error, response);
            });
    });
    
    it('should be able to create new <%= classCamel%> when http post on /<%=plural%>', function(done) {
        var _<%= classCamel %>_ = <%= seed %>;
        
        request(app)
            .post('/<%=plural%>')
            .send(_<%= classCamel %>_)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;
                
                //TODO more <%=classCamel%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to find <%= classCamel %> when http get on /<%=plural%>/:id', function(done) {
        request(app)
            .get('/<%=plural%>/'+ <%= classCamel %>._id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more <%=classCamel%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to update existing <%= classCamel %> when http put on /<%=plural%>/:id', function(done) {
        var _<%= classCamel %>_ = <%= seed %>;

        request(app)
            .put('/<%=plural%>/'+ <%= classCamel %>._id)
            .send(_<%= classCamel %>_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more <%=classCamel%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to update existing <%= classCamel %> when http patch on /<%=plural%>/:id', function(done) {
        var _<%= classCamel %>_ = <%= seed %>;

        request(app)
            .patch('/<%=plural%>/'+ <%= classCamel %>._id)
            .send(_<%= classCamel %>_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more <%=classCamel%> response assertions

                done(error, response);
            });
    });

    
    it('should be able to delete existing <%= classCamel %> when http delete on /<%=plural%>/:id', function(done) {
       request(app)
            .delete('/<%=plural%>/'+ <%= classCamel %>._id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more <%=classCamel%> response assertions

                done(error, response);
            });
    });


    it('should be able to list <%= plural %> when http get on /<%=plural%>', function(done) {
        request(app)
            .get('/<%=plural%>')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more <%=plural%> response assertions

                done(error, response);
            });
    });


    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});