import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
  subCategoryName: { type: String, required: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
