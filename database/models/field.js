var db = require('../config');
var Venue = require('./venue');
var Sport = require('./sport');
var Event = require('./event');

var Field = db.Model.extend({
  tableName: 'fields',
  venue: function() {
    return this.belongsTo(Venue, 'venueId');
  },
  sports: function() {
    return this.belongsToMany('Sport', 'fields_sports', 'fieldId', 'sportId');
  },
  events: function() {
    return this.hasMany('Event', 'fieldId');
  }

});

module.exports = db.model('Field', Field);