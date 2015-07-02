'use strict';

angular.module('comhubApp')
  .directive('addMarker', function () {
    return {
      templateUrl: 'app/addMarker/addMarker.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });