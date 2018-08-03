const axios = require('axios');

//use googlemaps api (limited to 2500 uses per day so you dont get charged) to get the lat and lng for the address
const getGeoLocation = ({ address }) =>
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: address,
      // key: process.env.GMAPS_API || require('../../../config/config.js').API_KEYS.gmaps,
      key: require('../../../config/config.js').GMAPS.GMAPS_API,
    },
  });

exports.getGeoLocation = getGeoLocation;
