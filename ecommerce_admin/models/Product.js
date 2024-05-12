import mongoose, { model, Schema } from "mongoose";


const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  subcategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  pages: { type: Number },
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
  schoolClass: String,
  rate:  {type: Number},
  file: [{ name: String, url: String }], 
});

const Product = mongoose.models.Product || model('Product', ProductSchema);

export default Product;
