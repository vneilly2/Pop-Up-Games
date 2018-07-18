const bodyParser = require('body-parser');
const utils = require('./utils');
const db = require('../database/helpers.js');
const app = require('express')();
app.use(require('express-session')({
  secret: process.env.SECRET || require('../config/config.js').SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '../client/dist'));


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
  db.getPass(req.body)
    //check that the password and the hashed password are the same
    .then(hash => util.checkPass(req.body.password, hash))
    //either create the session or return a lack of a match
    .then(matches => matches
      ? req.session.regenerate(() => res.status(200).send(req.session.user = req.body.username))
      : res.status(422).send(matches))
    //if there was an issue, assume that the username was not found in the database
    .catch(err => app.status(404).send('username not found'))
);

app.get('/logout', (req, res) => req.session.destroy(() => res.sendStatus(200)));

app.post('/event/guest', util.checkUser, (req, res) => util.postRes(() =>
  //add a quest to the event
  db.saveGuest({
    event: req.body.eventName,
    guest: req.session.user
  })
, res));

app.post('/event', util.checkUser, (req, res) => util.postRes(() =>
  db.saveEvent((req.body.username = req.session.user) && req.body)
, res));

app.get('/event', util.checkUser, (req, res) => util.getRes(() =>
  db.getEvent({

  })
, res));

app.get('/events', util.checkUser, (req, res) => util.getRes(() =>
  db.getEvents({

  })
, res));

app.get('/field', util.checkUser, (req, res) => util.getRes(() =>
  db.getField({

  })
, res));

app.post('/field', util.checkUser, (req, res) => util.postRes(() =>
  db.saveField({

  })
, res));

app.get('/venue', util.checkUser, (req, res) => util.getRes(() =>
  db.getVenue({

  })
, res));

app.post('/venue', util.checkUser, (req, res) => util.postRes(() =>
  db.saveVenue({

  })
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