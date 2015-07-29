'use strict';

angular.module('comhubApp')
  .directive('addMarker', function () {
    return {
      templateUrl: 'app/addMarker/addMarker.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });