// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import ordersModal from '../../../lib/models/Order'
import Product from "../../../lib/models/Product"
import Shop from '../../../lib/models/Shop'
type Data = {}
const connect = await dbConnect()
console.log(connect)
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
            ordersModal.create(req.body, (err: Data, order: {
                total_amount: number,
                shop: string, sell_quantity: number
            }) => {
                if (err) {
                    res.status(400).json({ error: "Something went wrong", errors: err })
                } else {

                    Product.findOne({ _id: req.body.product }, (err: Data, product: { quantity: number, save: Function }) => {
                        if (err) {
                            res.status(500).json(err)
                        } else {
                            product.quantity = product.quantity - order.sell_quantity
                            product.save()
                            Shop.findById({ _id: order.shop }, (err: Data, shop: { credit: number, save: Function }) => {
                                shop.credit = (shop.credit ?? 0) + order.total_amount;
                                shop.save()
                                res.status(200).json({ message: "Order added successfuly", order: order, product: product })
                                res.end()
                            })
                        }
                    });
                }
            });

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
