
import mongoose from "mongoose";
import Product from "@/models/Product"
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const { productName, description, price } = req.body;
    const productDoc = await Product.create({
      productName,
      description,
      price,
    });
    res.json(productDoc);
  }
}
