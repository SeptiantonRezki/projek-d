import { NextApiRequest, NextApiResponse } from 'next';
import { db, repoPerson, repoVehicle, Promise} from '../../../database';
import { compare } from 'bcrypt';

export default async function Login(req : NextApiRequest, res : NextApiResponse){
    if(req.method == "POST"){
        await repoPerson
        .getById(req.body.id)
        .then((data) => {
            return new Promise(() => {
                compare(req.body.password, data.password , function(err, result) {    
                    if(!err && result){
                        res.json(data);
                    }else{
                        res.json({ "message": "password anda salah" })
                    }
                });
            })
        })
        .catch((err) => {
            res.json({ "message": "kamu belum terdaftar, " + err })
        })
    }else {
        res.status(405).json({ "message": "tidak menerima selain post" })
    }
}
