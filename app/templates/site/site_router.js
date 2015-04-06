/**
 * Site Router
 *
 * @description server-side router for managing Site.
 */

//dependencies
var express = require('express');
var router = express.Router();

/**
 * Handle Http GET on /
 * @description display a site home page
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/', function(request, response) {
    controller.index(request, response);
});


//export site router
module.exports = router;