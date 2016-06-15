'use strict';

(function() {

class MainController {

  constructor($http, $scope, $compile, socket, Auth,CalendarEvent) {
    this.$http = $http;
    this.awesomeThings = [];

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    CalendarEvent.query().$promise.then(response => {
      this.events = response;
      socket.syncUpdates('events', this.events);
    });
  }
}

  angular.module('eventsMongoApp')
    .controller('MainController', MainController);
})();
