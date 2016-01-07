'use strict';
/**
 * <%= className %> Controller
 *
 * @description :: Server-side logic for managing <%= className %>.
 */

//dependencies

module.exports = {
<%_.forEach(actions, function(action) {%>
    <%if(actions.indexOf(action) === actions.length-1 ){%>
    /**
     * <%= className %>.<%= action %>()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    <%= action %>: function(request, response /*, next*/) {
        response.ok({
            title: '<%= controllerName %> <%= controllerName %>'
        });
    }
<%} else{%>
	/**
     * <%= className %>.<%= action %>()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    <%= action %>: function(request, response /*, next*/) {
        response.ok({
            title: '<%= controllerName %> <%= controllerName %>'
        });
    },
<%}});%>
};