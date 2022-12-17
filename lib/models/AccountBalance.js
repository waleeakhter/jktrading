import { Schema, models, model } from 'mongoose';
const BalanceSchema = new Schema({
    name: {
        type: String,
        required: false,
        uppercase: false,
        default: "JK Trading"
    },
    balance: {
        type: Number,
        required: true,
        index: true,
        default: 0
    },
    expense: {
        type: Number,
        required: true,
        index: true,
        default: 0
    }
}, { timestamps: true })

export default models.Balance || model("Balance", BalanceSchema)