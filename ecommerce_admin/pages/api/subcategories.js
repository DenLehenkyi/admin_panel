import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import {isAdminRequest } from "./auth/[...nextauth]";
import SubCategory from "@/models/SubCategory";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    
    await isAdminRequest(req,res);
  
  
    if (method === "POST") {
      const { subCategoryName,parentCategory } = req.body;
      const categoryDoc = await SubCategory.create({
        subCategoryName,
        parentCategory:parentCategory || undefined ,
      });
      res.json(categoryDoc);
    }
    
    if (method === 'GET') {
      res.json(await SubCategory.find().populate('parentCategory'));
    }
    if(method === 'PUT'){
      const { categoryName,parentCategory, _id } = req.body;
      const categoryDoc = await SubCategory.updateOne(
        {_id},
        {
        categoryName,
        parentCategory:parentCategory || undefined ,
      });
      res.json(categoryDoc);
    }
    if(method === 'DELETE'){
    
        const {_id} = req.query
        await SubCategory.deleteOne({_id:_id});
        res.json("ok");
      
    }
  }
  