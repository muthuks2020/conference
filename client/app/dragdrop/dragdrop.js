'use strict';

angular.module('eventsMongoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dragdrop', {
        url: '/dragdrop',
        templateUrl: 'app/dragdrop/dragdrop.html',
        controller: 'DragdropCtrl',
         authenticate: 'admin'
      });
  });
