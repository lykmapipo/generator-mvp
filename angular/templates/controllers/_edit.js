'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>EditCtrl
 * @description
 * # <%= className %>EditCtrl
 * <%= className %> edit controller of <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>EditCtrl', function($scope, $state, $stateParams, <%= className %>) {

        //action performed by this controller
        $scope.action = 'Edit';

        
        /**
         * @description load <%= singular %>
         */
        $scope.<%= singular %> = <%= className %>.get({
            id: $stateParams.id
        });


        /**
         * @description save edited <%= singular %>
         */
        $scope.save = function() {
            //TODO show input prompt
            //TODO show loading mask
            $scope.<%= singular %>.$update().then(function() {
                $state.go('<%= plural %>.list');
            });
            //TODO catch errors and notify
        };
        
    });