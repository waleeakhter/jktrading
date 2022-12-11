// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/conn'
import Order from '../../../lib/models/Order'
import Product from '../../../lib/models/Product';
import Shop from '../../../lib/models/Shop';
type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        query: { googlesheet },
        method,
    } = req;
    await dbConnect()
    switch (method) {
        case 'POST':
            res.status(400).json({ message: "POST method not supported" });
            break;
        case 'GET':
            const orders = await Order.find({}).populate([{ path: 'product_id', model: Product }, { path: 'shop_id', model: Shop }])
            const refine = orders.map(order => {
                return { Shop: order.shop_id.shop_name, Product: order.product_id.product_name, Quantity: order.sell_quantity, Price: order.total_amount, }
            })
            const sortOrders = refine.sort((a, b) => {
                if (a.Shop > b.Shop) return 1;
                if (a.Shop < b.Shop) return -1;
                return 0;
            });
            res.status(200).json(googlesheet === "true" ? sortOrders : orders)



            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
