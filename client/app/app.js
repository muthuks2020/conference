'use strict';

angular.module('eventsMongoApp', [
  'eventsMongoApp.auth',
  'eventsMongoApp.admin',
  'eventsMongoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'ui.calendar',
  'ui.materialize',
  'perfect_scrollbar'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
