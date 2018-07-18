var db = require('../config');
var Field = require('../models/field');

var Fields = new db.Collection();

Fields.model = Field;

module.exports = Fields;
