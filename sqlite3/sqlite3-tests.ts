var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.sqlite');

db.serialize(() => {
    db.run(`CREATE TABLE Person 
        (id INTEGER PRIMARY KEY,
        nama TEXT,
        email TEXT
    )`
    );
    
    db.run("INSERT INTO Person (nama, email) values ( $nama, $email)", {
        $nama : 'septian',
        $email : 'septian@gmail.com'
    });

    db.run("INSERT INTO Person (nama, email) values ( $nama, $email)", {
        $nama : 'rezki',
        $email : 'rezki@gmail.com'
    });


});

db.serialize(() => {
    db.run(`CREATE TABLE Vehicle(
        id INTEGER PRIMARY KEY,
        brand TEXT,
        model TEXT,
        ownerId INTEGER REFERENCES Person(id)
    )`
    );
    db.run("INSERT INTO Vehicle (brand, model, ownerId) values ( $brand, $model, $ownerId)", {
        $brand : 'Honda',
        $model : 'Supra X 125',
        $ownerId : 1
    });
    db.run("INSERT INTO Vehicle (brand, model, ownerId) values ( $brand, $model, $ownerId)", {
        $brand : 'Yamaha',
        $model : 'Jupiter MX 125',
        $ownerId : 1
    });
    db.run("INSERT INTO Vehicle (brand, model, ownerId) values ( $brand, $model, $ownerId)", {
        $brand : 'Honda',
        $model : 'Mio 2020',
        $ownerId : 2
    });
});


db.serialize(() => {
    // db.run("DROP TABLE Person");
    // db.run("DROP TABLE Vehicle");
    const query = "SELECT id, brand, model, ownerId FROM Vehicle";
    db.each( query , (err, row) => {
        console.log(`${row.id} - ${row.brand} - ${row.model} - ${row.ownerId}`);       
    });
    const query2 = "SELECT id, email, nama FROM Person";
    db.each( query2 , (err, row) => {
        console.log(`${row.id} - ${row.email} - ${row.nama} - ${row.ownerId}`);       
    });
})
db.close();