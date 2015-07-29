'use strict';

angular.module('comhubApp')
  .directive('markerInfoDialogue', function () {
    return {
      templateUrl: 'app/markerInfoDialogue/markerInfoDialogue.html',
      restrict: 'EA',
      link: function () 
      // scope, element, attrs removed 
      {
      }
    };
  });