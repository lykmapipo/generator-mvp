'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>ShowCtrl
 * @description
 * # <%= className %>ShowCtrl
 * <%= className %> show controller of <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>ShowCtrl', function($scope, $stateParams, <%= className %>) {
        
        //load <%= singular %>
        $scope.<%= singular %> = <%= className %>.get({
            id: $stateParams.id
        });

    });