var db = require('../config');
var Event = require('./event');
var Field = require('./field');

var Sport = db.Model.extend({
  tableName: 'sports',
  hasTimestamps: true,
  events: function() {
    return this.hasMany(Event, 'eventId');
  },
  fields: function() {
    return this.hasMany(Field, 'fieldId');
  }
});


module.exports = Sport;