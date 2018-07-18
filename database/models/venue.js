var db = require('../config');

var Venue = db.Model.extend({
  tableName: 'venues',
  hasTimestamps: true,
});

module.exports = Venue;