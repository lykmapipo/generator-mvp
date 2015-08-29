'use strict';

//dependencies
var mongoose = require('mongoose');
var <%= className %> = mongoose.model('<%= className %>');

/**
 * <%= className %> Controller
 *
 * @description :: Server-side logic for managing <%= className %>.
 */
module.exports = {
    /**
     * @function
     * @name <%= classPlural.toLowerCase() %>.index()
     * @description display a list of all <%= classPlural.toLowerCase() %>
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response, next) {
        <%= className %>
            .paginate({},{
                    page: request.query.page,
                    limit: request.query.limit
                },
                function(error, pages, <%= classPlural.toLowerCase() %>, total) {
                    if (error) {
                        next(error);
                    } else {
                        response.format({
                            'application/json': function() {
                                response.json({
                                    <%= classPlural.toLowerCase() %>: <%= classPlural.toLowerCase() %>,
                                    pages: pages,
                                    count: total
                                });
                            },

                            'default': function() {
                                // hanlde unaccepted format
                                response
                                    .status(406)
                                    .send('Not Acceptable');
                            }
                        });

                    }
                });
    },

    
    /**
     * @function
     * @name <%= classPlural.toLowerCase() %>.create()
     * @description create a new <%= className.toLowerCase() %>
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    create: function(request, response, next) {
        <%= className %>
            .create(request.body, function(error, <%= className.toLowerCase() %>) {
                if (error) {
                    next(error);
                } else {
                    response.format({
                        'application/json': function() {
                            response
                                .json(<%= className.toLowerCase() %>);
                        },

                        'default': function() {
                            //handle unaccepted format
                            response
                                .status(406)
                                .send('Not Acceptable');
                        }
                    });
                }
            });
    },


    /**
     * @function
     * @name <%= classPlural.toLowerCase() %>.show()
     * @description display a specific <%= className.toLowerCase() %>
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    show: function(request, response, next) {
        <%= className %>
            .findById(request.params.id, function(error, <%= className.toLowerCase() %>) {
                if (error) {
                    next(error);
                } else {
                    response.format({
                        'application/json': function() {
                            response.json(<%= className.toLowerCase() %>);
                        },

                        'default': function() {
                            //hanlde unacceptable format
                            response
                                .status(406)
                                .send('Not Acceptable');
                        }
                    });
                }
            });
    },


    /**
     * @function
     * @name <%= classPlural.toLowerCase() %>.update()
     * @description update a specific <%= className.toLowerCase() %>
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    update: function(request, response, next) {
        <%= className %>
            .findByIdAndUpdate(
                request.params.id,
                request.body,
                {upsert:true,new:true},
                function(error, <%= className.toLowerCase() %>) {
                    if (error) {
                        next(error);
                    } else {
                        response.format({
                            'application/json': function() {
                                response
                                    .json(<%= className.toLowerCase() %>);
                            },

                            'default': function() {
                                // hanlde unacceptable format
                                response
                                    .status(406)
                                    .send('Not Acceptable');
                            }
                        });

                    }
                });
    },


    /**
     * @function
     * @name <%= classPlural.toLowerCase() %>.destroy()
     * @description delete a specific <%= className.toLowerCase() %>
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    destroy: function(request, response, next) {
        <%= className %>
            .findByIdAndRemove(
                request.params.id,
                function(error, <%= className.toLowerCase() %>) {
                    if (error) {
                        next(error);
                    } else {
                        response.format({
                            'application/json': function() {
                                response
                                    .json(<%= className.toLowerCase() %>);
                            },

                            'default': function() {
                                // handle unacceptable format
                                response
                                    .status(406)
                                    .send('Not Acceptable');
                            }
                        });
                    }
                });
    }

};