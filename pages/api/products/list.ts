// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/conn'
import Product from '../../../lib/models/Product'
import Category from '../../../lib/models/Category'
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
            console.log(query, "query")
            Product.find({}, (err: Data, product: Array<{ category: { name: string } }>) => {
                const products = query.category ? product.filter(pro => {
                    return pro.category.name === query.category
                }) : product
                // console.log(filterProduct)

                res.status(200).json(products)
                res.end()
            }).sort({ createdAt: -1 }).populate([{ path: 'category', model: Category, select: ['name'] }])
            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
