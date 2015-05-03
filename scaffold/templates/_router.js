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
var controller = require(path.join(__dirname, '..', 'controllers', '<%= controllerName %>_controller'));

/**
 * Handle Http GET on /<%= classPlural.toLowerCase() %>
 * @description display a list of all <%= classPlural.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/<%= classPlural.toLowerCase() %>', function(request, response) {
    controller.index(request, response);
});


/**
 * Handle Http GET on /<%= classPlural.toLowerCase() %>/new
 * @description return an HTML form for creating a new <%= className.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/<%= classPlural.toLowerCase() %>/new', function(request, response) {
    controller.new(request, response);
});


/**
 * Handle Http POST on /<%= classPlural.toLowerCase() %>
 * @description create a new <%= className.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.post('/<%= classPlural.toLowerCase() %>', function(request, response) {
    controller.create(request, response);
});


/**
 * Handle Http GET on /<%= classPlural.toLowerCase() %>/:id
 * @description display a specific <%= className.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/<%= classPlural.toLowerCase() %>/:id', function(request, response) {
    controller.show(request, response);
});


/**
 * Handle Http GET on /<%= classPlural.toLowerCase() %>/:id/edit
 * @description return an HTML form for editing a specific <%= className.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/<%= classPlural.toLowerCase() %>/:id/edit', function(request, response) {
    controller.edit(request, response);
});


/**
 * Handle Http PUT on /<%= classPlural.toLowerCase() %>/:id
 * @description update a specific <%= className.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.put('/<%= classPlural.toLowerCase() %>/:id', function(request, response) {
    controller.update(request, response);
});


/**
 * Handle Http PATCH on /<%= classPlural.toLowerCase() %>/:id
 * @description update a specific <%= className.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.patch('/<%= classPlural.toLowerCase() %>/:id', function(request, response) {
    controller.update(request, response);
});


/**
 * Handle Http DELETE on /<%= classPlural.toLowerCase() %>/:id
 * @description delete a specific <%= className.toLowerCase() %>
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.delete('/<%= classPlural.toLowerCase() %>/:id', function(request, response) {
    controller.destroy(request, response);
});


/**
 * exports <%= classPlural.toLowerCase() %> router
 * @type {Object}
 */
module.exports = router;