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
                const len = await Order.find({ shop_id: shop._id })
                const ammout = await Order.aggregate([
                    { $match: { shop_id: shop._id } },
                    { $group: { _id: null, amount: { $sum: "$total_amount" } } }
                ])
                return { ...shop._doc, total_orders: len.length, outstanding: ammout[0] ?? { amount: 0 } }
            }))
            console.log(getShops)
            res.status(200).json(getShops)

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
