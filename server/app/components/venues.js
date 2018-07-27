const util = require('../utils/utils');
const gm = require('../utils/googleMapsApi');
const db = require('../../../database/helpers');

const get = (req, res, next, data) =>
  util.getRes(
    util
      .buildRes(
        ['venue', 'fields'],
        //get all the venue data using id
        db.getVenue(req.query),
        //get the fields at that venue
        db.getFields(req.query)
      )
      //get today's events on those fields
      .then(dataObj => (data = dataObj) && Promise.all(data.fields.map(field => db.getTodaysFieldEvents(field))))
      //input them into each field object in the fields array
      .then(
        fieldsEvents =>
          new Promise(resolve =>
            resolve(fieldsEvents.forEach((events, i) => (data.fields[i].todaysEvents = events)) && data)
          )
      ),
    res
  );

const create = (req, res) =>
  util.postRes(
    //save a venue's details to be accepted by an admin later
    gm
      .getGeoLocation((req.body.username = req.session.user) && req.body)
      .then(
        loc =>
          loc.data.results.length
            ? db.saveVenue(
                (req.body.lat = loc.data.results[0].geometry.location.lat) &&
                  (req.body.lng = loc.data.results[0].geometry.location.lng) &&
                  (req.body.address = loc.data.results[0].formatted_address) &&
                  req.body
              )
            : res.status(400).send('improper address') && null
      ),
    res
  );

const getVenuesNearMe = (req, res) =>
  util.getRes(
    //get all the venues within 20 miles of the user's location
    db.getVenuesNearUser(req.session.user, 20),
    res
  );

exports.get = get;
exports.create = create;
exports.getVenuesNearMe = getVenuesNearMe;
