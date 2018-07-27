var db = require('../config');
// var crypto = require('crypto');
var Event = require('./event');
var Message = require('./event');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  events: function() {
    return this.hasMany('Event', 'ownerId');
  },
  messages: function() {
    this.hasMany(Message);
  },
  guestEvents: function() {
    return this.belongsToMany('Event', 'events_users', 'userId', 'eventId');
  }
});

module.exports = db.model('User', User);