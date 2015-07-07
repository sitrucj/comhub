'use strict';

angular.module('comhubApp')
  .controller('AddMarkerCtrl', [ '$scope', '$mdDialog', function ($scope, $mdDialog) {
	
	  $scope.hide = function() {
	    $mdDialog.hide();
	  };

	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };

	  $scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	}
}]);