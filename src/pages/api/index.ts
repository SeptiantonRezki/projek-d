import { openDB } from "../../openDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Index(req: NextApiRequest, res: NextApiResponse) {
    const db = new openDB();
    const data = await db.all('select * from Car');
    res.json(data);
}