var db = require('./config');
var Users = require('./collections/users');
var User = require('./models/user');
var Fields = require('./collections/fields');
var Field = require('./models/field');
var Sports = require('./collections/sports');
var Sport = require('./models/sport');
var Events = require('./collections/events');
var Event = require('./models/event');
var Venues = require('./collections/venues');
var Venue = require('./models/venue');
var Messages = require('./collections/messages');
var Message = require('./models/message');
var moment = require('moment');

//save user to the database, input: {username, password}
exports.saveUser = user =>
  new Promise(function (resolve, reject) {
    new User({ username: user.username }).fetch().then(found => (found ? reject() : Users.create(user).then(resolve)));
  });

//update the event, eventObj : {id, eventName, sportId, date, startBlock, endBlock, notes}

exports.saveEventUpdates = (event, cb) => {
  // new Promise((resolve, reject) => {
  //   Event.query('where', 'id', '=', event.id)
  //     .fetch()
  //     .then((foundEvent) => {
  //       console.log(foundEvent);
  //       if (foundEvent) {
  //         foundEvent.set({ eventName: 'PassedNewName' }).then(resolve);
  //       } else {
  //         reject();
  //       }
  //     })
  // });

  // new Event({id: event.id})
  // .save({eventName: 'NewName'}, {patch: true})
  // .then(function(model) {
  //   cb(model);
  // })
  console.log(event);
  cb(event);
  // new Event({id :21}).fetch().then(function (model) {
  //   if (model) {
  //     model.set({eventName: 'Update'});
  //     return model.save({}, {
  //       method: 'update',
  //       patch: true
  //     })
  //   }
  // })
  // .then(function (model) {
  //   cb(model);
  // }).catch(function (err) {
  //   console.log("ERROR", err);
  // });
}

//get the password and ifadmin, input: {username}
exports.getPasswordAndRole = user =>
  new Promise(function (resolve, reject) {
    new User({ username: user.username })
      .fetch()
      .then(found => (found ? resolve(found.attributes.password, found.attributes.isAdmin) : reject()));
  });

//save the event, input: {eventName, startBlock, endBlock, Notes, date(MM/DD/YYYY),
//  minPlayer, maxPlayer, sportId, fieldId, username}
exports.saveEvent = event =>
  new Promise(function (resolve, reject) {
    var date = moment(event.date, 'MM/DD/YYYY').format('YY-MM-DD');
    Event.query(function (query) {
      query
        .where('date', date)
        .andWhere('startBlock', '<', event.endBlock)
        .andWhere('endBlock', '>', event.startBlock)
        .andWhere('fieldId', event.fieldId);
    })
      .fetchAll()
      .then(
        found =>
          JSON.parse(JSON.stringify(found)).length === 0
            ? new User({ username: event.username }).fetch().then(found => {
              event.ownerId = found.id;
              event.date = date;
              return Events.create(delete event.username && event).then(resolve);
            })
            : reject()
      );
  });

//save the sport, input: {sportName}
exports.saveSport = sport =>
  new Promise((resolve, reject) =>
    new Sport({ sportName: sport.sportName })
      .fetch()
      .then(found => (found ? reject() : Sports.create({ sportName: sport.sportName }).then(resolve)))
  );

//save the message, input: {username, eventId, body}
exports.saveMessage = message =>
  new Promise((resolve, reject) =>
    new User({ username: message.username })
      .fetch()
      .then(found => Messages.create({ userId: found.id, eventId: message.eventId, body: message.body }))
      .then(resolve)
      .catch(reject)
  );

//save the guest, input: {username, eventId}
exports.saveGuest = event =>
  new Promise((resolve, reject) =>
    new User({ username: event.username })
      .fetch()
      .then(found => new User({ id: found.id }).guestEvents().attach(new Event({ id: event.id })))
      .then(resolve)
      .catch(reject)
  );

//get the event, input: {id(id of the event)}
exports.getEvent = event =>
  new Promise(function (resolve, reject) {
    new Event({ id: event.id }).fetch().then(found => (found ? resolve(JSON.parse(JSON.stringify(found))) : reject()));
  });



//get the messages of an event, input: {id(id of the event)}
exports.getMessages = event =>
  new Promise(function (resolve, reject) {
    new Event({ id: event.id })
      .fetch({ withRelated: ['messages'] })
      .then(found => {
        var messages = JSON.parse(JSON.stringify(found.related('messages')));
        Promise.all(
          messages.map(message => {
            return new User({ id: message.userId }).fetch().then(found => {
              message.username = found.attributes.username;
              message.firstName = found.attributes.firstName;
              message.lastName = found.attributes.lastName;
              return message;
            });
          })
        ).then(messages => resolve(messages));
      })
      .catch(reject);
  });

