<!DOCTYPE html>
<html lang="en" ng-app="comhub">
  <head>
  	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="/bower_components/angular-material/angular-material.css">
    <meta charset="utf-8">
    <title>Com Hub</title>
    <style>
      html, body, #map-canvas {
        height: 100%;
        margin: 0px;
        padding: 0px
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
    <script>
		function initialize() {
		  var center = new google.maps.LatLng(42.289397, -82.989836);
		  
		  var mapOptions = {
		    zoom: 12,
		    center: center,
		    disableDefaultUI: true
		  }
		  
		  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		  // var marker = new google.maps.Marker({
		  //     position: myLatlng,
		  //     map: map,
		  //     title: 'Hello World!'
		  // });
		}

		google.maps.event.addDomListener(window, 'load', initialize);
    </script>


  </head>

  <body ng-app="comhub">
			<div ng-controller="AppCtrl" layout="column" style="padding-bottom: 15px;">
	  	<div layout="column" layout-fill style="padding-bottom: 32px;">

					<md-toolbar class="md-default-theme">
					<md-whiteframe class="md-whiteframe-z2">
						<h2>Com Hub</h2>
					</md-whiteframe>
					</md-toolbar>

	  	</div>	
			<md-content layout-padding style="height: 600px;padding: 24px;">
	  		<div id="map-canvas"></div>
			</md-content>
			</div>
	    

  <script src="/bower_components/angular/angular.js"></script>
	<script src="/bower_components/angular-aria/angular-aria.js"></script>
	<script src="/bower_components/angular-animate/angular-animate.js"></script>
	<script src="/bower_components/angular-material/angular-material.js"></script>
	
	<script>
		// Include app dependency on ngMaterial

		angular.module( 'comhub', [ 'ngMaterial' ] )
			.controller("AppCtrl", function($scope){} );
		angular.module('whiteframeBasicUsage', ['ngMaterial']);
	</script>

</body>

</html>


