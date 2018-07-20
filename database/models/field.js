var db = require('../config');
var Venue = require('./venue');
var Sport = require('./sport');

var Field = db.Model.extend({
  tableName: 'fields',
  hasTimestamps: true,
  venue: function() {
    this.belongsTo(Venue);
  },
  sport: function() {
    this.belongsTo(Sport);
  }
});

module.exports = Field;