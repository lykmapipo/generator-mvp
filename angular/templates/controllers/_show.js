'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>ShowCtrl
 * @description
 * # <%= className %>ShowCtrl
 * <%= className %> list controller of the <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>ShowCtrl', function($scope, $state, <%= className %>) {

        //action performed by this controller
        $scope.action = 'Create';

        //instantiate new <%= singular %>
        $scope.<%= singular %> = new <%= className %>();

        //update edited <%= singular %>
        $scope.save = function() {
            //TODO show input prompt
            //TODO show loading mask
            $scope.<%= singular %>.$save().then(function() {
                $state.go('<%= singular %>.list');
            });
            //TODO catch errors and notify
        }
    });