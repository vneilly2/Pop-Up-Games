const bodyParser = require('body-parser');
const util = require('./utils');
const db = require('../database/helpers.js');
const express = require('express');

const app = express();
app.use(require('express-session')({
  secret: process.env.SECRET || require('../config/config.js').SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));


//1
app.post('/signup', (req, res) => util.postRes(() =>
  //hash the password
  util.hashPass(req.body.password)
    //send the user data to the database
    .then(pass => db.saveUser((req.body.password = pass) && req.body))
//send an error message to the basic post response
, res, 'username is taken'));

app.post('/login', (req, res) =>
  //request the hashed password from the database
  db.getPassword(req.body)
    //check that the password and the hashed password are the same
    .then(hash => util.checkPass(req.body.password, hash))
    //either create the session or return a lack of a match
    .then(matches => matches
      ? req.session.regenerate(() => res.status(200).send((req.session.user = req.body.username) && req.session))
      : res.status(422).send(matches))
    //if there was an issue, assume that the username was not found in the database
    .catch(err => res.status(404).send('username not found'))
);

app.get('/logout', (req, res) => req.session.destroy(() => res.sendStatus(200)));

app.post('/event/guest', util.checkUser, (req, res) => util.postRes(() =>
  //add a guest to the event using id
  db.saveGuest((req.body.username = req.session.user) && req.body)
, res));

app.post('/event', util.checkUser, (req, res) => util.postRes(() =>
  //save an event's details
  db.saveEvent((req.body.username = req.session.user) && req.body)
, res));


app.get('/event', util.checkUser, (req, res) => util.getRes(() =>
  util.buildRes(['event', 'messages', 'guests'],
    //get all event details using id
    db.getEvent(req.body),
    //get all messages for that event
    db.getMessages(req.body),
    //get all guests currently signed up for that event
    db.getGuests(req.body))
, res));

app.get('/events', util.checkUser, (req, res) => util.getRes(() =>
  //get all of the events the current user has signed up for
  db.getMyEvents({username: req.session.user})
, res));

app.get('/field', util.checkUser, (req, res) => util.getRes(() =>
  util.buildRes(['field', 'sports', 'events'],
    //get all field data using id
    db.getField(req.body),
    //get what sports are available on that field
    db.getSports(req.body),
    //get what events are currently posted to that field
    db.getFieldEvents(req.body))
, res));

app.post('/field', util.checkUser, (req, res) => util.postRes(() =>
  //save a field's details to be accepted by an admin later
  db.saveField((req.body.username = req.session.user) && req.body)
, res));

app.get('/venue', util.checkUser, (req, res) => util.getRes((data) =>
  util.buildRes(['venue', 'fields'],
    //get all the venue data using id
    db.getVenue(req.body),
    //get the fields at that venue
    db.getFields(req.body))
    //get today's events on those fields
    .then(dataObj => (data = dataObj) && Promise.all(data.fields.map(field => db.getTodaysFieldEvents(field))))
    //input them into each field object in the fields array
    .then(fieldsEvents => new Promise(resolve =>
      resolve(fieldsEvents.forEach((events, i) => data.fields[i].todaysEvents = events) && data)))
, res));

app.post('/venue', util.checkUser, (req, res) => util.postRes(() =>
  //save a venue's details to be accepted by an admin later
  db.saveVenue((req.body.username = req.session.user) && req.body)
, res));

app.get('/venues', util.checkUser, (req, res) => util.getRes(() =>
  db.getLocation(req.session.user)
    //get the venues near the user using googlemaps api
    .then(loc => util.getVenuesNearMe(loc, db))
, res));



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