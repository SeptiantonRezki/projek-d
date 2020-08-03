var sqlite3 = require('sqlite3').verbose();
var Promise = require('bluebird');

class dbApp {
    constructor(dbpath){
        this.db = new sqlite3.Database(dbpath, (err) => {
            if(err){
                console.log("cannot acces database");
            }else {
                console.log("Database connected")
            }
        });
    }
    run(sql, params = []){
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err){
                if(err){
                    console.log("Error running sql " + err);
                    reject(err);
                }else {
                    resolve({ id : this.lastID})
                }
            })
        })
    }
    get(sql, params = []){
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if(err){
                    console.log("something wrong " + err)
                    reject(err);
                }else {
                    resolve(result);
                }
            })
        })
    }
    all(sql, params = []){
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if(err){
                    console.log("something wrong " + err)
                    reject(err)
                }else {
                    resolve(rows)
                }
            })
        })
    }

}

class PersonRepo{
    constructor(dbApp){
        this.dbApp = dbApp;
    }
    createTable(){
        const sql = `
            CREATE TABLE Person(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nama TEXT,
                email TEXT
            )
        `;
        return this.dbApp.run(sql);
    }
    create(){
        return this.dbApp.run(
            "INSERT INTO Person(nama , email) VALUES(?, ?)",
            ["septian", "septian@gmail.com"]
        )
    }
    update(Person){
        const { id , nama , email} = Person;
        return this.dbApp.run(
            "UPDATE Person SET nama=?, email=? WHERE id=?",
            [nama, email, id]
        ) 
    }
    delete(idPerson){
        const { id } = idPerson;
        return this.dbApp.run(
            "DELETE FROM Person WHERE id=?",
            [id]
        )
    }
    getById(idPerson){
        return this.dbApp.get(
            "SELECT * FROM Person WHERE id=?",
            [idPerson]
        )
    }
    getAll(){
        return this.dbApp.all("SELECT * FROM Person")
    }
}

class VehicleRepo{
    constructor(dbApp){
        this.dbApp = dbApp;
    }
    createTable(){
        const sql = `
            CREATE TABLE Vehicle(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                brand TEXT,
                modal TEXT,
                idOwner REFERENCES Person(id)
            )
        `;
        return this.dbApp.run(sql);
    }
    create(){
        return this.dbApp.run(
            "INSERT INTO Vehicle(brand,modal,idOwner) VALUES(?, ?, ?)",
            ["HONDA", "SUPRA X 125", 1]
        )
    }
    update(Vehicle){
        const {id, brand, modal, idOwner} = Vehicle;
        return this.dbApp.run(
            "INSERT INTO Vehicle SET brand=?, modal=?, idOwner=? WHERE id=?",
            [brand, modal, idOwner, id]
        )
    }
    delete(idVehicle){
        const { id } = idVehicle;
        return this.dbApp.run(
            "DELETE FROM Vehicle WHERE id=?",
            [id]
        )
    }
    getById(idVehicle){
        return this.dbApp.get(
            "SELECT * FROM Vehicle WHERE id=?",
            [idVehicle]
        )
    }
    getAll(){
        return this.dbApp.all("SELECT * FROM Vehicle")
    }


}


module.exports = dbApp;