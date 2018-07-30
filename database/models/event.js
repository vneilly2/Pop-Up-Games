var db = require('../config');
var User = require('./user');
var Field = require('./field');
var Sport = require('./sport');
var Message = require('./message');

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User, 'ownerId');
  },
  guests: function() {
    return this.belongsToMany('User', 'events_users', 'eventId', 'userId');
  },
  messages: function() {
    return this.hasMany(Message, 'eventId');
  },
  field: function() {
    return this.belongsTo(Field, 'fieldId');
  },
  sport: function() {
    return this.belongsTo(Sport, 'sportId');
  },
});

module.exports = db.model('Event', Event);
