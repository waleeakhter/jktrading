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
            porductModal.findOne({ name: req.body.name, category: req.body.category }, (err: Data, product: {
                fixed_quantity: number, quantity: number, save: Function
            }) => {
                if (err) {
                    res.status(500).json({ message: "Something Went Wrong", errors: err })
                    return
                }
                console.log(product, "req.body.quantity")
                if (product) {
                    product.quantity = product.quantity + req.body.quantity;
                    product.fixed_quantity = product.fixed_quantity + req.body.fixed_quantity;
                    product.save()
                    res.status(208).json({ message: "Item successfully updated", product: product })
                    return;
                }
                porductModal.create(req.body, (err: Data, newProduct: Object) => {
                    res.status(201).json({ message: "Item successfully added ", product: newProduct })
                });


            })
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
