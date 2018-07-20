var db = require('../config');
var Event = require('./event');
var Field = require('./field');

var Sport = db.Model.extend({
  tableName: 'sports',
  hasTimestamps: true,
  events: function() {
    this.hasMany(Event);
  },
  fields: function() {
    this.hasMany(Field);
  }
});


module.exports = Sport;