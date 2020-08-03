import { NextApiRequest, NextApiResponse } from 'next';

export default function getPeople(req : NextApiRequest, res : NextApiResponse) {
    res.json({id : req.query.id});
}