'use strict';

// Not used at all 
// using center autodiscover instead

angular.module('comhubApp')
  .factory('geo', function ($q) {

    var getPosition = function () {
        var deferred = $q.defer();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) { deferred.resolve(position); });
        }
        return deferred.promise;
    };

    // Public API here
    return {
      getPosition: getPosition
    };
  });
