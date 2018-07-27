const gm = require('../app/utils/googleMapsApi');

jest.mock('axios');
const axios = require('axios');

describe('Googlemaps Geocoding Api Requests', () => {
  test('should have the correct web address', () => {
    axios.get = url => expect(url).toEqual('https://maps.googleapis.com/maps/api/geocode/json');
    gm.getGeoLocation({ address: 'address' });
  });

  test('should send params with an address and a key', () => {
    axios.get = (url, req) => {
      expect(req).toHaveProperty('params');
      expect(req.params.address).toEqual('address');
      expect(req.params.key.constructor).toEqual(String);
    };
    gm.getGeoLocation({ address: 'address' });
  });
});
