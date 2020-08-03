import { NextApiRequest, NextApiResponse}  from 'next';
// mendapatkan semua vehicles dari id person


export default function getAllVehiclesByIdPerson(req : NextApiRequest, res : NextApiResponse){
    res.json({byId: req.query.id, message :'getAllVehicleByIdPerson'})
}