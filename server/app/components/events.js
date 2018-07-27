const util = require('../utils/utils');
const db = require('../../../database/helpers');

const addMeToEvent = (req, res) =>
  util.postRes(
    //add a guest to the event using id
    db.saveGuest((req.body.username = req.session.user) && req.body),
    res
  );

const create = (req, res) =>
  util.postRes(
    //save an event's details
    db.saveEvent((req.body.username = req.session.user) && req.body),
    res
  );

const get = (req, res) =>
  util.getRes(
    util.buildRes(
      ['event', 'messages', 'guests'],
      //get all event details using id
      db.getEvent(req.query),
      //get all messages for that event
      db.getMessages(req.query),
      //get all guests currently signed up for that event
      db.getGuests(req.query)
    ),
    res
  );

const getMyEvents = (req, res) =>
  util.getRes(
    //get all of the events the current user has signed up for
    db.getUserEvents({ username: req.session.user }),
    res
  );

exports.addMeToEvent = addMeToEvent;
exports.create = create;
exports.get = get;
exports.getMyEvents = getMyEvents;
