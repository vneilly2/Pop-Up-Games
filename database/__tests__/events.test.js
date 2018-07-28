const db = require('../helpers');
const Users = require("../collections/users");
const User = require("../models/user");
const Fields = require("../collections/fields");
const Field = require("../models/field");
const Sports = require("../collections/sports");
const Sport = require("../models/sport");
const Events = require("../collections/events");
const Event = require("../models/event");
const Venues = require("../collections/venues");
const Venue = require("../models/venue");
const Messages = require("../collections/messages");
const Message = require("../models/message");
const moment = require('moment');

describe('database helpers', () => {
  test('should save the user', async () => {
    db.saveUser({username: "yuqi", password: "admin", firstName: "yuqi", lastName: "zhu"}).then(
      () => {
        new User({username: user.username}).fetch().then(
          found => expect(found).toEqual({username: "yuqi"})
        );
      }
    )
  });

  test('should save the event', async () => {
    db.saveEvent({eventName: "tennis", startBlock: 25, endBlock: 30, Notes: "free", date: new Date(), minPlayer: 0, maxPlayer: 4, sportId: 1, fieldId: 1}).then(
      () => {
        new Event({eventName: "tennis"}).fetch().then(
          found => expect(found.attributes.eventName).toEqual("tennis")
        );
      }
    )
  });

  test('should save the sport', async () => {
    db.saveSport({sportName: "tennis"}).then(
      () => {
        new Sport({sportName: "tennis"}).fetch().then(
          found => expect(found && 1).toBe(1)
        );
      }
    )
  });

  test('should save the sport', async () => {
    db.saveSport({sportName: "tennis"}).then(
      () => {
        new Sport({sportName: "tennis"}).fetch().then(
          found => expect(found && 1).toBe(1)
        );
      }
    )
  });

  test('should save the field', async () => {
    db.saveField({fieldName: "tennis court"}).then(
      () => {
        new Field({fieldName: "tennis court"}).fetch().then(
          found => expect(found && 1).toBe(1)
        );
      }
    )
  });

  test('should save the venue', async () => {
    db.saveVenue({venueName: "central park"}).then(
      () => {
        new Venue({venueName: "central park"}).fetch().then(
          found => expect(found && 1).toBe(1)
        );
      }
    )
  });

  test('should save the message', async () => {
    db.saveMessage({username: "yuqi", eventId: 1, body: "Hi"}).then(
      () => {
        new Message({username: "yuqi"}).fetch().then(
          found => expect(found && 1).toBe(1)
        );
      }
    )
  });

  // test('should get the message', async () => {
  //   db.getMessages({username: "yuqi", eventId: 1, body: "Hi"}).then(
  //     found => {
  //     }
  //   )
  // });
});


