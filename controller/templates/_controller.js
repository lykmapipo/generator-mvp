'use strict';
/**
 * <%= className %> Controller
 *
 * @description :: Server-side logic for managing <%= className %>.
 */

//dependencies
var mongoose = require('mongoose');

module.exports = {
<%_.forEach(actions, function(action) {%>
    <%if(actions.indexOf(action) === actions.length-1 ){%>
    /**
     * <%= className %>.<%= action %>()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    <%= action %>: function(request, response) {
        response.format({<%if(frontend){%>
            'text/html': function() {
                response.render('<%= controllerName %>/<%= action %>', {
                    title: '<%= controllerName %> <%= controllerName %>'
                });
            },<%}%>

            'application/json': function() {
                response.json({
                    title: '<%= controllerName %> <%= controllerName %>'
                });
            },

            'default': function() {
                // log the request and respond with 406
                response.status(406).send('Not Acceptable');
            }
        });
    }
<%} else{%>
	/**
     * <%= className %>.<%= action %>()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    <%= action %>: function(request, response) {
        response.format({<%if(frontend){%>
            'text/html': function() {
                response.render('<%= controllerName %>/<%= action %>', {
                    title: '<%= controllerName %> <%= controllerName %>'
                });
            },<%}%>

            'application/json': function() {
                response.json({
                    title: '<%= controllerName %> <%= controllerName %>'
                });
            },

            'default': function() {
                // log the request and respond with 406
                response.status(406).send('Not Acceptable');
            }
        });
    },
<%}});%>
};