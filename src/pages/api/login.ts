import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { openDB, Person, Jwt } from '../../openDB';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == "POST") {
        const db = new openDB();
        const person = new Person(db);
        const jwtDB = new Jwt(db);

        await person.getPersonById(req.body.idPerson)
            .then((data) => {
                return new Promise((resolve, reject) => {
                    compare(req.body.password, data.pass, async function (err, result) {
                        if (!err && result) {
                            const token = await jwtDB
                                .checkToken(data.idPerson)
                                .then((data) => {
                                    return new Promise((resolve, reject) => {
                                        resolve(data)
                                    })
                                })
                            if (token) {
                                res.json({ token })
                            } else {
                                const claims = { idPerson: data.idPerson, emailPerson: data.email, rolePerson: data.roler_person }
                                const jwt = sign(claims, '3ab13e41-c378-4fb8-8d81-daa984d00796', { expiresIn: '1h' });
                                //menambahkan expire di cookie dan database
                                const newToken = await jwtDB.createToken(data.idPerson, jwt);
                                if (newToken) {
                                    await jwtDB
                                        .checkToken(data.idPerson)
                                        .then((data) => {
                                            return new Promise((resolve, reject) => {
                                                res.json({ tokenBaru: data })
                                            })
                                        })
                                } else {
                                    res.json({ message: 'something error' })
                                }
                            }
                        } else {
                            res.json({ "message": "password anda salah" })
                        }
                    });
                })
            })
            .catch((err) => {
                res.json({ "message": "kamu belum terdaftar, " + err })
            })
    } else {
        res.status(405).json({ "message": "tidak menerima selain post" })
    }
}
