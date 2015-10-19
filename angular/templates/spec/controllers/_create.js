'use strict';

describe('Controller: <%= className %>CreateCtrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var <%= className %>CreateCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= className %>CreateCtrl = $controller('<%= className %>CreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

 it('should do something', function () {
    expect(!!<%= className %>CreateCtrl).toBe(true);
  });

});
