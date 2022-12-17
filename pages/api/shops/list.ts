// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/conn'
import Shop from '../../../lib/models/Shop'
import Order from '../../../lib/models/Order'
type Data = {}
const connect = await dbConnect()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        query,
        method,
    } = req;
    switch (method) {
        case 'POST':
            res.status(400).json({ message: "GET method not supported" });
            break;
        case 'GET':
            let getShops = await Shop.find(query ?? {})
            getShops = await Promise.all(getShops.map(async shop => {
                const len = await Order.find({ shop: shop._id })
                const quantity = await Order.aggregate([
                    { $match: { shop: shop._id } },
                    { $group: { _id: null, quantity: { $sum: "$sell_quantity" } } }
                ])
                return { ...shop._doc, items: quantity[0] ?? { quantity: 0 } }
            }))
            res.status(200).json(getShops)

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
