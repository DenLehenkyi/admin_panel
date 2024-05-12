import mongoose, { model } from "mongoose";

const myOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  totalPrice: { type: Number, required: true },
  createdAt: { type: String, default: new Date().toLocaleString('uk-UA') },
  status: {
    type: String,
    enum: ["В очікуванні", "Успішно", "Скасовано"],
    default: "В очікуванні",
  },
});

let MyOrder;

try {
  MyOrder = model("MyOrder");
} catch (error) {
  MyOrder = model("MyOrder", myOrderSchema);
}

export default MyOrder;
