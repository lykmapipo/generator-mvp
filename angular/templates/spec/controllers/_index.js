'use strict';

describe('Controller: <%= className %>IndexCtrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var <%= className %>IndexCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= className %>IndexCtrl = $controller('<%= className %>IndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should do something', function () {
    expect(!!<%= className %>IndexCtrl).toBe(true);
  });

});
