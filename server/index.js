const bodyParser = require('body-parser');
const utils = require('./utils');
const db = require('../db/index.js');
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
app.post('/signup', (req, res) => {

});

app.post('/login', (req, res) => {
  req.session.regenerate(() => res.status(200).send(req.session.user = req.body.username));
});

app.get('/logout', (req, res) => req.session.destroy(() => res.sendStatus(200)));

app.post('/event/guest', util.checkUser, (req, res) => {

});

app.post('/event', util.checkUser, (req, res) => {

});

app.get('/event', util.checkUser, (req, res) => {

});

app.get('/events', util.checkUser, (req, res) => {

});

app.get('/field', util.checkUser, (req, res) => {

});

app.post('/field', util.checkUser, (req, res) => {

});

app.get('/venue', util.checkUser, (req, res) => {

});

app.post('/venue', util.checkUser, (req, res) => {

});



//2
app.delete('/event/guest', util.checkUser, (req, res) => {

});

app.get('/event/guest', util.checkUser, (req, res) => {

});

app.put('/event', util.checkUser, (req, res) => {

});

app.put('/field', util.checkUser, (req, res) => {

});

app.get('/user/events', util.checkUser, (req, res) => {

});

app.get('/user/passreset', util.checkUser, (req, res) => {

});

app.get('/user', util.checkUser, (req, res) => {

});

app.put('/user', util.checkUser, (req, res) => {

});

app.delete('/user', util.checkUser, (req, res) => {

});

app.get('/sport', util.checkUser, (req, res) => {

});

app.post('/sport', util.checkUser, (req, res) => {

});

app.put('/sport', util.checkUser, (req, res) => {

});

app.delete('/sport', util.checkUser, (req, res) => {

});



//3
app.put('/sportsmerge', util.checkUser, (req, res) => {

});

app.put('/venuemerge', util.checkUser, (req, res) => {

});

app.put('/fieldmerge', util.checkUser, (req, res) => {

});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port: ', port));