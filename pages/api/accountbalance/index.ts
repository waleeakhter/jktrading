// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/conn'
import Balance from "../../../lib/models/AccountBalance"
type Data = {}
const connect = await dbConnect()
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method, query } = req;
    switch (method) {
        case 'GET':
            const getPayment = await Balance.findOne({ name: "JK Trading" });
            res.status(200).json(getPayment)
            break;
        case 'POST':
            res.status(400).json({ message: "Post method not supported" });
            break;
        case 'PATCH':
            res.status(400).json({ message: "PATCH method not supported" });
            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
