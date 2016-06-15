'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: String,
  className: String,
  start: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
  icon: String,
  allDay: {
    type: Boolean,
    default: false
  },
  active: {
		type: Boolean,
		default: true
	}
});

export default mongoose.model('Events', EventsSchema);
