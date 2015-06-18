'use strict';

angular.module('comhub', ['ngAnimate', 
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router',
  'ngMaterial',
  'openlayers-directive'])
  .config(function ($stateProvider, $urlRouterProvider,$mdThemingProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/components/user/register.html',
        controller: 'RegisterCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/components/contact/contact.html',
        controller: 'ContactCtrl'
      });
    $urlRouterProvider.otherwise('/');
 	  
 	  $mdThemingProvider.theme('default')
  	  .primaryPalette('indigo')
    	.accentPalette('pink')
      .warnPalette('red');
});

