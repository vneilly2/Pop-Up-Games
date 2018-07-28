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
var Messages = require("./collections/messages");
var Message = require("./models/message");
var moment = require('moment');

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
    var today = new Date(event.date);
    today.setHours(0,0,0);
    var endOfDay = new Date(event.date);
    endOfDay.setHours(23,59,59);

    Event.query(function (query) {
      query.whereBetween('date', [today, endOfDay])
      .andWhere(function(query) {
        query.whereBetween('startBlock', [event.startBlock, event.endBlock])
        .orWhereBetween('endBlock', [event.startBlock, event.endBlock]);
      })
    }).fetchAll().then(found => console.log(JSON.parse(JSON.stringify(found))) || JSON.parse(JSON.stringify(found)).length === 0 ? new User({username: event.username}).fetch().then(found => {
      event.ownerId = found.id;
      return Events.create(delete event.username && event).then(resolve);
      }) : reject()
    )
})

exports.saveSport = sport =>
  new Promise((resolve, reject) =>
    new Sport({sportName: sport.sportName}).fetch().then(found => found ? reject() : Sports.create({sportName: sport.sportName}).then(resolve))
  )

exports.saveMessage = message =>
  new Promise((resolve, reject) =>
    new User({username: message.username}).fetch().then(found => Messages.create({userId: found.id, eventId: message.eventId, body: message.body})).then(resolve).catch(reject))

exports.saveGuest = event =>
  new Promise((resolve, reject) =>
    new User({username: event.username}).fetch().then(found => new User({id: found.id}).guestEvents().attach(new Event({id: event.id}))).then(resolve).catch(reject)
  )

exports.getEvent = event =>
  new Promise(function(resolve, reject) {
    new Event({id: event.id}).fetch().then(found => found ? resolve(JSON.parse(JSON.stringify(found))): reject());
  })

exports.getMessages = event =>
  new Promise(function(resolve, reject) {
    new Event({id: event.id}).fetch({withRelated: ['messages']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("messages")))) : reject());
})

exports.getGuests = event => console.log(event) ||
  new Promise(function(resolve, reject) {
    new Event({id: event.id}).fetch({withRelated: ['guests']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("guests")))) : reject());
})

exports.getUserEvents = user =>
  new Promise(function(resolve, reject) {
    new User({username: user.username}).fetch({withRelated: ['events']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("events")))) : reject());
})

exports.saveField = field => console.log(field) ||
  new Promise(function(resolve, reject) {
    Fields.create({fieldName: field.fieldName, notes: field.notes, venueId: field.venueId}).then(newField => Promise.all(field.sportIds.map(sportId => newField.sports().attach(new Sport({id: sportId}))))).then(resolve).catch(reject);
    })

exports.getField = field =>
  new Promise(function(resolve, reject) {
    new Field({id: field.id}).fetch().then(found => found ? resolve(JSON.parse(JSON.stringify(found))): reject());
  })

exports.getFieldSports = field =>
  new Promise(function(resolve, reject) {
    new Field({id: field.id}).fetch({withRelated: ['sports']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("sports")))) : reject());
  })

exports.getAllSports = () =>
    new Promise((resolve, reject) => Sport.fetchAll().then(found => resolve(JSON.parse(JSON.stringify(found))).catch(reject)));

exports.getFieldEvents = field =>
  new Promise(function(resolve, reject) {
    new Field({id: field.id}).fetch({withRelated: ['events']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related("events")))) : reject());
})

exports.saveVenue = venue =>
  new Promise(function(resolve, reject) {
      Venues.create(delete venue.username && venue).then(resolve).catch(reject);
    })

exports.getVenue = venue =>
  new Promise(function(resolve, reject) {
    new Venue({id: venue.id}).fetch().then(found => found ? resolve(JSON.parse(JSON.stringify(found))) : reject());
  })

exports.getFields = venue =>
  new Promise(function(resolve, reject) {
    new Venue({id: venue.id}).fetch({withRelated: ['fields']}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related('fields')))) : reject());
  })

exports.getTodaysFieldEvents = field =>
  new Promise(function(resolve, reject) {
    var today = new Date();
    today.setHours(0,0,0);
    var endOfDay = new Date()
    endOfDay.setHours(23,59,59);
    new Field(field).fetch({withRelated: ['events', {events:function (query) {
        query.whereBetween('date', [today, endOfDay]);
      }
    }]}).then(found => found ? resolve(JSON.parse(JSON.stringify(found.related('events')))) : reject());
  })

exports.getVenuesNearUser = (user, distance) =>
  new Promise(function(resolve, reject) {
    var result = [];
    Promise.all([new User({username: user}).fetch(), Venue.fetchAll()])
    .then(found => {
      found = JSON.parse(JSON.stringify(found));
      found[1].forEach(venue => withinDistance(found[0].lat, found[0].lng, venue.lat, venue.lng, distance) && result.push(venue));
      resolve(result);
    }).catch(reject);
})

function withinDistance(lat1, lng1, lat2, lng2, dist) {
  var R = 3959;
  var x = toRad(lat1);
  var y = toRad(lat2);
  var Δφ = toRad(lat2 - lat1);
  var Δλ = toRad(lng2 - lng1);

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(x) * Math.cos(y) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d <= dist;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

// returns all of the user info of the currently logged in user (minus the password)
exports.getMe = username => new Promise(resolve =>
  new User({username: username}).fetch()
    .then(found => resolve((delete found.attributes.password) && found.attributes)));

