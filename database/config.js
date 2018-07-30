var path = require('path');

//Setup the connection to the database. If NODE_ENV is set, switch to a test database
var knex = require('knex')({
  client: 'mysql',
  connection: process.env.DATABASE_URL || {
    host : '127.0.0.1',
    user: 'root',
    password: process.env.DBPASS || require('../config/config.js').DBPASS,
    database: process.env.NODE_ENV === 'test' ? 'popupgamesTest' : 'popupgames'
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);
//Plugin for solving circular reference
db.plugin('registry');

//Table schemas
db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 30).unique();
      user.string('password');
      user.string('firstName', 30);
      user.string('lastName', 30);
      user.float('rating').defaultTo(5);
      user.boolean('isAdmin').defaultTo(false);
      user.string('email');
      user.string('address');
      user.float('lat', 18, 10);
      user.float('lng', 18, 10);
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
      message.integer('userId');
      message.integer('eventId');
      message.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('events', function (event) {
      event.increments('id').primary();
      event.string('eventName', 30);
      event.float('startBlock');
      event.float('endBlock');
      event.string('notes');
      event.date('date');
      event.float('minPlayer').defaultTo(0);
      event.float('maxPlayer').defaultTo(null);
      event.integer('ownerId');
      event.integer('sportId');
      event.integer('fieldId');
      event.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sports').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sports', function (sport) {
      sport.increments('id').primary();
      sport.string('sportName', 30).unique();
      sport.boolean('isVerified').defaultTo(false);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('fields').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('fields', function (field) {
      field.increments('id').primary();
      field.string('fieldName', 30);
      field.string('notes');
      field.boolean('isVerified').defaultTo(false);
      field.integer('venueId');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('venues').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('venues', function (venue) {
      venue.increments('id').primary();
      venue.string('venueName', 30);
      venue.string('address');
      venue.boolean('isVerified').defaultTo(false);
      venue.float('lat', 18, 10);
      venue.float('lng', 18, 10);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

//Join tables for many-to-many relationships
db.knex.schema.hasTable('fields_sports').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('fields_sports', function (pair) {
      pair.increments('id').primary();
      pair.integer('fieldId');
      pair.integer('sportId');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('events_users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('events_users', function (pair) {
      pair.increments('id').primary();
      pair.integer('eventId');
      pair.integer('userId');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});





module.exports = db;
