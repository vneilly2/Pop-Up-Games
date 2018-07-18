const bcrypt = require('bcrypt-nodejs');
const axios = require('axios');

//check to see if there is a session or not before continuing
exports.checkUser = (req, res, next) => req.session.user ? next() : res.status(401).send('login');

//check to see if the user is an admin before continuing
exports.checkAdmin = (req, res, next) => {};

//use bcrypt to hash a password
exports.hashPass = pass =>
   new Promise((resolve, reject) =>
    bcrypt.hash(pass, null, null, (err, hash) =>
      err ? reject(err) : reolve(hash)));

//use bcrypt to whether or not the password matches the hash, resolve with true or false
exports.checkPass = (pass, hash) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(pass, hash, (err, matches) =>
      err ? reject(err) : resolve(matches)));

//a basic get resovle
exports.getRes = (p, res, errMessage) => p()
  .then(data => res.status(200).send(data))
  .catch(err => res.status(400).send(errMessage || err));

//a basic post resovle
exports.postRes = (p, res, errMessage) => p()
  .then(() => res.sendStatus(201))
  .catch(err => res.status(400).send(errMessage || err));