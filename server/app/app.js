const bodyParser = require('body-parser');
const util = require('./utils/utils');
const express = require('express');

const user = require('./components/users');
const event = require('./components/events');
const field = require('./components/fields');
const venue = require('./components/venues');

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
 *  ===
 *  Takes a body {username, password, firstName, lastName, email, address}, unique username,
 *  adds geolocation using the address and returns an error is the address is improper
 *  ===
 */
app.post('/signup', user.signup);

/* === Takes body {username, password} and creates a session or returns an error === */
app.post('/login', user.login);

/* === Logout === */
app.get('/logout', user.logout);

/* === Takes in body {eventId} and adds the user to that event's guest list === */
app.post('/event/guest', util.checkLoggedIn, event.addMeToEvent);

/**
 *  ===
 *  Takes in body {eventName, startBlock, endBlock, notes, sportName, fieldName}
 *  (optional: minPlayer, maxPlayer)
 *  ===
 */
app.post('/event', util.checkLoggedIn, event.create);

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
app.get('/event', util.checkLoggedIn, event.get);

/* === Gets all of the events the user has made and signed up for === */
app.get('/events', util.checkLoggedIn, event.getMyEvents);

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
app.get('/field', util.checkLoggedIn, field.get);

/* === Takes in body {fieldName, notes, venueId, sports: []} === */
app.post('/field', util.checkLoggedIn, field.create);

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
app.get('/venue', util.checkLoggedIn, venue.get);

/* === Takes in body {venueName, address} and adds geolocation using the address === */
app.post('/venue', util.checkLoggedIn, venue.create);

/* === Gets the info of venues within 20 miles of the user currently logged in === */
app.get('/venues', util.checkLoggedIn, venue.getVenuesNearMe);

/* === Gets user info of the currently logged in user, minus the password === */
app.get('/me', util.checkLoggedIn, user.getMe);

//2
app.delete('/event/guest');

app.get('/event/guest');

app.put('/event');

app.put('/field');

app.get('/user/events');

app.get('/user/passreset');

app.get('/user');

app.put('/user');

app.delete('/user');

app.get('/sport');

app.post('/sport');

app.put('/sport');

app.delete('/sport');

//3
app.put('/sportsmerge');

app.put('/venuemerge');

app.put('/fieldmerge');

module.exports = app;
