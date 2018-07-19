var path = require('path');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user: 'root',
    password: process.env.DBPASS || require('../config/config.js').DBPASS,
    database: 'popupgames'
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

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
      user.string('address'); //Change to long and lat if google api is working
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
      event.string('name', 30);
      event.float('startBlock');
      event.float('endBlock');
      event.string('Notes');
      event.float('minPlayer');
      event.float('maxPlayer');
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
      sport.string('name', 30).unique();
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
      field.string('name', 30);
      field.string('Notes');
      field.string('type');
      field.boolean('isVerified').defaultTo(false);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('venues').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('venues', function (venue) {
      venue.increments('id').primary();
      venue.string('name', 30);
      venue.string('address');
      venue.boolean('isVerified').defaultTo(false);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sport_field').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sport_field', function (pair) {
      pair.increments('id').primary();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }

});

db.knex.schema.hasTable('user_event').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_event', function (pair) {
      pair.increments('id').primary();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});





module.exports = db;
