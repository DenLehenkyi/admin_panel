import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  
  if (method === "POST") {
    const { categoryName,parentCategory,properties } = req.body;
    const categoryDoc = await Category.create({
      categoryName,
      parentCategory:parentCategory || undefined ,
      properties,
    });
    res.json(categoryDoc);
  }
  
  if (method === 'GET') {
    res.json(await Category.find().populate('parentCategory'));
  }
  if(method === 'PUT'){
    const { categoryName,parentCategory,properties, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      {_id},
      {
      categoryName,
      parentCategory:parentCategory || undefined ,
      properties,
    });
    res.json(categoryDoc);
  }
  if(method === 'DELETE'){
  
      const {_id} = req.query
      await Category.deleteOne({_id:_id});
      res.json("ok");
    
  }
}
