var db = require('../config');
var Event = require('./event');
var Field = require('./field');

var Sport = db.Model.extend({
  tableName: 'sports',
  events: function() {
    return this.hasMany('Event', 'sportId');
  },
  fields: function() {
    return this.belongsToMany(field, 'fields_sports', 'sportId', 'fieldId');
  }
});


module.exports = db.model('Sport', Sport);
