'use strict';

describe('Controller: <%= className %>ShowCtrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var <%= className %>ShowCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= className %>ShowCtrl = $controller('<%= className %>ShowCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

   it('should do something', function () {
    expect(!!<%= className %>ShowCtrl).toBe(true);
  });
});
