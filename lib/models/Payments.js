import { Schema, models, model } from 'mongoose';
import { date } from "./Order"
const PaymentSchema = new Schema({
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: [true, "Shop id is required"],
    },
    received: {
        type: Number,
        required: true,
        index: true,
        default: 0
    },
    panding: {
        type: Number,
        required: true,
        index: true,
        default: 0
    },
    createdAt: {
        type: Date,
        index: true,
        default: new Date(date).toISOString()
    }
})

export default models.Payment || model("Payment", PaymentSchema)