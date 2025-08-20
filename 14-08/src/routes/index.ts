import { Router,Request,Response } from 'express';
import { UserController } from '../controller/UserController';
import { PostController } from '../controller/PostController';
import { ProductController } from '../controller/ProductController';
import { CategoryController } from '../controller/CategoryController';

const routes = Router();
const userController = new UserController();
const postController = new PostController();
const productController = new ProductController();
const categoryController = new CategoryController()

routes.get('/users', (req,res) => userController.list(req,res));
routes.get('/products',(req,res) => productController.list(req,res))
routes.get('/categorys', (req,res) => categoryController.list(req,res))
routes.post('/users', (req,res) => userController.create(req,res));
routes.post('/posts', (req,res) => postController.create(req,res));
routes.post('/products',(req,res) => productController.create(req,res));
routes.post('/categorys',(req,res) => categoryController.create(req,res));




export default routes;