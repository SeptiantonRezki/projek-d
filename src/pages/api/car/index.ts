import { NextApiRequest, NextApiResponse } from "next";
import { Car, openDB } from "../../../openDB";

export default async function Index(req:NextApiRequest , res: NextApiResponse) {
    if(req.method == "GET"){
        const db = new openDB();
        const carDB = new Car(db);
        const cars = await carDB.getAllCar();   
        res.json(cars);
    }

    if(req.method == "POST"){
        const db = new openDB();
        const carDB = new Car(db);
        const dataMasuk= {
            make: req.body.make, 
            model: req.body.model,
            year: req.body.year,
            fullType: req.body.fullType, 
            kilometers: req.body.kilometers, 
            details: req.body.details,
            price: req.body.price,
            photoURL: req.body.photoURL, 
            idOwner: req.body.idOwner
        }
        const cars = await carDB.addCar(dataMasuk);   
        res.json(cars);
    }

    if(req.method == "PUT"){
        const db = new openDB();
        const carDB = new Car(db);
        const dataMasuk= {
            make: req.body.make, 
            model: req.body.model,
            year: req.body.year,
            fullType: req.body.fullType, 
            kilometers: req.body.kilometers, 
            details: req.body.details,
            price: req.body.price,
            photoURL: req.body.photoURL, 
            idPerson: req.body.idPerson,
            idCar: req.body.idCar
        }
        const cars = await carDB.updateCar(dataMasuk);   
        res.json(cars);
    }
    
    if(req.method == "DELETE"){
        const db = new openDB();
        const carDB = new Car(db);
        const cars = await carDB.deleteCar(req.body.idCar);   
        res.json(cars);
    }
}