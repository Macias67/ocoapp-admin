'use strict';

describe('Service: authevents', function () {

  // load the service's module
  beforeEach(module('ocoApp'));

  // instantiate service
  var authevents;
  beforeEach(inject(function (_authevents_) {
    authevents = _authevents_;
  }));

  it('should do something', function () {
    expect(!!authevents).toBe(true);
  });

});
