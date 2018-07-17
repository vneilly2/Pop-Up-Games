const bcrypt = require('bcrypt-nodejs');
const axios = require('axios');

exports.checkUser = (req, res, next) => req.session.user ? next() : res.status(301).send('login');

exports.checkAdmin = (req, res, next) => {};

exports.hashPass = pass =>
   new Promise((resolve, reject) =>
    bcrypt.hash(pass, null, null, (err, hash) =>
      err ? reject(err) : reolve(hash)));

exports.checkPass = (pass, hash) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(pass, hash, (err, matches) =>
      err ? reject(err) : resolve(matches)));