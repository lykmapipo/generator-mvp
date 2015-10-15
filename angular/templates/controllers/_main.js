'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>MainCtrl
 * @description
 * # <%= className %>MainCtrl
 * <%= className %> main controller of <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>MainCtrl', function($scope, $state, <%= className %>) {

        /**
         * @description delete <%= singular %>
         */
        $scope.delete = function(<%= singular %>) {
            //TODO handle errors 
            //TODO notify when done
            <%= singular %>.$delete().then(function() {
                $state.go('<%= plural %>.list');
            });
        };

    });