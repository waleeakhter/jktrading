import { Schema, models, model } from "mongoose";

// Creating a Schema for uploaded files
const ProductSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "product name required"],
    index: true
  },
  purchased_price: {
    type: Number,
    required: [true, "purchased price value is required"],
  },
  sell_price: {
    type: Number,
    required: [true, "selling price value is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity value is required"],
  },
  fixed_quantity: {
    type: Number,
    required: [true, "quantity value is required"],
  },
  condition: {
    type: String,
    required: [true, "condition value is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "category id is required"],
  },

}, { timestamps: true });

// Creating a Model from that Schema
export default models.Product || model("Product", ProductSchema);
