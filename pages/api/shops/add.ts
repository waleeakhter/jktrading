// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/conn'
import shopsModal from '../../../lib/models/Shop'
type Data = {}
const connect = await dbConnect()
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req;
    switch (method) {
        case 'GET':
            res.status(400).json({ message: "GET method not supported" });
            break;
        case 'POST':
            const checkShop = await shopsModal.find({ name: req.body.name })
            console.log(checkShop)
            if (checkShop.length > 0) {
                res.status(403).json(checkShop);
                return;
            }

            const addShop = await shopsModal.create(req.body);
            res.status(200).json({ message: "Client added successfully", shop: addShop })

            break;
        case 'PATCH':
            const updateShop = await shopsModal.findByIdAndUpdate({ _id: req.body._id }, req.body);
            res.status(200).json({ message: "Client update successfully", shop: updateShop })

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
