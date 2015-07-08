'use strict';

describe('Service: markerService', function () {

  // load the service's module
  beforeEach(module('comhubApp'));

  // instantiate service
  var markerService;
  beforeEach(inject(function (_markerService_) {
    markerService = _markerService_;
  }));

  it('should do something', function () {
    expect(!!markerService).toBe(true);
  });

});
