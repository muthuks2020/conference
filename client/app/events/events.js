'use strict';

angular.module('eventsMongoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl',
        authenticate: 'admin'
      });
  });
