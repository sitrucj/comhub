'use strict';

angular.module('comhubApp')
  .service('markerService', function ($http, Auth) {
		this.newMarker = {	name: '',
			description: '',
			lat: '',
			lon: '',
			user: Auth.getCurrentUser().name
			};

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
		this.resetNewMarker = function () {
			this.newMarker =  {	name: '',
				description: '',
				lat: '',
				lon: '',
				created_at: ''};		
		};
		

		this.setMarkers = function (markers) {
			this.markers = markers;
		};
		this.markers = function () {
			return this.markers;
		};
		
		this.addMarker = function (marker) {
			//todo append marker
		};

		this.post = function () {
			$http.post('/api/markers',  { 
				name: this.newMarker.name,
				description: this.newMarker.description,
				lat: this.newMarker.lat,
				lon: this.newMarker.lon,
				user: this.newMarker.user
			});

			console.log(this.newMarker.user + ' :posted Description: ' + this.newMarker.description); 
			this.resetNewMarker();
		};

	});
