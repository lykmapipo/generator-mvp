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
    response.format({
        'text/html': function() {
            response.render('site/index');
        },

        'application/json': function() {
            response.json({
                title: '<%= applicationName %>'
            });
        },

        'default': function() {
            // log the request and respond with 406
            response.status(406).send('Not Acceptable');
        }
    });
});


//export site router
module.exports = router;