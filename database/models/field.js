var db = require('../config');
var Venue = require('./venue');
var Sport = require('./sport');
var Event = require('./event');

var Field = db.Model.extend({
  tableName: 'fields',
  hasTimestamps: true,
  venue: function() {
    return this.belongsTo(Venue, 'venueId');
  },
  sport: function() {
    return this.hasMany(Sport, 'sportId');
  },
  events: function() {
    return this.hasMany(Event, 'eventId');
  }
});

module.exports = Field;