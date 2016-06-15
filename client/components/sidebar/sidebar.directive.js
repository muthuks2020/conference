'use strict';

angular.module('eventsMongoApp')
  .directive('sidebar', () => ({
    templateUrl: 'components/sidebar/sidebar.html',
    restrict: 'E',
    controller: 'SidebarController',
    controllerAs: 'side'
  }));
