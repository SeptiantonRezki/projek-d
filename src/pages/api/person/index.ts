import { NextApiRequest, NextApiResponse } from "next";
import { openDB, Person } from "../../../openDB";


export default async function Index(req : NextApiRequest, res: NextApiResponse){
    const db = new openDB();
    const personDB = new Person(db);
    const dataPerson = await personDB.getAll();   
    res.json({dataPerson})
}