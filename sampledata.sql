-- INSERT INTO users (username, firstName, lastName, password, address, email, lat, lng)
-- VALUES ("yuqizhu", "yuqi", "zhu", "admin", "100 5th ave", "123@qq.com", 40.00, 30.00);

-- INSERT INTO messages (body, userId, eventId)
-- VALUES ("I can bring the rackets", 1, 1);

-- INSERT INTO events (eventName, startBlock, endBlock, Notes, date, minPlayer, maxPlayer, ownerId, sportId, fieldId)
-- VALUES ("badminton club", 30, 32,  "This is a badminton event", "2018-07-20 17:29:15", 0, 4, 1, 1, 1);

INSERT INTO sports (sportName)
VALUES ("badminton");

INSERT INTO fields (fieldName, notes, venueId)
VALUES ("badminton racket", "Free", 1);

INSERT INTO venues (venueName, address, lat, lng)
VALUES ("Brandon Gym", "200 5th Ave", 40.00, 30.00);

INSERT INTO fields_sports (fieldId, sportId)
VALUES (1, 1);

INSERT INTO events_users (eventId, userId)
VALUES (1, 1);


