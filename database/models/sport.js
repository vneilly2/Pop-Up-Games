var db = require('../config');

var Sport = db.Model.extend({
  tableName: 'sports',
  hasTimestamps: true,
});

module.exports = Sport;