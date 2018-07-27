const field = require('../app/components/fields');
const { makeResObj } = require('./testHelpers');

jest.mock('../../database/helpers');
const db = require('../../database/helpers');

describe('Field Related Middleware', () => {
  test('should create a reponse object with the event details, its messages, and its guest list', async () => {
    db.getField = ({ id }) =>
      new Promise(resolve => {
        let field = { id: id, fieldData: 'field data' };
        resolve(field);
      });
    db.getSports = ({ id }) =>
      new Promise(resolve => {
        if (!id) resolve([]);
        resolve(['soccer', 'football']);
      });
    db.getFieldEvents = ({ id }) =>
      new Promise(resolve => {
        let event1 = { id: id, eventData: 'event 1 data' };
        let event2 = { id: id, eventData: 'event 2 data' };
        resolve([event1, event2]);
      });
    let response = {
      field: { id: 'id', fieldData: 'field data' },
      sports: ['soccer', 'football'],
      events: [{ id: 'id', eventData: 'event 1 data' }, { id: 'id', eventData: 'event 2 data' }],
    };
    let res = makeResObj(200, response);
    let req = { query: { id: 'id' } };
    await field.get(req, res);
  });

  test('should use the session yser to add an event with me as the owner', async () => {
    db.saveField = data =>
      new Promise(resolve => {
        expect(data).toEqual({ username: 'user', otherData: 'other data' });
        resolve(data);
      });
    let res = makeResObj(201);
    let req = { body: { otherData: 'other data' }, session: { user: 'user' } };
    await field.create(req, res);
  });
});
