var db = require("./config");
var Users = require("./collections/users");
var User = require("./models/user");
var Fields = require("./collections/fields");
var Field = require("./models/field");
var Sports = require("./collections/sports");
var Sport = require("./models/sport");
var Events = require("./collections/events");
var Event = require("./models/event");
var Venues = require("./collections/venues");
var Venue = require("./models/venue");

exports.saveUser = user =>
  new Promise(function(resolve, reject) {
    new User({username: user.username}).fetch().then(found => found ? reject() : Users.create(user).then(resolve))
})


exports.getPassword = user =>
  new Promise(function(resolve, reject) {
    new User({username: user.username}).fetch().then(found => found ? resolve(found.attributes.password) : reject());
})

