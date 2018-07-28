const venue = require('../app/components/venues');
const { makeResObj } = require('./testHelpers');

jest.mock('../../database/helpers');
const db = require('../../database/helpers');

jest.mock('../app/utils/googleMapsApi');
const gm = require('../app/utils/googleMapsApi');

describe('Venue Related Middleware', () => {
  test("should create a reponse object with the venue details, its fields, and those field's events for today", async () => {
    db.getVenue = ({ id }) =>
      new Promise(resolve => {
        let venue = { id: id, venueData: 'venue data' };
        resolve(venue);
      });
    db.getFields = ({ id }) =>
      new Promise(resolve => {
        let field1 = { id: 1, fieldData: 'field 1 data' };
        let field2 = { id: 2, fieldData: 'field 2 data' };
        resolve([field1, field2]);
      });
    db.getTodaysFieldEvents = ({ id }) =>
      new Promise(resolve => {
        let event1 = { id: id, event: 'event ' + (id === 1 ? 1 : 3) };
        let event2 = { id: id, event: 'event ' + (id === 1 ? 2 : 4) };
        resolve([event1, event2]);
      });
    let response = {
      venue: { id: 'id', venueData: 'venue data' },
      fields: [
        {
          id: 1,
          fieldData: 'field 1 data',
          todaysEvents: [{ id: 1, event: 'event 1' }, { id: 1, event: 'event 2' }],
        },
        {
          id: 2,
          fieldData: 'field 2 data',
          todaysEvents: [{ id: 2, event: 'event 3' }, { id: 2, event: 'event 4' }],
        },
      ],
    };
    let res = makeResObj(200, response);
    let req = { query: { id: 'id' } };
    await venue.get(req, res);
  });

  describe('Create Venue', () => {
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

    test('should send a formed object to the venue table', async () => {
      db.saveVenue = data =>
        new Promise(resolve => {
          expect(data).toEqual({
            lat: 'lat',
            lng: 'lng',
            venueName: 'venue name',
            address: 'good address formated',
          });
          resolve(data);
        });
      let res = makeResObj(201);
      let goodObj = { body: { venueName: 'venue name', address: 'good address' } };
      await venue.create(goodObj, res);
    });

    test('should should respond an error if the address is not an address', async () => {
      let errorMessage = 'improper address';
      let res = makeResObj(400, { serverMessage: errorMessage });
      let badAddress = { body: { venueName: 'venue name', address: 'bad address' } };
      await venue.create(badAddress, res);
    });
  });

  test('should use the session user to find venues within a distance of me by sending the user and distance to the database helper function', async () => {
    db.getVenuesNearUser = (username, distance) =>
      new Promise(resolve => resolve({ username: username, distance: !!distance }));
    let req = { session: { user: 'user' } };
    let res = makeResObj(200, { username: 'user', distance: true });
    await venue.getVenuesNearMe(req, res);
  });
});
