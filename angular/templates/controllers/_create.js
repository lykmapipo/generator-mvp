'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>CreateCtrl
 * @description
 * # <%= className %>CreateCtrl
 * <%= className %> create controller of <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>CreateCtrl', function($scope, $state, <%= className %>) {

        //action performed by this controller
        $scope.action = 'Create';

        //instantiate new <%= singular %>
        $scope.<%= singular %> = new <%= className %>();

        /**
         * @description save created <%= singular %>
         */
        $scope.save = function() {
            //TODO show input prompt
            //TODO show loading mask
            $scope.<%= singular %>.$save().then(function() {
                $state.go('<%= plural %>.list');
            });
            //TODO catch errors and notify
        };
        
    });