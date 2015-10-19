'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>IndexCtrl
 * @description
 * # <%= className %>IndexCtrl
 * <%= className %> list controller of <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>IndexCtrl', function($scope, $state, <%= className %>) {

        //<%= plural %> in the scope
        $scope.<%= plural %> = [];
        $scope.page = 1;
        $scope.limit = 10;


        /**
         * @description load <%= plural %>
         */
        $scope.find = function() {
            <%= className %>.find({
                page: $scope.page,
                limit: $scope.limit
            }).then(function(response) {
                //update scope with <%= plural %> when done loading
                $scope.<%= plural %> = response.<%= plural %>;
                $scope.total = response.total;
            });
        };

        
        /**
         * @description delete <%= singular %>
         */
        $scope.delete = function(<%= singular %>) {
            //TODO handle errors 
            //TODO notify when done
            <%= singular %>.$delete().then(function() {
                //reload <%= plural %>
                $scope.find();
            });
        };


        //pre load <%= plural %> on state activation
        $scope.find();

    });