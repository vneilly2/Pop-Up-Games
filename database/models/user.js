var db = require('../config');
// var crypto = require('crypto');
var Event = require('./event');
var Message = require('./event');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  events: function() {
    return this.hasMany(Event, 'ownerId');
  },
  messages: function() {
    this.hasMany(Message);
  }
});

module.exports = User;