import sqlite3 from 'sqlite3';
const Promise = require('bluebird');

// dbConfiguration
export class openDB {

    db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('car.sqlite', (err) => {
            if (err) {
                console.log("cannot acces database");
            } else {
                console.log("Database connected")
            }
        });
    }

    run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.log('error running sql !!');
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            })
        })
    }
    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, function (err, result) {
                if (err) {
                    console.log('error running sql !!');
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, function (err, result) {
                if (err) {
                    console.log('error running sql !!');
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}

export class Person {

    db;

    constructor(db) {
        this.db = db;
    }

    createPersonFree(email: string, pass: string) {
        return this.db.run('INSERT INTO Person(email, pass, roler_person) values(?,?,?)', [email, pass, 3]);
    }

    createPersonPremium(email: string, pass: string) {
        return this.db.run('INSERT INTO Person(email, pass, roler_person) values(?,?,?)', [email, pass, 2]);
    }

    getAll() {
        return this.db.all('SELECT * FROM Person');
    }

    getPersonById(idPerson: number) {
        return this.db.get('SELECT * FROM Person WHERE idPerson = ?', [idPerson]);
    }
    dropDB() {
        return this.db.run('DELETE FROM Person');
    }
}

export class Token {
    db;

    constructor(db) {
        this.db = db;
    }

    checkToken(idPerson: number) {
        return this.db.get('SELECT * FROM Token WHERE idJwt = ?', [idPerson]);
    }

    createToken(idPerson: number, jwt: string) {
        return this.db.run('INSERT INTO Token(idJwt, jwt) values(?,?)', [idPerson, jwt]);
    }

    getAllToken() {
        return this.db.all('SELECT * FROM Token');
    }

    deleteToken(idPerson: number) {
        return this.db.run('DELETE FROM Token WHERE idJWT = ?', [idPerson]);
    }

    dropDB() {
        return this.db.run('DELETE FROM Token');
    }

}

export class Car {
    db: any
    constructor(db) {
        this.db = db;
    }
    // CRUD
    getAllCar() {
        return this.db.all('SELECT * FROM Car');
    }

    getById(idCar) {
        return this.db.get('SELECT * FROM Car WHERE idCar = ?', [idCar]);
    }

    updateCar({ make, model, year, fullType, kilometers, details, price, photoURL, idPerson, idCar }) {
        return this.db.run('UPDATE Car SET make=?, model=?, year=?, fullType=?, kilometers=?, details=?, price=?, photoURL=? WHERE idCar=?',
            [make, model, year, fullType, kilometers, details, price, photoURL, idPerson, idCar])
    }

    addCar({ make, model, year, fullType, kilometers, details, price, photoURL, idOwner }) {
        return this.db.run('INSERT INTO Car (make, model, year, fullType, kilometers, details, price, photoURL, idOwner) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [make, model, year, fullType, kilometers, details, price, photoURL, idOwner])
    }

    deleteCar(idCar) {
        return this.db.run('DELETE FROM Car WHERE idCar = ?', [idCar]);
    }
    dropDB(){
        return this.db.run('DELETE FROM Car');
    }

    paginationCar(min: number, max: number) {
        return this.db.all('select * from Microphone where id > ? and id <= ?', [min, max])
    }
}