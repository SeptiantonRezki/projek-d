import { NextApiRequest, NextApiResponse, GetServerSideProps } from "next";
import { openDB, Car } from "../../../../openDB";
import { CarInterface } from "../../../../../model/Car";

export default async function getCarById(req: NextApiRequest, res: NextApiResponse) {
    const db = new openDB();
    const carDB = new Car(db);
    const id = req.query.id;
    const data = await carDB
        .getById(id)
        .then((data) => {
            return data;
        });
        
    res.json(data)
}