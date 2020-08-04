
class VehicleRepo{
    constructor(dbApp){
        this.dbApp = dbApp;
    }
    createTable(){
        const sql = `CREATE TABLE IF NOT EXISTS Vehicle(id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, modal TEXT, idOwner REFERENCES Person(id))`;
        return this.dbApp.run(sql);
    }
    create(brand, modal, idOwner){
        return this.dbApp.run(
            "INSERT INTO Vehicle(brand,modal,idOwner) VALUES(?, ?, ?)",
            [brand, modal, idOwner]
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
    getAllByOwner(idOwner){
        return this.dbApp.all(
            "SELECT * FROM Vehicle WHERE idOwner=?",
            [idOwner]
        )
    }
    getAll(){
        return this.dbApp.all(
            "SELECT * FROM Vehicle"
        )
    }
    join(){
        const query = `SELECT 
            p.id, p.nama, p.email, v.id, v.modal, v.brand, v.idOwner 
            FROM 
            Person as p INNER JOIN Vehicle as v
            ON p.id = v.idOwner;
            `;
        return this.dbApp.all(
            query
        )    
    }

}

module.exports=VehicleRepo;