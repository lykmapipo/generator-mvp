'use strict';
/**
 * <%= className %> Router
 *
 * @description :: Server-side router for managing <%= className %>.
 */

//dependencies
var path = require('path');
var express = require('express');
var router = express.Router();
<%if(subpath){%>
var controller = require(path.join(__dirname, '..', <%= controllerPath %>, '<%= controllerName %>_controller'));
<%}else{%>
var controller = require(path.join(__dirname, '..', 'controllers', '<%= controllerName %>_controller'));
<%}%>

<%_.forEach(actions, function(action) {%>
/**
 * Handle Http GET on <%= plural%>/<%= action %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/<%= plural%>/<%= action %>', function(request, response, next) {
    controller.<%= action %>(request, response, next);
});
<%});%>

//exports <%= controllerName %> router
module.exports = router;