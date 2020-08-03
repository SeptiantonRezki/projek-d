const sqlite = require('sqlite');

async function Test(){
    const db = await sqlite.open("../mydb.sqlite");
    await db.migrate({force : 'last'});
}

Test()