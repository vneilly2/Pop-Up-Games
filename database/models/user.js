var db = require('../config');
// var crypto = require('crypto');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
});

module.exports = User;