const venue = require('../app/components/venues');

jest.mock('../../database/helpers');
const db = require('../../database/helpers');

jest.mock('../app/utils/googleMapsApi');
const gm = require('../app/utils/googleMapsApi');

describe('Venue Related Middleware', () => {});
