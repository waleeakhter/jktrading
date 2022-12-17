import { Schema, models, model } from "mongoose";
export const date = new Date().toLocaleDateString()

// Creating a Schema for uploaded files
const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date(date).toISOString(),
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, "Product id is required"],
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: [true, "Shop id is required"],
  },
  condition: {
    type: String,
    required: false,
    uppercase: true
  },
  reference: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  total_discount: {
    type: Number,
    required: true,
    default: 0,
  },
  sub_total: {
    type: Number,
    required: true,
    default: 0,
  },
  total_amount: {
    type: Number,
    required: true,
    default: 0,
  },
  sell_price: {
    type: Number,
    required: true,
    default: 0,
  },
  sell_quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    required: true,
  },

}, { timestamps: true });

// Creating a Model from that Schema
export default models.Order || model("Order", OrderSchema);
