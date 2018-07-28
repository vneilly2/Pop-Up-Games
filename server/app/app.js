const bodyParser = require('body-parser');
const util = require('./utils/utils');
const express = require('express');

const user = require('./components/users');
const event = require('./components/events');
const field = require('./components/fields');
const venue = require('./components/venues');
const sport = require('./components/sports');

const app = express();
app.use(
  require('express-session')({
    secret: process.env.SECRET || require('../../config/config').SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(__dirname + '/../../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.disable('x-powered-by');

//1
/**
 * ===
 * @description Unique username, Adds geolocation using the address
 * @example {
 *  username: String,
 *  password: String,
 *  firstName: String,
 *  lastName: String,
 *  email: String,
 *  address: String -(street address)
 * }
 * ===
 * @event Address not real: 400 'improper address'
 * @event Username already in database: 400 'username in use'
 * ===
 */
app.post('/api/signup', user.signup);

/**
 * ===
 * @description Creates a session
 * @example {
 *  username: String,
 *  password: String
 * }
 * ===
 * @returns Session object
 * @event Username doesn't exist: 404 'username not found'
 * @event Password doesn't match: 422 'password doesnt match'
 * ===
 */
app.post('/api/login', user.login);

/**
 * ===
 * @description Logout
 * ===
 */
app.get('/api/logout', user.logout);

/**
 * ===
 * @description Adds the user to an event's guest list
 * @example {
 *  id: Number -(event id)
 * }
 * ===
 */
app.post('/api/event/guest', util.checkLoggedIn, event.addMeToEvent);

/**
 * ===
 * @description Posts an event in the user's name
 * @example {
 *  eventName: String,
 *  startBlock: Number, -(1 - 48)
 *  endBlock: Number, -(1 - 48)
 *  notes: String,
 *  sportId: Number,
 *  fieldId: Number,
 *  date: Date,
 *  minPlayer: Number, -(Optional, default 0)
 *  maxPlayer: Number -(Optional, default null)
 * }
 * ===
 */
app.post('/api/event', util.checkLoggedIn, event.create);

/**
 *  ===
 *  Takes in queryies {id} (event id) and gets all of the info of that event,
 *  its messages, and the currently signed up users for that event
 *  ===
 *  data: {
 *    event: {}
 *    messages: [{}]
 *    guests: [{}]
 *  }
 */
app.get('/api/event', util.checkLoggedIn, event.get);

/* === Gets all of the events the user has made and signed up for === */
app.get('/api/events', util.checkLoggedIn, event.getMyEvents);

/**
 *  ===
 *  Takes in queryies {id} (field id) and gets all of the info of that field,
 *  its sports, and the events on that field
 *  ===
 *  data: {
 *    field: {}
 *    sports: []
 *    events: [{}]
 *  }
 */
app.get('/api/field', util.checkLoggedIn, field.get);

/* === Takes in body {fieldName, notes, venueId, sportIds: []} === */
app.post('/api/field', util.checkLoggedIn, field.create);

/**
 *  ===
 *  Takes in queries {id} (venue id) and gets all of the info of that venue,
 *  its fields, and the events on those fields for today
 *  ===
 *  data: {
 *    venue: {}
 *    fields: [{
 *      todaysEvents: [{}]
 *    }]
 *  }
 */
app.get('/api/venue', util.checkLoggedIn, venue.get);

/* === Takes in body {venueName, address} and adds geolocation using the address === */
app.post('/api/venue', util.checkLoggedIn, venue.create);

/* === Gets the info of venues within 20 miles of the user currently logged in === */
app.get('/api/venues', util.checkLoggedIn, venue.getVenuesNearMe);

/* === Gets user info of the currently logged in user, minus the password === */
app.get('/api/me', util.checkLoggedIn, user.getMe);

//none
app.get('/api/sports', util.checkLoggedIn, sport.getAll);

//{sportName}
app.post('/api/sports', util.checkLoggedIn, sport.create);

// {eventId, body}
app.post('/api/message', util.checkLoggedIn, event.addMessage);

//2
app.delete('/api/event/guest');

app.get('/api/event/guest');

app.put('/api/event');

app.put('/api/field');

app.get('/api/user/events');

app.get('/api/user/passreset');

app.get('/api/user');

app.put('/api/user');

app.delete('/api/user');

app.put('/api/sport');

app.delete('/api/sport');

//3
app.put('/api/sportsmerge');

app.put('/api/venuemerge');

app.put('/api/fieldmerge');

//serve static files if no endpoint is found (for refreshing)
app.get('/*', util.redirectToHome);
module.exports = app;
