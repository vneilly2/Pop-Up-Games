var db = require('../config');

var Field = db.Model.extend({
  tableName: 'fields',
  hasTimestamps: true,
});

module.exports = Field;