// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import orderModal from '../../../lib/models/Order'
import porductModal from '../../../lib/models/Product'
import allowCors from '../allowCors'
type Data = {}
const connect = await dbConnect()
console.log(connect)
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req;
    const updateOrder = () => {
        orderModal.findByIdAndUpdate(req.body._id, { status: req.body.status },
            function (err, order) {
                if (err) {
                    console.log(err)
                    res.status(401).json(err)
                }
                else {
                    res.status(200).json({ successMessage: "Order added to paid list successfuly", order: order })
                    console.log("Updated Order : ", order);
                }
            });
    }
    const deleteOrder = () => {
        console.log("Deleted Order check : ", req.body);
        orderModal.findOneAndDelete({ _id: req.body._id }, function (err: Data, order: { sell_quantity: number }) {
            if (err) {
                console.log(err)
                res.status(401).json(err)
            } else {
                porductModal.findOne({ _id: req.body.product._id }, (err: Data, product: { quantity: number, save: Function }) => {
                    if (err) {
                        res.status(500).json({ errorMessage: "Something went wrong", erros: err })
                    } else {
                        product.quantity = product.quantity + order.sell_quantity
                        product.save()
                        res.status(200).json({ successMessage: "Order removed successfuly", order: order })
                    }
                });

            }
        })
    }
    switch (method) {
        case 'GET':
            res.status(400).json({ error: "GET method not supported" });
            break;
        case 'POST':
            if (!req.body._id && (!req.body.status || !req.body.delete)) res.status(401).json({ error: "Somthing Went Wrong" });

            req.body.status ? updateOrder() : null;
            req.body.delete ? deleteOrder() : null;

            break;
        default:
            res.status(401).json({ errorMessage: "Not Authorized" });
            break;
    }


}
allowCors(handler)