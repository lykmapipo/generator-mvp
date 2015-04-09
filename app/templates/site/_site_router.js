'use strict';
/**
 * Site Router
 *
 * @description :: Server-side router for managing Site.
 */

//dependencies
var path = require('path');
var express = require('express');
var router = express.Router();
var controller = require(path.join(__dirname, '..', 'controllers', 'site_controller'));

/**
 * Handle Http GET on /
 * @description display a site home page
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/', function(request, response) {
    controller.index(request, response);
});

//exports site router
module.exports = router;