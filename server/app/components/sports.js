const util = require('../utils/utils');
const db = require('../../../database/helpers');

const getAll = (req, res) => util.getRes(db.getAllSports(), res);

const create = (req, res) => util.postRes(db.saveSport(req.body), res);

exports.getAll = getAll;
exports.create = create;
