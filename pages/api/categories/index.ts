// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import categoriesSchema from '../../../lib/models/Category'
type Data = {
    data: Array<Object>
}
const connect = await dbConnect()
console.log(connect)
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<Object>>
) {
    const getCategories = await categoriesSchema.find({})
    res.status(200).json(getCategories)
}
