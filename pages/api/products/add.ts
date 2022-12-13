// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import porductModal from '../../../lib/models/Product'
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
            const checkProduct = await porductModal.find({ name: req.body.name, category: req.body.category })
            console.log(checkProduct)
            if (checkProduct.length > 0) {
                res.status(403).json(checkProduct);
                return;
            }

            const addProduct = await porductModal.create(req.body);
            res.status(200).json({ message: "Product Add successfully", product: addProduct })

            break;
        case 'PATCH':
            const updateProduct = await porductModal.findByIdAndUpdate({ _id: req.body._id }, req.body);
            res.status(200).json({ message: "Product update successfully", product: updateProduct })

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
