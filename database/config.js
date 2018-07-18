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
      user.number('rating').defaultTo(5);
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
      message.foreign('userId').references('users.id');
      message.foreign('eventId').references('events.id');
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
      event.number('startBlock');
      event.number('endBlock');
      event.string('Notes');
      event.timestamps();
      event.number('minPlayer');
      event.number('maxPlayer');
      event.foreign('userId').references('users.id');
      event.foreign('fieldId').references('fields.id');
      event.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sports').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sports', function (sport) {
      message.increments('id').primary();
      message.string('name', 30).unique();
      message.boolean('isVerified').defaultTo(false);
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
      field.foreign('venueId').references('venues.id');
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
      field.boolean('isVerified').defaultTo(false);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sport_field').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sport_field', function (pair) {
      pair.increments('id').primary();
      pair.foreign('fieldId').references('fields.id');
      pair.foreign('sportId').references('sports.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }

});

db.knex.schema.hasTable('user_event').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_event', function (pair) {
      pair.increments('id').primary();
      pair.foreign('eventId').references('events.id');
      pair.foreign('userId').references('users.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});





module.exports = db;
