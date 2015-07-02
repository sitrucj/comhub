'use strict';

describe('Directive: addMarker', function () {

  // load the directive's module and view
  beforeEach(module('comhubApp'));
  beforeEach(module('app/addMarker/addMarker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-marker></add-marker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the addMarker directive');
  }));
});