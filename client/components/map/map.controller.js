'use strict';

angular.module('comhubApp')
	.controller('MapCtrl', [ '$scope', function ($scope, $location, Auth) {
		angular.extend($scope, {
			windsor: { 
				lat: 42.300095327770569,
			  lon: -83.02625377869369,
			  zoom: 13
			},
			center: {
				lat: 54.063408,
			  lon: -101.910305,
				zoom: 3
			}
		});
		
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
		  console.log(position);
		  $scope.$apply(function(){
		    $scope.center.lat = position.coords.latitude;
		    $scope.center.lon = position.coords.longitude;
		    $scope.center.zoom = 13;
		  });
		});
		}
	}]);