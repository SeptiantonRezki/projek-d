
class PersonRepo{
    constructor(dbApp){
        this.dbApp = dbApp;
    }
    createTable(){
        const sql = `
            CREATE TABLE IF NOT EXISTS Person(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nama TEXT,
                email TEXT
            )
        `;
        return this.dbApp.run(sql);
    }
    create(nama, email){
        return this.dbApp.run(
            "INSERT INTO Person(nama , email) VALUES(?, ?)",
            [nama, email]
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

module.exports = PersonRepo;