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
     * <%= classPlural.toLowerCase() %>.index()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response, next) {
        <%= className %>
            .paginate({},{
                    page: request.query.page,
                    limit: request.query.limit
                },
                function(error, <%= classPlural.toLowerCase() %>, pages, total) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .ok('<%= classPlural.toLowerCase() %>/index.html',{
                                <%= classPlural.toLowerCase() %>: <%= classPlural.toLowerCase() %>,
                                pages: pages,
                                count: total
                            });
                    }
                });
    },


    /**
     * <%= classPlural.toLowerCase() %>.new()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    new: function(request, response) {
        response
            .ok('<%= classPlural.toLowerCase() %>/new.html', {
                errors: null,
                <%= className.toLowerCase() %>: {}
            });
    },


    /**
     * <%= classPlural.toLowerCase() %>.create()
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
                        'text/html': function() {
                            response
                                .redirect('/<%= classPlural.toLowerCase() %>');
                        },

                        'default': function() {
                            response
                                .created(<%= className.toLowerCase() %>);
                        }
                    });
                }
            });
    },


    /**
     * <%= classPlural.toLowerCase() %>.show()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    show: function(request, response, next) {
        <%= className %>
            .findById(request.params.id, function(error, <%= className.toLowerCase() %>) {
                if (error) {
                    next(error);
                } else {
                    response
                        .ok('<%= classPlural.toLowerCase() %>/show.html', {
                            <%= className.toLowerCase() %>: <%= className.toLowerCase() %>
                        });
                }
            });
    },


    /**
     * <%= classPlural.toLowerCase() %>.edit()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    edit: function(request, response, next) {
        <%= className %>
            .findById(request.params.id, function(error, <%= className.toLowerCase() %>) {
                if (error) {
                    next(error);
                } else {
                    response
                        .ok('<%= classPlural.toLowerCase() %>/edit.html', {
                            <%= className.toLowerCase() %>: <%= className.toLowerCase() %>,
                            errors: null
                        });
                }
            });
    },


    /**
     * <%= classPlural.toLowerCase() %>.update()
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
                            'text/html': function() {
                                response
                                    .redirect('/<%= classPlural.toLowerCase() %>');
                            },

                            'default': function() {
                                response
                                    .ok(<%= className.toLowerCase() %>);
                            }
                        });

                    }
                });
    },


    /**
     * <%= classPlural.toLowerCase() %>.destroy()
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
                            'text/html': function() {
                                response
                                    .redirect('/<%= classPlural.toLowerCase() %>');
                            },

                            'default': function() {
                                response
                                    .ok(<%= className.toLowerCase() %>);
                            }
                        });
                    }
                });
    }

};