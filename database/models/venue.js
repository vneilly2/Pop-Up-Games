var db = require('../config');
var Field = require('./field');

var Venue = db.Model.extend({
  tableName: 'venues',
  hasTimestamps: true,
  fields: function() {
    return this.hasMany(Field, 'fieldId');
  }
});

module.exports = Venue;