import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { openDB, Person } from '../../openDB';

export default async function SignUp(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        if ((req.body.password && req.body.email) != null) {
            hash(req.body.password, 10, async function (err, hash) {
                const db = new openDB();
                const person = new Person(db);
                await person.createPersonFree(req.body.email, hash)
                .then(() => person.getAll())
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
