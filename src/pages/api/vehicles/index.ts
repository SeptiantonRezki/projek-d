import { NextApiRequest, NextApiResponse } from 'next';
import { db, repoPerson, repoVehicle, Promise} from '../../../../database';
import { reject } from 'bluebird';

export default async function getAllVehicles(req : NextApiRequest, res : NextApiResponse) {
    const data = await repoVehicle.join().then((data) => {
        return new Promise((resolve, reject) => {
            resolve(data);
        })
    });
    res.json( data );
}