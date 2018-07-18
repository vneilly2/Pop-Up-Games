var db = require('../config');
var Sport = require('../models/sport');

var Sports = new db.Collection();

Sports.model = Sport;

module.exports = Sports;
