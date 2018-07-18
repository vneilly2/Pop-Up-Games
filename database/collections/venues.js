var db = require('../config');
var Venue = require('../models/venue');

var Venues = new db.Collection();

Venues.model = Venue;

module.exports = Venues;
