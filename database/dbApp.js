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

module.exports = dbApp;