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
            const getProducts = await Product.find(query ?? {}).populate([{ path: 'category', model: Category, select: ['name'] }])
            res.status(200).json(getProducts)
            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
