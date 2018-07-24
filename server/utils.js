const bcrypt = require('bcrypt-nodejs');
const axios = require('axios');

//check to see if there is a session or not before continuing
exports.checkUser = (req, res, next) => req.session.user ? next() : res.status(401).send('user not logged in');

//check to see if the user is an admin before continuing
exports.checkAdmin = (req, res, next) => {};

//use bcrypt to hash a password
exports.hashPass = pass =>
   new Promise((resolve, reject) =>
    bcrypt.hash(pass, null, null, (err, hash) =>
      err ? reject(err) : resolve(hash)));

//use bcrypt to whether or not the password matches the hash, resolve with true or false
exports.checkPass = (pass, hash) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(pass, hash, (err, matches) =>
      err ? reject(err) : resolve(matches)));

//use googlemaps api (limited to 2500 uses per day so you dont get charged) to get the lat and lng for the address
exports.getGeoLocation = ({address}) =>
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {
    address: address,
    key: process.env.GMAPS_API || require('../config/config.js').GMAPS_API
  }})

//a way to build a response object across multiple promises
exports.buildRes = (types, ...ps) => new Promise((resolve, reject) =>
  Promise.all(ps)
    .then(datas => resolve(datas.reduce((ouput, data, i) => (output[types[i]] = data) && output, {})))
    .catch(reject))

//a basic get resovle
exports.getRes = (p, res, errMessage, successStatus = 200, errStatus = 400) => p()
  .then(data => res.status(successStatus).send(data))
  .catch(err => res.status(errStatus).send(errMessage || err));

//a basic post resovle
exports.postRes = (p, res, errMessage, successStatus = 201, errStatus = 400) => p()
  .then(() => res.sendStatus(successStatus))
  .catch(err => res.status(errStatus).send(errMessage || err));