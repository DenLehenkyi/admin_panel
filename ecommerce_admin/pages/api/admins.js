import { mongooseConnect } from "@/lib/mongoose";
import { Admins } from "@/models/Admins";
import MyOrder from "@/models/Order";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { email } = req.body;
        const existingAdmin = await Admins.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ success: false, error: "Admin already exists" });
        }
        const newAdmin = await Admins.create({ email });
        res.status(201).json({ success: true, data: newAdmin });
      } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
      break;
    case "GET":
      try {
        const admins = await Admins.find();
        res.status(200).json({ success: true, data: admins });
      } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.body;
        const admin = await Admins.findByIdAndDelete(id);
        if (!admin) {
          return res.status(404).json({ success: false, error: "Admin not found" });
        }
        res.status(200).json({ success: true, data: admin });
      } catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
