'use strict';

angular.module('comhubApp')
  .factory('geo', function ($q) {

    var getPosition = function () {
        var deferred = $q.defer();
        if (navigator.geolocation) {
          deferred.resolve(navigator.geolocation.getCurrentPosition(function (position) {
            var crd = position.coords;
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            return crd;
          } ));
        }
        return deferred.promise;
    }

    // Public API here
    return {
      getPosition: getPosition
    };
  });
