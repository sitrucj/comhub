'use strict';

angular.module('comhubApp')
  .controller('AddMarkerCtrl', [ 
  	'$scope', 
  	'$mdDialog',
		'$http',
		'socket', 
  	function ($scope, $mdDialog, $http, socket) {
	
	$scope.markers = [];
	$scope.newMarker = undefined;
  
  $scope.clearValue = function() {
    $scope.newMarker = undefined;
  };

  $http.get('/api/markers').success(function(markers) {
    $scope.markers = markers;
    socket.syncUpdates('marker', $scope.markers);
  });
  
  $scope.addMarker = function() {
    if($scope.newMarker === undefined) {
      return;
    }
    console.log($scope.newMarker.title);
    // $http.post('/api/markers', { name: $scope.newMarker });
    // $scope.newMarker = '';
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