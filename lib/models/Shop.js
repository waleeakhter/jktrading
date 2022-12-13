import { Schema, models, model } from 'mongoose';
const ShopSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        uppercase: true
    }
}, { timestamps: true })

export default models.Shop || model("Shop", ShopSchema)