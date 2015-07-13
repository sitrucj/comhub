'use strict';

angular.module('comhubApp')
  .controller('AddMarkerCtrl', [ 
  	'$scope', 
  	'$mdDialog',
		'$http',
		'socket',
		'markerService',
  	function ($scope, $mdDialog, $http, socket, markerService) {
	

	var newMarker = {};

	
  $scope.clearValue = function() {
    $scope.newMarker.title = {};
  };

  $http.get('/api/markers').success(function(markers) {
    markerService.markers = markers;
    socket.syncUpdates('marker', markerService.markers);
  });
  
  $scope.addMarker = function() {
    if($scope.newMarker.title === '') {
    	console.log('newMarker title is empty');
      return;
    }

    markerService.setTitle($scope.newMarker.title);
    markerService.setDescription($scope.newMarker.description);

    markerService.post();
    $scope.newMarker = {};
    $scope.hide();
  };

  $scope.deleteMarker= function(marker) {
    $http.delete('/api/markers/' + marker._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('marker');
  });
 

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