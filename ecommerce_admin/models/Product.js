import mongoose, { model, Schema } from "mongoose";


const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  pages: {type: Number},

  file: [{ name: String, url: String }], 
});

const Product = mongoose.models.Product || model('Product', ProductSchema);

export default Product;
