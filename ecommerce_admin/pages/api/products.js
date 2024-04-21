import Product from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import {isAdminRequest } from "./auth/[...nextauth]";
import { Feedback } from "@/models/Feedback";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req,res);
  
  if (method === 'GET') {
    try {
      if (req.query?.id) {
        const product = await Product.findOne({ _id: req.query.id });
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } else {
        const products = await Product.find();
        res.json(products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  if (method === "POST") {
    const { productName, description, price, images, category, subcategory,pages, file, feedback, schoolClass, rate } = req.body;
  
      const productDoc = await Product.create({
        productName,
        description,
        price,
        images,
        category,
        subcategory,
        file,
        pages,
        feedback,
        schoolClass,
        rate,
      });
      res.json(productDoc);
    
  }
  if (method === "PUT") {
      
    const { productName, description, price, images, _id, category,subcategory, pages, file, feedback, schoolClass, rate } = req.body;

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
        subcategory,
        pages,
        file: updatedFile, // Оновлюємо поле file
        feedback,
         schoolClass, 
         rate,
      }
    );
    res.json(true);
  }
  if (method === 'DELETE') {
    if (req.query?.id) {
  
        const product = await Product.findOne({ _id: req.query.id });
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        await Feedback.deleteMany({ _id: { $in: product.feedback } });

        await Product.deleteOne({ _id: req.query.id });

    } else {
      return res.status(400).json({ message: 'Missing product ID' });
    }
  }
}