//get the guests of an event, input: {id(id of the event)}
exports.getGuests = event =>
  new Promise(function (resolve, reject) {
    new Event({ id: event.id })
      .fetch({ withRelated: ['guests'] })
      .then(found => {
        var guests = JSON.parse(JSON.stringify(found.related('guests')));
        var gsts = guests.map(({ firstName, lastName, email, rating }) => ({ firstName, lastName, email, rating }));
        resolve(gsts);
      })
      .catch(reject);
  });

//get all events of a user, input: {username}
exports.getUserEvents = user =>
  new Promise(function (resolve, reject) {
    new User({ username: user.username })
      .fetch({ withRelated: ['events'] })
      .then(found => (found ? resolve(JSON.parse(JSON.stringify(found.related('events')))) : reject()));
  });

//save field, input: {fieldName, notes, venueId}
exports.saveField = field =>
  new Promise(function (resolve, reject) {
    Fields.create({ fieldName: field.fieldName, notes: field.notes, venueId: field.venueId })
      .then(newField =>
        Promise.all(field.sportIds.map(sportId => newField.sports().attach(new Sport({ id: sportId }))))
      )
      .then(resolve)
      .catch(reject);
  });

//get field, input: {id(id of the field)}
exports.getField = field =>
  new Promise(function (resolve, reject) {
    new Field({ id: field.id }).fetch().then(found => (found ? resolve(JSON.parse(JSON.stringify(found))) : reject()));
  });

//get all sports in a field, input: {id(id of the field)}
exports.getFieldSports = field =>
  new Promise(function (resolve, reject) {
    new Field({ id: field.id })
      .fetch({ withRelated: ['sports'] })
      .then(found => (found ? resolve(JSON.parse(JSON.stringify(found.related('sports')))) : reject()));
  });

//get all sports
exports.getAllSports = () =>
  new Promise((resolve, reject) =>
    Sport.fetchAll()
      .then(found => resolve(JSON.parse(JSON.stringify(found))))
      .catch(reject)
  );

//get all events in a field, input: {id(id of a field)}
exports.getFieldEvents = field =>
  new Promise(function (resolve, reject) {
    new Field({ id: field.id })
      .fetch({ withRelated: ['events'] })
      .then(found => (found ? resolve(JSON.parse(JSON.stringify(found.related('events')))) : reject()));
  });

//save the venue, input: {venueName, address}
exports.saveVenue = venue =>
  new Promise(function (resolve, reject) {
    Venues.create(delete venue.username && venue)
      .then(resolve)
      .catch(reject);
  });

//get the venue, input:
exports.getVenue = venue =>
  new Promise(function (resolve, reject) {
    new Venue({ id: venue.id }).fetch().then(found => (found ? resolve(JSON.parse(JSON.stringify(found))) : reject()));
  });

//get the fields, input: {id(id of the venue)}
exports.getFields = venue =>
  new Promise(function (resolve, reject) {
    new Venue({ id: venue.id })
      .fetch({ withRelated: ['fields'] })
      .then(found => (found ? resolve(JSON.parse(JSON.stringify(found.related('fields')))) : reject()));
  });

//get today's events at the field, input: {id(id of the field)}
exports.getTodaysFieldEvents = field =>
  new Promise(function (resolve, reject) {
    var today = new Date();
    new Field(field)
      .fetch({
        withRelated: [
          'events',
          {
            events: function (query) {
              query.where('date', moment().format('YYYY-MM-DD'));
            },
          },
        ],
      })
      .then(found => (found ? resolve(JSON.parse(JSON.stringify(found.related('events')))) : reject()));
  });

//get all venues within distance from the user, input: username, distance
exports.getVenuesNearUser = (user, distance) =>
  new Promise(function (resolve, reject) {
    var result = [];
    Promise.all([new User({ username: user }).fetch(), Venue.fetchAll()])
      .then(found => {
        found = JSON.parse(JSON.stringify(found));
        found[1].forEach(
          venue => withinDistance(found[0].lat, found[0].lng, venue.lat, venue.lng, distance) && result.push(venue)
        );
        resolve(result);
      })
      .catch(reject);
  });

//check whether the distance between two coordinates is within the dist
function withinDistance(lat1, lng1, lat2, lng2, dist) {
  var R = 3959;
  var x = toRad(lat1);
  var y = toRad(lat2);
  var Δφ = toRad(lat2 - lat1);
  var Δλ = toRad(lng2 - lng1);

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(x) * Math.cos(y) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  return d <= dist;
}

function toRad(Value) {
  /** Converts numeric degrees to radians */
  return (Value * Math.PI) / 180;
}

// returns all of the user info of the currently logged in user (minus the password)
exports.getMe = username =>
  new Promise(resolve =>
    new User({ username: username })
      .fetch()
      .then(found => resolve(delete found.attributes.password && found.attributes))
  );
