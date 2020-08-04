import { NextApiRequest, NextApiResponse } from 'next';
import { db, repoPerson, repoVehicle, Promise } from '../../../database';
import { hash } from 'bcrypt';
import { reject } from 'bluebird';

export default async function SignUp(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        if ((req.body.password && req.body.nama && req.body.email) != null) {
            hash(req.body.password, 10, async function (err, hash) {
                await repoPerson
                    .create(req.body.nama, req.body.email, hash)
                    .then(() => repoPerson.getAll())
                    .then((data) => {
                        return new Promise(() => {
                            res.json(data);
                        })
                    })
            });
        } else {
            res.json({ "message": "tolong lengkapi data anda" })
        }
    } else {
        res.status(405).json({ "message": "something want wrong" })
    }
}
