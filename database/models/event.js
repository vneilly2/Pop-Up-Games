var db = require('../config');
var User = require('./user');
var Field = require('./field');
var Sport = require('./sport');

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  user: function() {
    this.belongsTo(User, 'ownerId');
  },
  field: function() {
    this.belongsTo(Field);
  },
  sport: function() {
    this.belongsTo(Sport);
  }
});

module.exports = Event;