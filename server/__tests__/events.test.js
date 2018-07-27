const event = require('../app/components/events');
const { makeResObj } = require('./testHelpers');

jest.mock('../../database/helpers');
const db = require('../../database/helpers');

describe('Event Related Middleware', () => {
  test('should use the session user to add me to the event', async () => {
    db.saveGuest = data =>
      new Promise(resolve => {
        expect(data).toEqual({ username: 'user', otherData: 'other data' });
        resolve(data);
      });
    let res = makeResObj(201);
    let req = { body: { otherData: 'other data' }, session: { user: 'user' } };
    await event.addMeToEvent(req, res);
  });

  test('should use the session yser to add an event with me as the owner', async () => {
    db.saveEvent = data =>
      new Promise(resolve => {
        expect(data).toEqual({ username: 'user', otherData: 'other data' });
        resolve(data);
      });
    let res = makeResObj(201);
    let req = { body: { otherData: 'other data' }, session: { user: 'user' } };
    await event.create(req, res);
  });

  test('should create a reponse object with the event details, its messages, and its guest list', async () => {
    db.getEvent = ({ id }) =>
      new Promise(resolve => {
        let event = { id: id, eventData: 'event data' };
        resolve(event);
      });
    db.getMessages = ({ id }) =>
      new Promise(resolve => {
        let message1 = { id: id, messageData: 'message 1 data' };
        let message2 = { id: id, messageData: 'message 2 data' };
        resolve([message1, message2]);
      });
    db.getGuests = ({ id }) =>
      new Promise(resolve => {
        let owner = { id: id, username: 'owner' };
        let guest1 = { id: id, username: 'guest' };
        resolve([owner, guest1]);
      });
    let response = {
      event: { id: 'id', eventData: 'event data' },
      messages: [{ id: 'id', messageData: 'message 1 data' }, { id: 'id', messageData: 'message 2 data' }],
      guests: [{ id: 'id', username: 'owner' }, { id: 'id', username: 'guest' }],
    };
    let res = makeResObj(200, response);
    let req = { query: { id: 'id' } };
    await event.get(req, res);
  });

  test('should get all events I am signed up for and have made', async () => {
    db.getUserEvents = ({ username }) =>
      new Promise(resolve => {
        let event1 = { event: 'event1', owner: 'other' };
        let event2 = { event: 'event2', owner: username };
        resolve([event1, event2]);
      });
    let res = makeResObj(200, [{ event: 'event1', owner: 'other' }, { event: 'event2', owner: 'user' }]);
    let req = { session: { user: 'user' } };
    await event.getMyEvents(req, res);
  });
});
