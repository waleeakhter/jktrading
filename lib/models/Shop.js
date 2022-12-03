import { Schema, models, model } from 'mongoose';
const ShopSchema = new Schema({
    shop_name: {
        type: String,
        required: true,
        index: true
    }
})

export default models.Shop || model("Shop", ShopSchema)