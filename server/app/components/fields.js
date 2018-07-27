const util = require('../utils/utils');
const db = require('../../../database/helpers');

const get = (req, res) =>
  util.getRes(
    util.buildRes(
      ['field', 'sports', 'events'],
      //get all field data using id
      db.getField(req.query),
      //get what sports are available on that field
      db.getSports(req.query),
      //get what events are currently posted to that field
      db.getFieldEvents(req.query)
    ),
    res
  );

const create = (req, res) =>
  util.postRes(
    //save a field's details to be accepted by an admin later
    db.saveField((req.body.username = req.session.user) && req.body),
    res
  );

exports.get = get;
exports.create = create;
