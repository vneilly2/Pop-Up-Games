const db = process.env.NODE_ENV === 'test' ? require('./__tests__/mockDb.js') : require('../database/helpers.js');
const bodyParser = require('body-parser');
const util = require('./utils');
const express = require('express');

const app = express();
app.use(
  require('express-session')({
    secret: process.env.SECRET || require('../config/config.js').SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/../client/dist'));

//1
/**
 *  ===
 *  Takes a body {username, password, firstName, lastName, email, address}, unique username,
 *  adds geolocation using the address and returns an error is the address is improper
 *  ===
 */
app.post('/signup', (req, res) =>
  util.postRes(
    () =>
      //hash the password
      util
        .hashPass(req.body.password)
        //send the user data to the database
        .then(pass => util.getGeoLocation((req.body.password = pass) && req.body))
        .then(
          loc =>
            loc.data.results.length
              ? db.saveUser(
                  (req.body.lat = loc.data.results[0].geometry.location.lat) &&
                    (req.body.lng = loc.data.results[0].geometry.location.lng) &&
                    (req.body.address = loc.data.results[0].formatted_address) &&
                    req.body
                )
              : res.status(400).send('improper address') && null
        ),
    //send an error message to the basic post response
    res,
    'username in use'
  )
);

/* === Takes body {username, password} and creates a session or returns an error === */
app.post('/login', (req, res) =>
  //request the hashed password from the database
  db
    .getPassword(req.body)
    //check that the password and the hashed password are the same
    .then(hash => util.checkPass(req.body.password, hash))
    .then(
      matches =>
        matches
          ? //if the password matches, create the session
            req.session.regenerate(() => res.status(200).send((req.session.user = req.body.username) && req.session))
          : //if the passwords dont match, error 422
            res.status(422).send('password doesnt match')
    )
    //if there was an issue, assume that the username was not found in the database
    .catch(err => res.status(404).send('username not found'))
);

/* === Logout === */
app.get('/logout', (req, res) => req.session.destroy(() => res.sendStatus(200)));

/* === Takes in body {eventId} and adds the user to that event's guest list === */
app.post('/event/guest', util.checkUser, (req, res) =>
  util.postRes(
    () =>
      //add a guest to the event using id
      db.saveGuest((req.body.username = req.session.user) && req.body),
    res
  )
);

/**
 *  ===
 *  Takes in body {eventName, startBlock, endBlock, notes, sportName, fieldName}
 *  (optional: minPlayer, maxPlayer)
 *  ===
 */
app.post('/event', util.checkUser, (req, res) =>
  util.postRes(
    () =>
      //save an event's details
      db.saveEvent((req.body.username = req.session.user) && req.body),
    res
  )
);

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
app.get('/event', util.checkUser, (req, res) =>
  util.getRes(
    () =>
      util.buildRes(
        ['event', 'messages', 'guests'],
        //get all event details using id
        db.getEvent(req.query),
        //get all messages for that event
        db.getMessages(req.query),
        //get all guests currently signed up for that event
        db.getGuests(req.query)
      ),
    res
  )
);

/* === Gets all of the events the user has made and signed up for === */
app.get('/events', util.checkUser, (req, res) =>
  util.getRes(
    () =>
      //get all of the events the current user has signed up for
      db.getUserEvents({ username: req.session.user }),
    res
  )
);

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
app.get('/field', util.checkUser, (req, res) =>
  util.getRes(
    () =>
      util.buildRes(
        ['field', 'sports', 'events'],
        //get all field data using id
        db.getField(req.query),
        //get what sports are available on that field
        db.getSports(req.query),
        //get what events are currently posted to that field
        db.getFieldEvents(req.query)
      ),
    res
  )
);

/* === Takes in body {fieldName, notes, venueId, sports: []} === */
app.post('/field', util.checkUser, (req, res) =>
  util.postRes(
    () =>
      //save a field's details to be accepted by an admin later
      db.saveField((req.body.username = req.session.user) && req.body),
    res
  )
);

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
app.get('/venue', util.checkUser, (req, res) =>
  util.getRes(
    data =>
      util
        .buildRes(
          ['venue', 'fields'],
          //get all the venue data using id
          db.getVenue(req.query),
          //get the fields at that venue
          db.getFields(req.query)
        )
        //get today's events on those fields
        .then(dataObj => (data = dataObj) && Promise.all(data.fields.map(field => db.getTodaysFieldEvents(field))))
        //input them into each field object in the fields array
        .then(
          fieldsEvents =>
            new Promise(resolve =>
              resolve(fieldsEvents.forEach((events, i) => (data.fields[i].todaysEvents = events)) && data)
            )
        ),
    res
  )
);

/* === Takes in body {venueName, address} and adds geolocation using the address === */
app.post('/venue', util.checkUser, (req, res) =>
  util.postRes(
    () =>
      //save a venue's details to be accepted by an admin later
      util
        .getGeoLocation((req.body.username = req.session.user) && req.body)
        .then(
          loc =>
            loc.data.results.length
              ? db.saveVenue(
                  (req.body.lat = loc.data.results[0].geometry.location.lat) &&
                    (req.body.lng = loc.data.results[0].geometry.location.lng) &&
                    (req.body.address = loc.data.results[0].formatted_address) &&
                    req.body
                )
              : res.status(400).send('improper address') && null
        ),
    res
  )
);

/* === Gets the info of venues within 20 miles of the user currently logged in === */
app.get('/venues', util.checkUser, (req, res) =>
  util.getRes(
    () =>
      //get all the venues within 20 miles of the user's location
      db.getVenuesNearUser(req.session.user, 20),
    res
  )
);

/* === Gets user info of the currently logged in user, minus the password === */
app.get('/me', util.checkUser, (req, res) =>
  util.getRes(
    () =>
      //get user info
      db.getMe(req.session.user),
    res
  )
);

//2
app.delete('/event/guest', util.checkUser, (req, res) => {});

app.get('/event/guest', util.checkUser, (req, res) => {});

app.put('/event', util.checkUser, (req, res) => {});

app.put('/field', util.checkUser, (req, res) => {});

app.get('/user/events', util.checkUser, (req, res) => {});

app.get('/user/passreset', util.checkUser, (req, res) => {});

app.get('/user', util.checkUser, (req, res) => {});

app.put('/user', util.checkUser, (req, res) => {});

app.delete('/user', util.checkUser, (req, res) => {});

app.get('/sport', util.checkUser, (req, res) => {});

app.post('/sport', util.checkUser, (req, res) => {});

app.put('/sport', util.checkUser, (req, res) => {});

app.delete('/sport', util.checkUser, (req, res) => {});

//3
app.put('/sportsmerge', util.checkUser, (req, res) => {});

app.put('/venuemerge', util.checkUser, (req, res) => {});

app.put('/fieldmerge', util.checkUser, (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port: ', port));
