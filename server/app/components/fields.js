const util = require('../utils/utils');
const db = require('../../../database/helpers');

const get = (req, res) =>
  util.getRes(
    util.buildRes(
      ['field', 'sports', 'events'],
      db.getField(req.query),
      db.getSports(req.query),
      db.getFieldEvents(req.query)
    ),
    res
  );

const create = (req, res) => util.postRes(db.saveField((req.body.username = req.session.user) && req.body), res);

exports.get = get;
exports.create = create;
