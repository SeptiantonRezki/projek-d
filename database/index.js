const Promise = require('bluebird')
const dbApp = require('./dbApp')
const personRepo = require('./personRepo')
const vehicleRepo = require('./vehicleRepo')

const db = new dbApp('./database.sqlite3')
const repoPerson = new personRepo(db);
const repoVehicle = new vehicleRepo(db);

module.exports= { Promise, db, repoPerson, repoVehicle};