import { Request,Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Category } from "../models/Category";

export class CategoryController{
    private categoryRepository = AppDataSource.getRepository(Category);

    async list(req:Request,res:Response){
        const categorys = await this.categoryRepository.find({relations:['product']});

        return res.json(categorys);
    }

    async create(req:Request,res:Response){
        const {name} = req.body;
        const category = this.categoryRepository.create({name});
        await this.categoryRepository.save(category);

        return res.status(201).json(category)

    }
}