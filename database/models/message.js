var db = require('../config');
var User = require('./user.js');
var Event = require('./event.js');

var Message = db.Model.extend({
  tableName: 'messages',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  },
  event: function() {
    return this.belongsTo('Event', 'eventId');
  }
});

module.exports = Message;