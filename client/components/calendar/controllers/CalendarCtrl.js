'use strict';

angular.module('eventsMongoApp').controller('CalendarCtrl', function($scope, $log, $timeout, socket,CalendarEvent,Auth) {

  $scope.userInfo = {}  
  $scope.getCurrentUser = Auth.getCurrentUser;
  $scope.getCurrentUser(function(user) {
    $scope.currentUser = user;
    $scope.userInfo.user = $scope.currentUser.name;
    $scope.userInfo.createdDate = new Date();
  });
  
  $scope.newEvent = {};

  $scope.addEvent = function() {
    var newEventDefaults = {
      title: "Untitled Event",
      description: "",
      className: "",
      icon: "",
      allDay: false,
      creator: $scope.currentUser._id,
      User:{}
    };

    $scope.newEvent = angular.extend(newEventDefaults, $scope.newEvent);
    if ($scope.newEvent._id) {

      CalendarEvent.update({
        id: $scope.newEvent._id
      }, $scope.newEvent).$promise.then(function() {
        Materialize.toast('Event updated.', 2000, '', function() { });
      }, function(error) { // error handler
        if (error.data.errors) {
          var err = error.data.errors;
          console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
        } else {
          var msg = error.data.message;
          console.log(msg);
        }
      });
    }
    else {
      CalendarEvent.save($scope.newEvent).$promise.then(function() {
        Materialize.toast('Event added.', 2000, '', function() { });
					}, function(error) { // error handler
						if (error.data.errors) {
							var err = error.data.errors;
							console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
						} else {
							var msg = error.data.message;
							console.log(msg);
						}
					});
    }
    
    $timeout(function() {
      $scope.newEvent = {};
      $('.event-collapse').sideNav('hide');
    });
  };

  $scope.deleteEvent = function()
  {    
    if (!$scope.newEvent._id) return;
    CalendarEvent.delete({ id: $scope.newEvent._id })
      .$promise.then(function(response) {
        Materialize.toast('Event deleted.', 2000, '', function() { });
        $('.event-collapse').sideNav('hide');
      }, function(error) { // error handler
        if (error.data.errors) {
          var err = error.data.errors;
          console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
        } else {
          var msg = error.data.message;
          console.log(msg);
        }
      });
  }

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates("events");
  });
});
