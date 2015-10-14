'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>EditCtrl
 * @description
 * # <%= className %>EditCtrl
 * <%= className %> edit controller of the <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>EditCtrl', function($scope, $state, $stateParams, <%= className %>) {

        //action performed by this controller
        $scope.action = 'Edit';

        //fetch <%= singular %> from backed
        //TODO check if state `resolve` can be used to resolve <%= singular %>
        //before activate <%= singular %>.edit state 
        $scope.<%= singular %> = <%= className %>.get({
            id: $stateParams.id
        });

        //update edited <%= singular %>
        $scope.save = function() {
            //TODO show input prompt
            //TODO show loading mask
            $scope.<%= singular %>.$update().then(function() {
                $state.go('<%= plural %>.list');
            });
            //TODO catch errors and notify
        };
    });