'use strict';

angular.module('comhub')
	.controller('MapCtrl', [ '$scope', function($scope) {
		angular.extend($scope, {
			windsor: {
				lat: 42.300095327770569,
			  lon: -83.02625377869369,
			  zoom: 13
			}
		});
	}]);
