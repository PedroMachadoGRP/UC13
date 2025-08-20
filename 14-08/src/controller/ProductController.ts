import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Category } from "../models/Category";
import { Product } from "../models/Product";

export class ProductController {
    private productRepository = AppDataSource.getRepository(Product);
    private categoryRepository = AppDataSource.getRepository(Category);

    async list(req: Request, res: Response) {
        const products = await this.productRepository.find({ relations: ['category'] })
        return res.json(products)
    }

    async create(req: Request, res: Response) {
        const { name, price, category} = req.body;
        const categoryid = await this.categoryRepository.findBy({id: category});
        if(!categoryid) return res.status(404).json({message : 'invalid category'});

        const product = this.productRepository.create({ name, price, category });
        await this.productRepository.save(product);
        return res.status(201).json(product)
    }
}