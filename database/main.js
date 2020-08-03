const Promise = require('bluebird')
const dbApp = require('./dbApp')
const personRepo = require('./personRepo')
const vehicleRepo = require('./vehicleRepo')

function main() {
    const db = new dbApp('./database.sqlite3')
    const insertData = { nama: 'septian', email: 'septian@gmail.com'}
    const repoPerson = new personRepo(db)
    const repoVehicle = new vehicleRepo(db)
    let personId

    repoPerson.createTable()
        .then(() => repoVehicle.createTable())
        .then(() => repoPerson.create(insertData.nama, insertData.email))
        .then((data) => {
            personId = data.id
            const vehicles = [
                {
                    brand: 'HONDA',
                    modal: 'SUPRA X 125 HITAM',
                },
                {
                    brand: 'HONDA',
                    modal: 'SUPRA X 125 BIRU',
                }
            ]
            console.log(personId)
            return Promise.all(vehicles.map((vehicle) => {
                console.log("berhasil")
                const { brand, modal} = vehicle;

                return repoVehicle.create(brand, modal, personId)
            }))
        })
        .then(() => repoPerson.getById(personId))
        .then((person) => {
            console.log(`\nRetreived person from database`)
            console.log(`person id = ${person.id}`)
            console.log(`person nama = ${person.nama}`)
            console.log(`person email = ${person.email}`)
            return repoVehicle.getAllByOwner(person.id)
        })
        .then((vehicles) => {
            console.log('\nRetrieved vehicle from database')
            return new Promise((resolve, reject) => {
                console.log(vehicles);
                vehicles.forEach((vehicle) => {
                    console.log(`vehicle id = ${vehicle.id}`)
                    console.log(`vehicle name = ${vehicle.brand}`)
                    console.log(`vehicle description = ${vehicle.modal}`)
                    console.log(`vehicle isComplete = ${vehicle.idOwner}`)
                })
                resolve('success')
            })
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })
}

main()