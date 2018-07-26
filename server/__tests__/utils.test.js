const util = require('../utils.js');

jest.mock('bcrypt-nodejs');
const bcrypt = require('bcrypt-nodejs');

describe('Utils', () => {
  const makeResObj = (statusNum, response) => ({
    status: status => {
      expect(status).toEqual(statusNum);
      return {
        send: data => {
          expect(data).toEqual(response);
        },
      };
    },
    sendStatus: status => {
      expect(status).toEqual(statusNum);
    },
  });

  test('should check to see if a session is active', () => {
    let res = makeResObj(401, 'user not logged in');
    let reqLoggedIn = { session: { user: 'user' } };
    let reqNotLoggedIn = { session: {} };
    let next = () => expect(true).toBeTruthy();

    util.checkUser(reqLoggedIn, res, next);
    util.checkUser(reqNotLoggedIn, res, next);
  });

  test('should check to see if the active user in an admin', () => {
    let res = makeResObj(401, 'user not an admin');
    let reqIsAdmin = { session: { role: 'admin' } };
    let reqIsNotAdmin = { session: { role: 'user' } };
    let next = () => expect(true).toBeTruthy();

    util.checkAdmin(reqIsAdmin, res, next);
    util.checkAdmin(reqIsNotAdmin, res, next);
  });

  test('should hash passwords', async () => {
    bcrypt.hash = (val, salt, during, cb) => cb(null, val);
    let hash = await util.hashPass('monkey');
    expect(hash).toEqual('monkey');
  });

  test('should compare passwords', async () => {
    bcrypt.compare = (pass, hash, cb) => cb(null, pass === hash);
    let doesMatch = await util.checkPass('monkey', 'monkey');
    let doesNotMatch = await util.checkPass('snake', 'monkey');
    expect(doesMatch).toBeTruthy();
    expect(doesNotMatch).toBeFalsy();
  });

  test('should build a response from multiple promises', async () => {
    let promiseA = data => new Promise(resolve => resolve({ dataA: data }));
    let promiseB = data => new Promise(resolve => resolve([{ dataB: [data] }]));
    let builtResObj = await util.buildRes(['typeA', 'typeB'], promiseA('A'), promiseB('B'));
    let expected = { typeA: { dataA: 'A' }, typeB: [{ dataB: ['B'] }] };
    expect(builtResObj).toEqual(expected);

    let res = makeResObj(200, expected);
    await util.getRes(util.buildRes(['typeA', 'typeB'], promiseA('A'), promiseB('B')), res);
    res = makeResObj(201, expected);
    await util.postRes(util.buildRes(['typeA', 'typeB'], promiseA('A'), promiseB('B')), res);
  });

  test('should respond', async () => {
    let promiseA = data => new Promise(resolve => resolve(data));
    let promiseB = err => new Promise((resolve, reject) => reject(err));
    let res = makeResObj(200, 'A');
    await util.getRes(promiseA('A'), res);

    res = makeResObj(204, 'A');
    await util.getRes(promiseA('A'), res, 'err', 204, 404);

    res = makeResObj(400, 'B');
    await util.getRes(promiseB('B'), res);

    res = makeResObj(404, 'err');
    await util.getRes(promiseB('B'), res, 'err', 204, 404);
  });

  test('should post', async () => {
    let promiseA = data => new Promise(resolve => resolve(data));
    let promiseB = err => new Promise((resolve, reject) => reject(err));
    let res = makeResObj(201, 'Not A');
    await util.postRes(promiseA('A'), res);

    res = makeResObj(204, 'Not A');
    await util.postRes(promiseA('A'), res, 'err', 204, 404);

    res = makeResObj(400, 'B');
    await util.postRes(promiseB('B'), res);

    let promiseC = data => new Promise(resolve => resolve(data));
    res = makeResObj('Not 201', 'Not Null');
    await util.postRes(promiseC(null), res);
  });
});
