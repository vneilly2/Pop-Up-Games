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
    new User({username: user.username}).fetch().then(found => found ? console.log(found) && reject() : Users.create(user).then(resolve))
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
    new Event({id: event.id}).fetch().then(found => found ? resolve(JSON.parse(JSON.stringify(found))): reject());
  })

exports.getMessages = event =>
  new Promise(function(resolve, reject) {
    new Event({id: event.id}).fetch({withRelated: ['messages']}).then(found => found ? console.log(found) && resolve(JSON.parse(JSON.stringify(found.related("messages")))) : reject());
})

// exports.getGuests = event =>
//   new Promise(function(resolve, reject) {
//     new Event({id: event.id}).fetch({withRelated: ['guests']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("guests")))) : reject());
// })

// exports.getUserEvents = user =>
//   new Promise(function(resolve, reject) {
//     new User({username: user.username}).fetch({withRelated: ['events']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("events")))) : reject());
// })

// exports.getField = event =>
//   new Promise(function(resolve, reject) {
//     new Field({id: field.id}).fetch().then(found => found ? resolve(JSON.parse(JSON.stringify(found))): reject());
//   })

// exports.getSports = field =>
//   new Promise(function(resolve, reject) {
//     new Field({id: field.id}).fetch(withRelated: ['sports']).then(found => found ? resolve(JSON.parse(JSON.stringify(found))) : reject());
//   })

// exports.getVenue = venue =>
//   new Promise(function(resolve, reject) {
//     new Venue({id: venue.id}).fetch().then(found => found ? resolve(JSON.parse(JSON.stringify(found))): reject());
//   })

// exports.getFieldEvents = field =>
//   new Promise(function(resolve, reject) {
//     new Field({id: field.id}).fetch({withRelated: ['event']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("events")))) : reject());
// })

// exports.getVenueFields = venue => {
//   new Promise(function(resolve, reject) {
//     new Venue({id: venue.id}).fetch({withRelated: ['fields']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found))): reject());
//   })

// exports.saveVenue = venue =>
//   new Promise(function(resolve, reject) {
//       venues.create(venue).then(resolve) : reject();
//     })

// exports.getGuests = event =>
//   new Promise(function(resolve, reject) {
//     new Events({id: field.id}).fetch({withRelated: ['']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("events")))) : reject());
// })

// exports.saveGuest = guest =>
//   new Promise(function(resolve, reject) {
//     new ({id: event.id}).fetch().then(found => found ? console.log(JSON.stringify(found)) && resolve(JSON.parse(JSON.stringify(found))): reject());
//   })

// exports.getVenuesNearUser = distance =>
//   new Promise(function(resolve, reject) {
//     new ({id: }).fetch({withRelated: }).then(found => found ? )
//   }

// returns all of the user info of the currently logged in user (minus the password)
exports.getMe = username => new Promise(resolve =>
  new User({username: username}).fetch()
    .then(found => resolve((delete found.attributes.password) && found.attributes)));