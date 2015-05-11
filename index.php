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
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC0LHMYC4pQmrIYw8PMT-oSHbJJyoMOAKY"></script>
    <script>
		function initialize() {
		  var center = new google.maps.LatLng(42.289397, -82.989836);
		  
		  var mapOptions = {
		    zoom: 12,
		    center: center,
		    disableDefaultUI: true,
		    scroolwheel:false

		  }
		  
		  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	
		  var infoWindow = new google.maps.InfoWindow;

      // Change this depending on the name of your PHP file
	      downloadUrl("loadmarkers.php", function(data) {
	        var xml = data.responseXML;
	        var markers = xml.documentElement.getElementsByTagName("marker");
	        for (var i = 0; i < markers.length; i++) {
	          var name = markers[i].getAttribute("name");
	          var details = markers[i].getAttribute("details");
	          var type = markers[i].getAttribute("type");
	          var point = new google.maps.LatLng(
	              parseFloat(markers[i].getAttribute("lat")),
	              parseFloat(markers[i].getAttribute("lng")));
	          var html = "<b>" + name + "</b> <br/>" + details;
	          var marker = new google.maps.Marker({
	            map: map,
	            position: point
	          });
	          bindInfoWindow(marker, map, infoWindow, html);
	        }
	      });

	      		  // This event listener will call addMarker() when the map is clicked.
  			google.maps.event.addListener(map, 'click', function(event) {
   				addMarker(event.latLng);
  			});

 		// Add a marker to the map and push to the array.
		function addMarker(location) {
		  var marker = new google.maps.Marker({
		    position: location,
		    map: map
		  });
		  userMarkers.push(marker);
		}
		
		}

		google.maps.event.addDomListener(window, 'load', initialize);
		var userMarkers=[];

	

		// Sets the map on all markers in the array.
		function setAllMap(map) {
		  for (var i = 0; i < userMarkers.length; i++) {
		    userMarkers[i].setMap(map);
		  }
		}

		// Removes the userMarkers from the map, but keeps them in the array.
		function clearMarkers() {
		  setAllMap(null);
		}

		// Shows any userMarkers currently in the array.
		function showMarkers() {
		  setAllMap(map);
		}

		// Deletes all userMarkers in the array by removing references to them.
		function deleteMarkers() {
		  clearMarkers();
		  userMarkers = [];
		}
  
    //<![CDATA[

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing() {}

    //]]>

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
				<div id="panel">
		      <!-- <input onclick="clearMarkers();" type=button value="Hide Markers"> -->
		      <!-- <input onclick="showMarkers();" type=button value="Show All Markers"> -->
		      <input onclick="deleteMarkers();" type=button value="Delete Markers">
		    </div>
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


