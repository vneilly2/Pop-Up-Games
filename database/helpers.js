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

exports.getPasswordAndRole = user =>
  new Promise(function(resolve, reject) {
    new User({username: user.username}).fetch().then(found => found ? resolve(found.attributes.password, found.attributes.isAdmin) : reject());
})

// exports.saveEvent = event =>
//   new User({username: event.username}).fetch()
//     .then(user => console.log(user) && Events.create((delete event.username) && (event.ownerId = user.id) && event))

exports.saveEvent = event =>
  new Promise(function(resolve, reject) {
    new User({username: event.username}).fetch().then(found => {
      event.ownerId = found.id;
      return found ? Events.create(delete event.username && event).then(resolve) : reject();
    })
})

// exports.saveEvent = event =>
//   new User({username: event.username}).fetch().then(found => {
//     event.ownerId = found.id;
//     return Events.create(event.username && event);
// })



exports.getEvent = event =>
  new Promise(function(resolve, reject) {
    new Event({id: event.id}).fetch().then(found => found ? console.log(JSON.stringify(found)) && resolve(JSON.parse(JSON.stringify(found))): reject());
  })

exports.getMessages = event =>
  new Promise(function(resolve, reject) {
    new Event({id: event.id}).fetch({withRelated: ['messages']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("messages")))) : reject());
})

exports.getGuests = event =>
  new Promise(function(resolve, reject) {
    new Event({id: event.id}).fetch({withRelated: ['guests']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("guests")))) : reject());
})

exports.getUserEvents = user =>
  new Promise(function(resolve, reject) {
    new User({username: user.username}).fetch({withRelated: ['events']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("events")))) : reject());
})


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

// returns all of the user info of the currently logged in user (minus the password)
exports.getMe = username => new Promise(resolve =>
  new User({username: username}).fetch()
    .then(found => resolve((delete found.attributes.password) && found.attributes)));