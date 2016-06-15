'use strict';

angular.module('eventsMongoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('doc', {
        url: '/doc',
        templateUrl: 'app/doc/doc.html',
        controller: 'DocCtrl',
        authenticate: 'admin'
      });
  });
