import mongoose, { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

const Product = mongoose.models.Product || model('Product', ProductSchema);

export default Product;
