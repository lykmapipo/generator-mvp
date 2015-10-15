'use strict';

describe('Service: <%= className %>', function () {

  // load the service's module
  beforeEach(module('<%= scriptAppName %>'));

  // instantiate service
  var <%= className %>;
  beforeEach(inject(function (_<%= className %>_) {
    <%= className %> = _<%= className %>_;
  }));

  it('should do something', function () {
    expect(!!<%= className %>).toBe(true);
  });

});
