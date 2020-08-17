import { openDB, Car, Person, Token } from "../../openDB";
import { NextApiResponse, NextApiRequest } from "next";

export default async function dropDB(res: NextApiResponse, req: NextApiRequest){
    const db = new openDB();
    const carDB = new Car(db);
    const personDB = new Person(db);
    const tokenDB = new Token(db);

    const dropCarDB = await carDB.dropDB();
    const dropPersonDB = await personDB.dropDB();
    const dropTokenDB = await tokenDB.dropDB();
    const dropAll = Promise.all([dropCarDB, dropPersonDB, dropTokenDB]);
    if(dropAll){
        res.json({message: "berhasil hapus"})
    }else{
        res.json({message: "gagal hapus"})
    }
}