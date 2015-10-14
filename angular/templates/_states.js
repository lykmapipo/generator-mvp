'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.states:<%= className %>
 * @description
 * <%= className %> states configuration of the <%= scriptAppName %> 
 */
angular
    .module('<%= scriptAppName %>')
    .config(function($stateProvider) {

        //<%= singular %> management states
        $stateProvider
            .state('<%= plural %>', {
                abstract: true,
                templateUrl: 'views/<%= plural %>/layout.html',
                controller: '<%= className %>MainCtrl'
            })
            .state('<%= plural %>.list', {
                url: '/<%= plural %>',
                templateUrl: 'views/<%= plural %>/index.html',
                controller: '<%= className %>IndexCtrl'
            })
            .state('<%= plural %>.show', {
                url: '/<%= plural %>/show/:id',
                templateUrl: 'views/<%= plural %>/show.html',
                controller: '<%= className %>ShowCtrl'
            })
            .state('<%= plural %>.create', {
                url: '/<%= plural %>/create',
                templateUrl: 'views/<%= plural %>/create.html',
                controller: '<%= className %>CreateCtrl'
            })
            .state('<%= plural %>.edit', {
                url: '/<%= plural %>/edit/:id',
                templateUrl: 'views/<%= plural %>/edit.html',
                controller: '<%= className %>EditCtrl'
            });
    });