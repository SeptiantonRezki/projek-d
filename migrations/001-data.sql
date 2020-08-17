-- Up

CREATE TABLE Car(
    idCar INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT, 
    model TEXT, 
    year INTEGER,
    fullType TEXT,
    kilometers INTEGER,
    details TEXT,
    price INTEGER,
    photoURL TEXT,
    idOwner INTEGER REFERENCES Person(idPerson)
);
CREATE TABLE Roler(
    idRoler INTEGER PRIMARY KEY,
    roler TEXT
);
CREATE TABLE Person(
    idPerson INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    pass TEXT,
    roler_person REFERENCES Roler(id) 
);
CREATE TABLE Token(
    idJwt INTEGER PRIMARY KEY REFERENCES Person(id),
    jwt TEXT
);

INSERT INTO Roler(idRoler, roler) values(1, 'Admin');
INSERT INTO Roler(idRoler, roler) values(2, 'Premium');
INSERT INTO Roler(idRoler, roler) values(3, 'Free');

INSERT INTO Person (email, pass, roler_person) values('septianrezki@gmail.com', '1234', 1);
INSERT INTO Car (make, model, year, fullType, kilometers, details, price, photoURL, idOwner) values('Blue', 'amber', 2017, "terserah", 1299, "Lorem ipmsum keterangan gimanapun terserah", 999, '/Car/01.jpg', 1);

-- Down

