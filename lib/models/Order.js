import { Schema, models, model } from "mongoose";
const date = new Date().toLocaleDateString()

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
  discount: {
    type: Number,
    required: true,
  },
  total_discount: {
    type: Number,
    required: true,
  },
  sub_total: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  sell_quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Creating a Model from that Schema
export default models.Order || model("Order", OrderSchema);
