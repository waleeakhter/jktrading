// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/conn'
import paymentModal from '../../../lib/models/Payments'
import Balance from "../../../lib/models/AccountBalance"
import Shop from '../../../lib/models/Shop'
type Data = {}
const connect = await dbConnect()
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method, query } = req;
    switch (method) {
        case 'GET':
            const getPayment = await paymentModal.find({ ...query }).populate({ path: "shop", model: Shop }).sort({ createdAt: -1 });
            res.status(200).json(getPayment)
            break;
        case 'POST':
            const shop = await Shop.findById({ _id: req.body.shop })
            console.log(shop.credit, "shop.debit")
            if (shop.credit < req.body.received) {
                res.status(400).json({ debitError: "Received Amount is greater than Debit Amount", received: req.body.received })
                return
            }
            paymentModal.create(req.body, (err: Data, pay: { received: number }) => {
                if (err) { res.status(400).json({ message: "errors", err: err }); return }
                shop.credit = (shop.credit ?? 0) - pay.received;
                shop.debit = (shop.debit ?? 0) + pay.received;
                shop.save()
                Balance.findOneAndUpdate({ name: 'JK Trading' }, { $inc: { 'balance': pay.received } }, { new: true },
                    function (err, blanc) {
                        if (err) { res.status(400).json({ message: "errors", err: err }); console.log(err, " err"); return }
                        if (!blanc) {
                            Balance.create({ balance: pay.received })
                        }
                        res.status(200).json({ message: "Payment Added successfully", shop: shop, payment: pay })
                        // do something
                    })
            })





            break;
        case 'PATCH':
            res.status(400).json({ message: "PATCH method not supported" });
            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
