const sport = require('../app/components/sports');
const { makeResObj } = require('./testHelpers');

jest.mock('../../database/helpers');
const db = require('../../database/helpers');

describe('Sport Related Middleware', () => {
  test('should send an array of all sports to the client', async () => {
    db.getAllSports = () =>
      new Promise(resolve => {
        let sport1 = { id: 1, sportName: 'soccer' };
        let sport2 = { id: 2, sportName: 'football' };
        resolve([sport1, sport2]);
      });
    let res = makeResObj(200, [{ id: 1, sportName: 'soccer' }, { id: 2, sportName: 'football' }]);
    await sport.getAll({}, res);
  });

  test('should send the sport to the database to be added', async () => {
    db.saveSport = sport =>
      new Promise(resolve => {
        expect(sport.sportName).toEqual('soccer');
        resolve();
      });
    let res = makeResObj(201);
    let req = { body: { sportName: 'soccer' } };
    await sport.create(req, res);
  });
});
