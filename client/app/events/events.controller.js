'use strict';

angular.module('eventsMongoApp')
  .controller('EventsCtrl', function($scope,$timeout, socket, CalendarEvent, Auth) {
    var newEventDefaults = {
      title: "Untitled Event",
      description: "",
      className: "",
      icon: "",
      allDay: false,
      User: {}
    };    
    $scope.userInfo = {}
    $scope.newEvent = {};
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $scope.getCurrentUser(function(user) {
      $scope.currentUser = user;
      $scope.userInfo.user = $scope.currentUser.name;
      $scope.userInfo.createdDate = new Date();
      newEventDefaults.creator = $scope.currentUser._id;
    });

    CalendarEvent.query().$promise.then(response => {
      $scope.events = response
      socket.syncUpdates('events', $scope.events);
    });

    $('.new-event-collapse').sideNav({
      menuWidth: 450,
      edge: 'right'
    });

    $('.new-event-close-collapse').click(function() {
      $timeout(function() {
        $scope.newEvent = {};
        $('.new-event-collapse').sideNav('hide');
      }, 0, false);
    });
    
    $scope.openForm=function(){
      console.log('asdfasdf');
      $timeout(function() {
        $scope.newEvent = {};
        $('.new-event-collapse').sideNav('show');
      }, 0, true);
    }

    var eve = $("#new-event-out").height();
    $('.events-side-navigation').height(eve).perfectScrollbar({
      suppressScrollX: true
    });

    $scope.newEvent.edate = moment().format('MMM, D dddd');
    $scope.newEvent.today = new Date();
    $scope.$watch('newEvent.edate', function handleDateChange(newValue, oldValue) {
      if (!newValue)
        $scope.newEvent.edate = moment().format('MMM, D dddd');
    });
    $scope.isEdit=false;
    $scope.editEvent = function(item) {
      $timeout(function() {
        $scope.isEdit=true;
        $scope.newEvent = angular.copy(item);
        $scope.newEvent.starttime = moment.utc(item.start).format("hh:mmA");
        $scope.newEvent.endtime = moment.utc(item.end).format("hh:mmA");
        $('.new-event-collapse').sideNav('show');
      }, 1, true);
    }
    
    $scope.saveEvent = function() {

      if ($scope.newEvent && !$scope.newEvent.edate)
      {
        $scope.newEvent.edate = moment().format();
      }  
      if ($scope.newEvent && !$scope.newEvent.starttime)
      {
        $scope.newEvent.starttime = moment().format("HH:mm");
      }  
      if ($scope.newEvent && !$scope.newEvent.endtime)
      {
        $scope.newEvent.endtime = moment().add(1, 'hour').format("HH:mm");
      }  
      
      var currentDate = moment($scope.newEvent.edate.toString(), "MMM, D dddd").format("YYYY-MM-DD");
      var startTime = moment($scope.newEvent.starttime.toString(), "h:mm a").format("HH:mm");
      var endTime = moment($scope.newEvent.endtime.toString(), "h:mm a").format("HH:mm");

      $scope.newEvent.start = moment(currentDate.toString() + ' ' + startTime.toString() + ' +0000', "YYYY-MM-DD HH:mm Z")
      $scope.newEvent.end = moment(currentDate.toString() + ' ' + endTime.toString() + ' +0000', "YYYY-MM-DD HH:mm Z")
      var newEvent = angular.extend(newEventDefaults, $scope.newEvent);

      // Save-Update Events
      
      if (newEvent._id) {

      CalendarEvent.update({
        id: newEvent._id
      }, newEvent).$promise.then(function() {
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
      CalendarEvent.save(newEvent).$promise.then(function() {
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
      newEvent={};
      $('.new-event-collapse').sideNav('hide');
    });
      // END
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates("events");
    });

    
  }).filter('UTCToNow', function() {
    return function(input, format) {
      return moment.utc(input).format('dddd, MMMM Do YYYY, h:mmA');
    }
  });
  
