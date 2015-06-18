'use strict';

angular.module('comhub')
  .controller('RegisterCtrl', function ($scope) {
    $scope.user = {
      email: '',
      password: ''
    };
  });