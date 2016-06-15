
"use strict";

angular.module('eventsMongoApp').factory('CalendarEvent', function($resource){
  //return $resource('/api/events', { id: '@id' });
  return $resource('/api/events/:id', null, {'update': { method:'PUT' } });
});