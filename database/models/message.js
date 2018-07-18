var db = require('../config');

var Message = db.Model.extend({
  tableName: 'messages',
  hasTimestamps: true,
});

module.exports = Message;