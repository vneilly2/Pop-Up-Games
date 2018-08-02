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
    secret: process.env.SECRET || require('../../config/config').SECRET.key,
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
 * @event Address not real: 400 / data.serverMessage = 'improper address'
 * @event Username already in database: 400 / data.serverMessage = 'username in use'
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
 * @event Username doesn't exist: 404 / data.serverMessage = 'username not found'
 * @event Password doesn't match: 422 / data.serverMessage = 'password doesnt match'
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
 *  minPlayer: Number, -(Optional, default: 0)
 *  maxPlayer: Number -(Optional, default: null)
 * }
 * ===
 */
app.post('/api/event', util.checkLoggedIn, event.create);

/**
 * ===
 * @description Takes an event ID and gets all of the info of that event,
 *  its messages, and the currently signed up users for that event
 * @example {
 *  id: Number -(event id)
 * }
 * ===
 */
app.get('/api/event', util.checkLoggedIn, event.get);

/**
 * ===
 * @description Gets all of the events the user has made and signed up for
 * ===
 */
app.get('/api/events', util.checkLoggedIn, event.getMyEvents);

/**
 * ===
 * @description Takes a field ID and gets all of the info of that field,
 *  its sports, and the events on that field
 * @example {
 *  id: Number -(field id)
 * }
 * ===
 */
app.get('/api/field', util.checkLoggedIn, field.get);

/**
 * ===
 * @description Posts a field to a venue
 * @example {
 *  fieldName: String,
 *  notes: String,
 *  venueId: Number,
 *  sportIds: [Number]
 * }
 * ===
 */
app.post('/api/field', util.checkLoggedIn, field.create);

/**
 * ===
 * @description Takes a venue ID and gets all of the info of that venue,
 *  its fields, and the events on those fields for today
 * @example {
 *  id: Number -(venue id)
 * }
 * ===
 */
app.get('/api/venue', util.checkLoggedIn, venue.get);

/**
 * ===
 * @description Posts a venue after adding its geolocation to the object
 * @example {
 *  venueName: String,
 *  address: String -(street address)
 * }
 * ===
 */
app.post('/api/venue', util.checkLoggedIn, venue.create);

/**
 * ===
 * @description Gets all venues within 20 miles of the user
 * ===
 */
app.get('/api/venues', util.checkLoggedIn, venue.getVenuesNearMe);

/**
 * ===
 * @description Gets the user's info (minus the password)
 * ===
 */
app.get('/api/me', util.checkLoggedIn, user.getMe);

/**
 * ===
 * @description Gets an array of all of the sports
 * ===
 */
app.get('/api/sports', util.checkLoggedIn, sport.getAll);

/**
 * ===
 * @description Posts a sport, unique sport name
 * @example {
 *  sportName: String
 * }
 * ===
 * @event Sport name already exists: 400
 * ===
 */
app.post('/api/sports', util.checkLoggedIn, sport.create);

/**
 * ===
 * @description Posts a message to an event in the user's name
 * @example {
 *  eventId: Number,
 *  body: String -(the message text)
 * }
 * ===
 */
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
