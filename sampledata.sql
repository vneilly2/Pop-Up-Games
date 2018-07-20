INSERT INTO users (username, firstName, lastName, password, address, email)
VALUES ("yuqizhu", "yuqi", "zhu", "admin", "100 5th ave", "123@qq.com");

INSERT INTO events (name, startBlock, endBlock, Notes, minPlayer, maxPlayer, ownerId)
VALUES ("badminton club", 30, 32, "This is a badminton event", 0, 4, 1);

INSERT INTO venues (name, address)
VALUES ("Brandon Gym", "200 5th Ave");

INSERT INTO sports (name)
VALUES ("badminton");

INSERT INTO fields (name, Notes, type)
VALUES ("badminton racket", "Free", "It's a type.");

INSERT INTO messages (body)
VALUES ("I can bring the rackets");
