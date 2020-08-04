import { NextApiRequest, NextApiResponse } from 'next';
import { db, repoPerson, repoVehicle, Promise} from '../../../../database';


export default async function getPeople(req : NextApiRequest, res : NextApiResponse) {
    const data = await repoVehicle.getById(req.query.id).then((data) => {
        return new Promise((resolve, reject) => {
            resolve(data);
        })
    })
    
    res.json(data);
}