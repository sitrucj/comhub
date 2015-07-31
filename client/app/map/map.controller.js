'use strict';

angular.module('comhubApp')
	.controller('MapCtrl', function ($scope, $mdDialog, $http, $mdToast, $animate, socket, markerService, Auth) {

		angular.extend($scope, {
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
      markers: $scope.markers,
      clickedMarker: {}
		});
		
	$scope.isNotLoggedIn = !(Auth.isLoggedIn);
	$scope.markers = null;
	$scope.enableAddMarker = false;
  $scope.loginDialogShownOnce = false;

  function getMarkers ()
	// get markers from mongo
	{
		$scope.markers = $http.get('api/markers').success(function (markers) {
			$scope.markers = markers;
			socket.syncUpdates('marker', $scope.markers);
			addMarkerProperties();
		});
  }


	$scope.showAddMarker = function(ev)  
	// shows the add marker dialog to input details
	{
	  $mdDialog.show({
	    template: '<md-dialog><div add-marker></div></md-dialog>',
	    parent: angular.element(document.body),
	    targetEvent: ev
	  }).then(function() {
	     $scope.alert = 'You cancelled the dialog.';
	   });
	};
	
	$scope.$on('openlayers.map.singleclick', function(event, data) 
	// Used to deal with clicking to add a marker
	{
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

	$scope.pleaseLoginPrompt = function() 
	// prompts the user to log in
	{
		if (!$scope.loginDialogShownOnce && $scope.isNotLoggedIn){
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

	$scope.showMarkerInfoDialogue = function (ev)
	// Opens the marker info in a dialogue for user to view
	// The template is there instead of in anoher file because i can't seem to access sope in another file
	{
		$mdDialog.show({
			template: '<div layout=column><md-dialog><md-toolbar><div class="md-toolbar-tools">{{clickedMarker.name}}<span flex></span><md-button class="md-icon-button" aria-label="Close" ng-click="answer()"><md-icon md-svg-src="assets/images/icons/close24.svg"></md-icon></md-button></div></md-toolbar>' + 
			'<md-content layout-margin>{{clickedMarker.description}}</md-content></md-dialog></div>',
			scope: $scope.$new()
	  }).then(function() {
	     $scope.alert = 'You cancelled the dialog.';
	   });
	};

	function addMarkerProperties ()
	// needed to enable click events on a marker!
	// Have a label property defined for the marker.
	// Have the show property of the label set to false.
	// Have some transcluded content in the marker.
	{
	  for (var i = $scope.markers.length - 1; i >= 0; i--) {
	  	$scope.markers[i].onClick = function (event, properties) { $scope.clickedMarker = properties; console.log($scope.clickedMarker.name + " " + $scope.clickedMarker.description); $scope.showMarkerInfoDialogue(event); };
	  	$scope.markers[i].label = { 
	  	// Note: Duplication of data here @ message. Fix this later.
	  	'message': $scope.markers[i].name,
      'show': false,
      'showOnMouseOver': false
      };
	  }
	}


	// Toast! for add marker
	$scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };
  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

	$scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .content('Click the map to add your marker!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };

  //Marker details
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
    $scope.answer = function(answer) {
    $mdDialog.hide(answer);
	};



	getMarkers();

});