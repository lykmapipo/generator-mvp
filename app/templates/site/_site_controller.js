'use strict';
/**
 * Site Controller
 *
 * @description :: Server-side logic for managing site.
 */
module.exports = {
    /**
     * Site.index()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response) {
        response.format({<%if(frontend){%>
            'text/html': function() {
                response.render('site/index', {
                    title: '<%= applicationName %>'
                });
            },<%}%>

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
    }
};