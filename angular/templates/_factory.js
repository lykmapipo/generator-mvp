'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= className %>
 * @description
 * # <%= className %>
 * Factory in the <%= scriptAppName %>.
 */
angular
    .module('<%= scriptAppName %>')
    .factory('<%= className %>', function(apiEndpoint, $http, $resource) {

        //create <%= singular %> resource
        var <%= className %> = $resource(apiEndpoint + '<%= plural %>/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
        });


        /**
         * @description find <%= plural %> with pagination
         * @param  {Object} params [description]
         */
        <%= className %>.find = function(params) {
            return $http.get(apiEndpoint + '<%= plural %>', {
                    params: params
                })
                .then(function(response) {

                    //map plain <%= singular %> object to resource instances
                    var <%= plural %> = response.data.<%= plural %>.map(function(<%= singular %>) {
                        //create <%= singular %> as a resource instance
                        return new <%= className %>(<%= singular %>);
                    });

                    //return paginated response
                    return {
                        <%= plural %>: <%= plural %>,
                        total: response.data.count
                    };
                });
        };

        return <%= className %>;
    });