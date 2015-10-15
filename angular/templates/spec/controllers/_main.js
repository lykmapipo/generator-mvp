'use strict';

describe('Controller: <%= className %>MainCtrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var <%= className %>MainCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= className %>MainCtrl = $controller('<%= className %>MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should do something', function () {
    expect(!!<%= className %>MainCtrl).toBe(true);
  });
});
