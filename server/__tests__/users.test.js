const user = require('../app/components/users');
const { makeResObj } = require('./testHelpers');

jest.mock('../../database/helpers');
const db = require('../../database/helpers');

jest.mock('../app/utils/googleMapsApi');
const gm = require('../app/utils/googleMapsApi');

jest.mock('bcrypt-nodejs');
const bcrypt = require('bcrypt-nodejs');

describe('User Related Middleware', () => {
  describe('Signup', () => {
    bcrypt.hash = (val, salt, during, cb) => cb(null, val + ' hashed');
    gm.getGeoLocation = ({ address }) =>
      new Promise(resolve => {
        let response = { data: { results: [] } };
        if (address !== 'bad address') {
          response.data.results.push({
            geometry: { location: { lat: 'lat', lng: 'lng' } },
            formatted_address: address + ' formated',
          });
        }
        resolve(response);
      });
    let expectedData = {
      lat: 'lat',
      lng: 'lng',
      password: 'monkey hashed',
      username: 'username',
      address: 'good address formated',
    };
    db.saveUser = data =>
      new Promise((resolve, reject) => {
        if (data === 'not unique') {
          reject(data);
        } else {
          expect(data).toEqual(expectedData);
          resolve(data);
        }
      });

    test('should send a formed object to the user table', async () => {
      let res = makeResObj(201);
      let goodObj = { body: { username: 'username', password: 'monkey', address: 'good address' } };
      await user.signup(goodObj, res);
    });

    test('should respond an error if the username is taken', async () => {
      let errorMessage = 'username in use';
      let res = makeResObj(400, errorMessage);
      let usernameTaken = { body: { username: 'not unique', password: 'monkey', address: 'good address' } };
      await user.signup(usernameTaken, res);
    });

    test('should respond an error if the address is not an address', async () => {
      let errorMessage = 'improper address';
      let res = makeResObj(400, errorMessage);
      let badAddress = { body: { username: 'username', password: 'monkey', address: 'bad address' } };
      await user.signup(badAddress, res);
    });
  });

  describe('Login', () => {
    bcrypt.compare = (pass, hash, cb) => cb(null, pass + ' hashed' === hash);
    db.getPasswordAndRole = ({ username }) =>
      new Promise((resolve, reject) => {
        if (username === 'exists') {
          resolve('monkey hashed', false);
        } else {
          reject(username);
        }
      });

    test('should log in if the username exists and the password matches', async () => {
      let req = { body: { username: 'exists', password: 'monkey' }, session: { regenerate: cb => cb() } };
      let succuessfulSessionCreation = { regenerate: req.session.regenerate, user: 'exists', role: 'user' };
      let res = makeResObj(200, succuessfulSessionCreation);
      await user.login(req, res);
    });

    test("should respond an error if the username doesn't exist", async () => {
      let errorMessage = 'username not found';
      let req = { body: { username: "doesn't exist", password: 'monkey' } };
      let res = makeResObj(404, errorMessage);
      await user.login(req, res);
    });

    test('should respond an error if the password is incorrect', async () => {
      let errorMessage = 'password doesnt match';
      let req = { body: { username: 'exists', password: 'snake' } };
      let res = makeResObj(422, errorMessage);
      await user.login(req, res);
    });
  });

  test('should logout', async () => {
    let req = { session: { destroy: cb => cb() } };
    let res = makeResObj(200);
    await user.logout(req, res);
  });

  test('should return user data of the currently logged in user', async () => {
    db.getMe = username => new Promise(resolve => resolve({ username: username, otherData: 'other data' }));
    let req = { session: { user: 'user' } };
    let res = makeResObj(200, { username: 'user', otherData: 'other data' });
    await user.getMe(req, res);
  });
});
