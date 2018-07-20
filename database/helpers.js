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

exports.saveEvent = event =>
  new User({username: event.username}).fetch()
    .then(user => console.log(user) && Events.create((delete event.username) && (event.ownerId = user.id) && event))


exports.getEvent = event => {
  new Event({id: event.id}).fetch().then(found => found ? resolve(found.attributes): reject());
}

exports.getUserEvents = user => {
  new User({username: user.username}).fetch({withRelated: ['events']}).then(found => console.log(found) && found ? resolve(found.attributes): reject());
}

exports.getField = field => {
  new Field({id: field.id}).fetch().then(found => found ? resolve(found.attributes): reject());
}

exports.getSports = field => {
  new Field({id: field.id}).fetch({withRelated: ['sports']}).then(found => found ? resolve(found.attributes): reject());
}

exports.getMessages = event => {
  new Event({id: event.id}).fetch({withRelated: ['messages']}).then(found => found ? resolve(found.attributes): reject());
}

exports.getfieldEvents = field => {
  new Field({id: field.id}).fetch({withRelated: ['event']}).then(found => found ? resolve(found.attributes): reject());
}

exports.getVenue = venue => {
  new Venue({id: venue.id}).fetch().then(found => found ? resolve(found.attributes): reject());
}

exports.getFields = venue => {
  new Venue({id: venue.id}).fetch({withRelated: ['fields']}).then(found => found ? resolve(found.attributes): reject());
}

exports.saveVenue = venue =>
  Venues.create(venue)

// exports.saveField = field =>
//   new Promise(function(resolve, reject) {
//     Fields.create(field).then(resolve).catch(reject);
// })


// exports.saveSport = sport =>
//   new Promise(function(resolve, reject) {
//     Sports.create(sport).then(resolve).catch(reject);
// })

// exports.saveEvent = event => {
//   check conflict
//   new Promise(function)
// }

// exports.verifyField = field =>

// exports.getFieldInVenue

// exports.getEventInField

// exports.addGuest

// exports.getVenueinRange

// exports.getEvent

// exports.getMySchedule