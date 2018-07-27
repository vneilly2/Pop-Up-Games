import React from 'react';

//need function to convert startblock and endblock to time

var FieldDayCalendarEntry = (props) => (
  <div className="hover-lightblue">{props.event.sportId} {props.event.startBlock} to {props.event.endBlock}</div>
  )

export default FieldDayCalendarEntry;


// db.knex.schema.hasTable('events').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('events', function (event) {
//       event.increments('id').primary();
//       event.string('eventName', 30);
//       event.float('startBlock');
//       event.float('endBlock');
//       event.string('notes');
//       event.string('date');
//       event.float('minPlayer').defaultTo(0);
//       event.float('maxPlayer').defaultTo(null);
//       event.integer('ownerId');
//       event.integer('sportId');
//       event.integer('fieldId');
//       event.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });