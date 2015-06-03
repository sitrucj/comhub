'use strict';

angular.module('comhub', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial', 'openlayers-directive'])
  .config(function ($stateProvider, $urlRouterProvider,$mdThemingProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
 	  
 	  $mdThemingProvider.theme('default')
  	  .primaryPalette('indigo')
    	.accentPalette('green');
  })
;

