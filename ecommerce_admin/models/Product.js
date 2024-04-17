import mongoose, { model, Schema } from "mongoose";


const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{type:String}],
  subcategory: {type:mongoose.Types.ObjectId, ref:'SubCategory'},
  pages: {type: Number},
  feedback: {type:mongoose.Types.ObjectId, ref:'Feedback'},
  rate:  {type: Number},

  file: [{ name: String, url: String }], 
});

const Product = mongoose.models.Product || model('Product', ProductSchema);

export default Product;
