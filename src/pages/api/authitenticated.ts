import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export const authenticated = (fn: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    verify(req.headers.authorization!, '3ab13e41-c378-4fb8-8d81-daa984d00796', async function(err, decoded){
        if(!err && decoded){
            return await fn(req, res);
        }
        res.status(501).json({message: "you are not authenticated"});
    })
}