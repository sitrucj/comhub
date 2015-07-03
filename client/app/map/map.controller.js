'use strict';

angular.module('comhubApp')
	.controller('MapCtrl', [ '$scope', function ($scope) {
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
			},
			defaults: {
        events: {
            map: [ 'singleclick', 'pointermove' ]
        }
      },
      mouseposition: {},
      mouseclickposition: {},
      projection: 'EPSG:4326'
		});
		
		// updatePosition();
		
		$scope.$on('openlayers.map.pointermove', function(event, data) {
        $scope.$apply(function() {
            if ($scope.projection === data.projection) {
                $scope.mouseposition = data.coord;
            } else {
                var p = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, $scope.projection);
                $scope.mouseposition = {
                    lat: p[1],
                    lon: p[0],
                    projection: $scope.projection
                }
            }
        });
    });

		$scope.$on('openlayers.map.singleclick', function(event, data) {
    	  $scope.$apply(function() {
            if ($scope.projection === data.projection) {
                $scope.mouseclickposition = data.coord;
            } else {
                var p = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, $scope.projection);
                $scope.mouseclickposition = {
                    lat: p[1],
                    lon: p[0],
                    projection: $scope.projection
                }
            }
        });
    });

		
// Other Functions------------------------------------------------------
		function updatePosition () 
		// update user positioin
		{
			
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
			  $scope.$apply(function(){
			    $scope.center.lat = position.coords.latitude;
			    $scope.center.lon = position.coords.longitude;
			    $scope.center.zoom = 13;
			  });
			});
		return true;
		} // end if navigator
		return false;
		}

	}]);