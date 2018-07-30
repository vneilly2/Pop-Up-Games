var db = require('../config');
var Field = require('./field');

var Venue = db.Model.extend({
  tableName: 'venues',
  fields: function() {
    return this.hasMany('Field', 'venueId');
  },
});

module.exports = Venue;
