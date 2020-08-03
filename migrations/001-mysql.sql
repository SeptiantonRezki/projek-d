--Up
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);
CREATE TABLE Vehicle(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    idOwner REFERENCES Person(id)

);
--Down

DROP TABLE Person;
DROP TABLE Vehicle;