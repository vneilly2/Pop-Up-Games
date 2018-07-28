const util = require('../app/utils/utils');
const { makeResObj } = require('./testHelpers');

jest.mock('bcrypt-nodejs');
const bcrypt = require('bcrypt-nodejs');

describe('Utils', () => {
  test('should check to see if a session is active', () => {
    let res = makeResObj(401, 'user not logged in');
    let reqLoggedIn = { session: { user: 'user' } };
    let reqNotLoggedIn = { session: {} };
    let next = () => expect(true).toBeTruthy();

    util.checkLoggedIn(reqLoggedIn, res, next);
    util.checkLoggedIn(reqNotLoggedIn, res, next);
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
    bcrypt.hash = (val, salt, during, cb) => cb(null, val + ' hashed');
    let hash = await util.hashPass('monkey');
    expect(hash).toEqual('monkey hashed');
  });

  test('should compare passwords', async () => {
    bcrypt.compare = (pass, hash, cb) => cb(null, pass + ' hashed' === hash);
    let doesMatch = await util.checkPass('monkey', 'monkey hashed');
    let doesNotMatch = await util.checkPass('snake', 'monkey hashed');
    expect(doesMatch).toBeTruthy();
    expect(doesNotMatch).toBeFalsy();
  });

  describe('Get Response', () => {
    let promiseA = data => new Promise(resolve => resolve(data));
    let promiseB = err => new Promise((resolve, reject) => reject(err));

    test('should respond with a default code', async () => {
      let res = makeResObj(200, 'A');
      await util.getRes(promiseA('A'), res);
    });

    test('should respond with a custom code', async () => {
      let res = makeResObj(204, 'A');
      await util.getRes(promiseA('A'), res, 'err', 204, 404);
    });

    test('should respond an error with a default code', async () => {
      let res = makeResObj(400, { error: 'B' });
      await util.getRes(promiseB('B'), res);
    });

    test('should respond an error with a custom code and message', async () => {
      let res = makeResObj(404, { serverMessage: 'err', error: 'B' });
      await util.getRes(promiseB('B'), res, 'err', 204, 404);
    });
  });

  describe('Post Response', () => {
    let promiseA = data => new Promise(resolve => resolve(data));
    let promiseB = err => new Promise((resolve, reject) => reject(err));

    test('should respond with a default code', async () => {
      let res = makeResObj(201, 'Not A');
      await util.postRes(promiseA('A'), res);
    });

    test('should respond with a custom code', async () => {
      let res = makeResObj(204, 'Not A');
      await util.postRes(promiseA('A'), res, 'err', 204, 404);
    });

    test('should respond an error with a default code', async () => {
      let res = makeResObj(400, 'B');
      await util.postRes(promiseB('B'), res);
    });

    test('should respond an arror with a custom code', async () => {
      let res = makeResObj(404, { serverMessage: 'err', error: 'B' });
      await util.postRes(promiseB('B'), res, 'err', 204, 404);
    });

    test('should not respond at all when given a data of null (for when a response has already been sent)', async () => {
      let promiseC = data => new Promise(resolve => resolve(data));
      let res = makeResObj('Not 201', 'Not Null');
      await util.postRes(promiseC(null), res);
    });
  });

  test('should build a response from multiple promises (must have getRes and postRes passing to pass)', async () => {
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
});
