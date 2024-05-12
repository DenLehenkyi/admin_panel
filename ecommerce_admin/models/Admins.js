import mongoose, { model, Schema } from "mongoose";



const AdminSchema = new Schema({
 email: String,
});

export const Admins = mongoose.models?.Admins || model('Admins', AdminSchema);


