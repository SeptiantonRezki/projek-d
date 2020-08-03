import { NextApiRequest, NextApiResponse}  from 'next';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.sqlite');

const Promise = require('bluebird');

function getPersonById(req : NextApiRequest, res : NextApiResponse){


    const data = new Promise((resolve, reject) => {
        db.all('select * from Person where id = ?', [1] , (err , row) => {
            if(err){
                reject(err)
            }else{
                resolve(row);
            }
        });
    })
    console.log(data);
    res.json({data : data})
}

export default getPersonById;