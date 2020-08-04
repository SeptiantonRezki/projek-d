import { NextApiRequest, NextApiResponse}  from 'next';
import { db, repoPerson, repoVehicle, Promise} from '../../../../../database';


export default async function getAllVehiclesByIdPerson(req : NextApiRequest, res : NextApiResponse){
    
    const data = await repoVehicle.getAllByOwner(req.query.id).then((data) => {
        return new Promise((resolve, reject) => {
            resolve(data);
        })
    })
    
    res.json(data);
}