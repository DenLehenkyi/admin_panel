import { mongooseConnect } from "@/lib/mongoose";
import MyOrder from "@/models/Order";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    const orders = await MyOrder.find();
    res.json(orders);
  }
}
