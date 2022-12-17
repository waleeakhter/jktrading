import { Schema, models, model } from "mongoose";
import { date } from "./Order"
// Creating a Schema for uploaded files
const ProductSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date(date).toISOString(),
  },
  name: {
    type: String,
    required: [true, "product name required"],
    index: true,
    uppercase: true
  },
  purchased_price: {
    type: Number,
    required: [false, "purchased price value is required"],
  },
  sell_price: {
    type: Number,
    required: [false, "selling price value is required"],
    default: 0,
  },
  quantity: {
    type: Number,
    required: [true, "quantity value is required"],
  },
  fixed_quantity: {
    type: Number,
    required: [true, "quantity value is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "category id is required"],
  },

}, { timestamps: true });

// Creating a Model from that Schema
export default models.Product || model("Product", ProductSchema);
