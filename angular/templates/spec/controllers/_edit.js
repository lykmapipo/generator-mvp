'use strict';

describe('Controller: <%= className %>EditCtrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var <%= className %>EditCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= className %>EditCtrl = $controller('<%= className %>EditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should do something', function () {
    expect(!!<%= className %>EditCtrl).toBe(true);
  });

});
