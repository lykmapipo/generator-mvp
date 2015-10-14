'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>MainCtrl
 * @description
 * # <%= className %>MainCtrl
 * <%= className %> main controller of the <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>MainCtrl', function($scope, $state, <%= className %>) {

        /**
         * @description delete <%= singular %> in remote server
         * @param  {Object} <%= singular %> [description]
         */
        $scope.delete = function(<%= singular %>) {
            //TODO handle errors 
            //TODO notify when done
            <%= singular %>.$delete().then(function() {
                $state.go('app.forms.list');
            });
        }

    });