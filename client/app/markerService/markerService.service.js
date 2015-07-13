'use strict';

angular.module('comhubApp')
  .service('markerService', function ($http) {
		this.newMarker = {	name: '',
			description: '',
			lat: '',
			lon: '',
			user: 'anonymous'};

		this.getNewMarker = function () {
			return this.newMarker;
		};

		this.setTitle = function (name) {
			this.newMarker.name = name;
			console.log('name service set: ' + this.newMarker.name);
		};
		this.setDescription = function (description) {
			this.newMarker.description = description;
			console.log('Description service set: ' + this.newMarker.description);
		};
		this.setLat = function (lat) {
			this.newMarker.lat = lat;
			console.log('lat service set: ' + this.newMarker.lat);
		};
		this.setLon = function (lon) {
			this.newMarker.lon = lon;
			console.log('lon service set: ' + this.newMarker.lon);
		};
		this.reset = function () {
			this.newMarker =  {	name: '',
				description: '',
				lat: '',
				lon: '',
				user: '',
				created_at: ''};		
		};
		


		this.setMarkers = function (markers) {
			this.markers = markers;
		}
		this.markers = function () {
			return this.markers;
		}
		this.addMarker = function (marker) {
			//todo append marker
		}

		this.post = function () {
			$http.post('/api/markers',  { name: this.newMarker.name,
			description: this.newMarker.description,
			lat: this.newMarker.lat,
			lon: this.newMarker.lon,
			user: 'anonymous'});

			this.newMarker = {};
			console.log('posted');
		}

	});
