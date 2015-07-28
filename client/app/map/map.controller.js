'use strict';

angular.module('comhubApp')
	.controller('MapCtrl', function ($scope, $mdDialog, $http, socket, markerService, Auth, geo) {

		angular.extend($scope, {
			windsor: { 
				lat: 42.300095327770569,
			  lon: -83.02625377869369,
			  zoom: 13
			},
			center: {
				lat: 0,
			  lon: 0,
			  autodiscover: true
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
	$scope.markers = null;
	$scope.enableAddMarker = false;
  $scope.loginDialogShownOnce = false;

	getMarkers();


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

	$scope.$on('openlayers.map.singleclick', function(event, data) {
	  $scope.$apply(function() {
	      if (Auth.isLoggedIn() && $scope.enableAddMarker) {
		      if ($scope.projection === data.projection) {
		      	$scope.mouseclickposition = data.coord;
		      } else {
		        var p = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, $scope.projection);
		        //set service for global
		        markerService.setLat(p[1]);
		        markerService.setLon(p[0]);
		        $scope.showAddMarker(event);
		        $scope.enableAddMarker = false;
		      }
	      } else { $scope.pleaseLoginPrompt(); }
	  });
	});

	$scope.pleaseLoginPrompt = function() {
		if (!$scope.loginDialogShownOnce){
		  $mdDialog.show(
		    $mdDialog.alert()
		      .parent(angular.element(document.body))
		      .title('Please Log In')
		      .content('You must be logged in to add a maker to the map.')
		      .ariaLabel('Log in required')
		      .ok('Got it!')
		      .targetEvent()
		  );
		  $scope.loginDialogShownOnce=true;
		}
	};

	function addMarkerProperties ()
	// needed to enable click events on a marker!
	// Have a label property defined for the marker.
	// Have the show property of the label set to false.
	// Have some transcluded content in the marker.
	{
	  for (var i = $scope.markers.length - 1; i >= 0; i--) {
	  	$scope.markers[i].onClick = function (event, properties) { console.log('Clicked a marker'); };
	  	$scope.markers[i].label = { 
	  	// Note: Duplication of data here @ message. Fix this later.
	  	"message": $scope.markers[i].name,
      "show": false,
      "showOnMouseOver": false
      };
	  };
	}

	function getMarkers ()
	// get markers from mongo
	{
		$scope.markers = $http.get('api/markers').success(function (markers) {
			$scope.markers = markers;
			socket.syncUpdates('marker', $scope.markers);
			addMarkerProperties();
		})
  };

});