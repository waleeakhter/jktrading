// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/conn'
import Order from '../../../lib/models/Order'
import Product from '../../../lib/models/Product';
import Shop from '../../../lib/models/Shop';
import Category from '../../../lib/models/Category';
type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        query,
        method,
    } = req;
    await dbConnect()
    switch (method) {
        case 'POST':
            res.status(400).json({ message: "POST method not supported" });
            break;
        case 'GET':
            let q = { ...query };
            const date: any = q?.createdAt ?? ""
            q = date && { createdAt: new Date(date).toISOString() }
            delete q['googlesheet']
            console.log(q, "query.googlesheet")
            const orders = await Order.find({ ...q }).sort({ createdAt: -1 }).populate([{
                path: 'product', model: Product, populate: {
                    path: 'category',
                    model: Category
                }
            }, { path: 'shop', model: Shop }])
            const refine = orders.map(order => {
                return {
                    shop: order.shop.name,
                    product: order.product.name,
                    quantity: order.sell_quantity,
                    price: order.product.sell_price,
                    discount: order.total_discount,
                    total_Price: order.total_amount,
                    category: order.product.category.name,

                }
            })
            // const sortOrders = refine.sort((a, b) => {
            //     if (a.shop > b.shop) return 1;
            //     if (a.shop < b.shop) return -1;
            //     return 0;
            // });
            const groupOrders = refine.reduce((result: any, item) => ({
                ...result,
                [item.shop]: [...(result[item.shop] || []), item]
            }), {});
            res.status(200).json(query?.googlesheet ? groupOrders : orders)
            // res.send(query.googlesheet ? groupOrders : orders)

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
