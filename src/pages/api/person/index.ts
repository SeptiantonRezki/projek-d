import { NextApiRequest, NextApiResponse}  from 'next';
import { db, repoPerson, repoVehicle, Promise} from '../../../../database';

// get all pepople
export default async function getAllPerson(req : NextApiRequest, res : NextApiResponse){
    if(req.method == "GET"){
        const data = await repoPerson.getAll().then( (data) => {
            return new Promise((resolve, reject) => {
                resolve(data);
            })
        });
        
        res.json(data)
    }else {
        res.status(405).json({"message" : "we only receive GET"});
    }
}
