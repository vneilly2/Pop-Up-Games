var db = require('../config');
var Field = require('./field');

var Venue = db.Model.extend({
  tableName: 'venues',
  hasTimestamps: true,
  fields: function() {
    this.hasMany(Field);
  }
});

module.exports = Venue;