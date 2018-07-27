const util = require('../utils/utils');
const db = require('../../../database/helpers');

const addMeToEvent = (req, res) => util.postRes(db.saveGuest((req.body.username = req.session.user) && req.body), res);

const create = (req, res) => util.postRes(db.saveEvent((req.body.username = req.session.user) && req.body), res);

const get = (req, res) =>
  util.getRes(
    util.buildRes(
      ['event', 'messages', 'guests'],
      db.getEvent(req.query),
      db.getMessages(req.query),
      db.getGuests(req.query)
    ),
    res
  );

const getMyEvents = (req, res) => util.getRes(db.getUserEvents({ username: req.session.user }), res);

exports.addMeToEvent = addMeToEvent;
exports.create = create;
exports.get = get;
exports.getMyEvents = getMyEvents;
