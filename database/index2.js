var path = require('path');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user: 'root',
    password: '',
    database: 'chat'
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 30);
      user.string('password', 30);
      user.string('firstName', 30);
      user.string('lastName', 30);
      user.integer('rating');
      user.boolean('isAdmin').defaultTo(false);
      user.string('address', 255); //Change to long and lat if google api is working
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('messages').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('messages', function (message) {
      message.increments('id').primary();
      message.string('body');
      message.foreign('userId').references('');
      message.foreign('eventId').references('');
      message.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});




module.exports = db;
