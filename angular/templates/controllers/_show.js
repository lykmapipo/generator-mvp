'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= className %>ShowCtrl
 * @description
 * # <%= className %>ShowCtrl
 * <%= className %> show controller of the <%= scriptAppName %>
 */
angular
    .module('<%= scriptAppName %>')
    .controller('<%= className %>ShowCtrl', function($scope, $stateParams, <%= className %>) {
        
        //fetch <%= singular %> from backed
        $scope.<%= singular %> = <%= className %>.get({
            id: $stateParams.id
        });

    });