import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

// Перевірка, чи модель 'Product' вже скомпільована
export const Product = models.Product || model('Product', ProductSchema);