import mongoose, { model, Schema } from "mongoose";


const CategorySchema = new Schema({
  categoryName: { type: String, required: false }
});

export const Category = mongoose.models?.Category || model('Category', CategorySchema);


