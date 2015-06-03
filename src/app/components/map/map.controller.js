'use strict';

angular.module('comhub')
.controller('MapCtrl', [ '$scope', function($scope) {
	angular.extend($scope, {
		windsor: {
			lat: 42.29784984220032,
		  lon: -83.0087112453313,
		  zoom: 13,
		  bounds: [
		    -83.11991190567011,
		    42.24385579789751,
		    -82.87958597793572,
		    42.345437271598854
		 		]
		}
	});
}]);
