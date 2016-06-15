/**
 * Events model events
 */

'use strict';

import {EventEmitter} from 'events';
var Events = require('./events.model');
var EventsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Events.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    if (event === "save") {
      Events.findById({ _id: doc._id })
          .populate('creator', 'name email')
          .then(eventDoc => {
              EventsEvents.emit(event + ':' + eventDoc._id, doc);
              EventsEvents.emit(event, eventDoc);
          });
      }
      else {
        EventsEvents.emit(event + ':' + doc._id, doc);
        EventsEvents.emit(event, doc);
      }
  }
}

export default EventsEvents;
