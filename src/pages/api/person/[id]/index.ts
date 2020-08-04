import { NextApiRequest, NextApiResponse}  from 'next';
import { db, repoPerson, repoVehicle, Promise} from '../../../../../database';

export default async function getPersonById(req : NextApiRequest, res : NextApiResponse){
    if(req.method == "GET"){
        const data = await repoPerson.getById(req.query.id).then( (data) => {
            return new Promise((resolve, reject) => {
                resolve(data);
            })
        });
        
        res.json(data)
    }else {
        res.status(405).json({"message" : "we only receive GET"});
    }
}

