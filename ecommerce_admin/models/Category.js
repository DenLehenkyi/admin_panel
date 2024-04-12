import mongoose, { model, Schema } from "mongoose";


const CategorySchema = new Schema({
  categoryName: { type: String, required: true },
  parentCategory: {type:mongoose.Types.ObjectId, ref:'Category'},
});

export const Category = mongoose.models?.Category || model('Category', CategorySchema);


