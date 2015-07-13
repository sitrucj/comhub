'use strict';

angular.module('comhubApp')
	.controller('MapCtrl', function ($scope, $mdDialog, $http, socket, markerService) {

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
      mouseclickposition: {},
      projection: 'EPSG:4326',
      markers: $scope.markers
	});

	$scope.markers = [];
	$scope.label = {
              message: 'test',
              show: false,
              showOnMouseOver: true
          		}

  getMarkers();

  function addMarkerProperties () {
	  for (var i = $scope.markers.length - 1; i >= 0; i--) {
	  	console.log($scope.markers[i].name);
	  	$scope.markers[i].onClick = 'function (event, properties) { console.log(this);' +
	  		' // ol.Feature instanceconsole.log(properties); // === $scope.marker';
	  	console.log($scope.markers[i].onClick);
	  };
  }

  function getMarkers () {
		$scope.markers = $http.get('api/markers').success(function (markers) {
			$scope.markers = markers;
			socket.syncUpdates('marker', $scope.markers);
			addMarkerProperties();
		})
  };

	$scope.clickMarker = function () {
		alert('clicked');
	};

	$scope.showAddMarker = function(ev)  
	//shows the add marker dialog to input details
	{
	  $mdDialog.show({
	    // templateUrl: '../addMarker/addMarker.html',
	    template: '<md-dialog><add-marker></add-marker></md-dialog>',
	    parent: angular.element(document.body),
	    targetEvent: ev
	  }).then(function() {
	     $scope.alert = 'You cancelled the dialog.';
	   });
	};
		
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

	$scope.$on('openlayers.map.singleclick', function(event, data) {
	  $scope.$apply(function() {
	      if ($scope.projection === data.projection) {
	      	$scope.mouseclickposition = data.coord;
	      } else {
	        var p = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, $scope.projection);
	        //set service for global
	        markerService.setLat(p[1]);
	        markerService.setLon(p[0]);
	        $scope.showAddMarker(event);
	      }
	  });
  });

});