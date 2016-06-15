"use strict";

angular.module('eventsMongoApp').directive('dragableEvent', function ($log,$timeout) {
    return {
        restrict: 'A',
        link: function (scope, element) {
        //    var eventObject = element.scope().event;
        //    delete eventObject._id;
        //    element.data('eventObject', eventObject);
           
        element.data('eventObject', {
            title: $.trim($(element).text()),
            className:$.trim($(element).attr('class')),
            stick: true
        });
         
          element.draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0 //  original position after the drag
          });
        }
    }
})