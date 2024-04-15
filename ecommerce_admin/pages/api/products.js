import Product from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import {isAdminRequest } from "./auth/[...nextauth]";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
 await isAdminRequest(req,res);
  
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { productName, description, price, images, category, pages, file } = req.body;
  
      const productDoc = await Product.create({
        productName,
        description,
        price,
        images,
        category,
        pages,
        file,
      });
      res.json(productDoc);
    
  }
  if (method === "PUT") {
    const { productName, description, price, images, _id, category, pages, file } = req.body;

    // Перетворюємо file на масив, якщо він не є масивом
    const updatedFile = Array.isArray(file) ? file : [file];

    await Product.updateOne(
      { _id },
      {
        productName,
        description,
        price,
        images,
        category,
        pages,
        file: updatedFile, // Оновлюємо поле file
      }
    );
    res.json(true);
  }
  if(method === 'DELETE'){
    if(req.query?.id){
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    } 
  }
}
