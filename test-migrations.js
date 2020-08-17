const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

(async () => {
    const db = await sqlite.open({
        filename:'./car.sqlite',
        driver: sqlite3.Database
    }).catch((err) => console.log(err));
    await db.migrate({force: true});
    const microphones = await db.all('select * from car');
    console.log(JSON.stringify(microphones, null, 4));
})
();