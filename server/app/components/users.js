const util = require('../utils/utils');
const gm = require('../utils/googleMapsApi');
const db = require('../../../database/helpers');

const signup = (req, res) =>
  util.postRes(
    util
      .hashPass(req.body.password)
      .then(pass => gm.getGeoLocation((req.body.password = pass) && req.body))
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
    res,
    'username in use'
  );

const login = (req, res) =>
  db
    .getPasswordAndRole(req.body)
    //check that the password and the hashed password are the same
    .then((hash, isAdmin) => util.checkPass((req.body.role = isAdmin ? 'admin' : 'user') && req.body.password, hash))
    .then(
      matches =>
        matches
          ? //if the password matches, create the session
            req.session.regenerate(() =>
              res
                .status(200)
                .send((req.session.user = req.body.username) && (req.session.role = req.body.role) && req.session)
            )
          : //if the passwords dont match, error 422
            res.status(422).send('password doesnt match')
    )
    //if there was an issue, assume that the username was not found in the database
    .catch(err => res.status(404).send('username not found'));

const logout = (req, res) => req.session.destroy(() => res.sendStatus(200));

const getMe = (req, res) => util.getRes(db.getMe(req.session.user), res);

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.getMe = getMe;
