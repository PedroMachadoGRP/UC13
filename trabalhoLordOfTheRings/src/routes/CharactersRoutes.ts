import express,{Router, NextFunction,Request,Response, Application} from 'express';
import { CharacterController } from '../controllers/CharactersController';

const router = Router();
const controller = new CharacterController();
const app:Application = express();


router.get('/characters/:id',controller.getById)
router.get('/characters',controller.listAll);
router.post('/characters',controller.create);
router.delete('/characters/:id',controller.delete);
router.put('/characters/:id',controller.update);


export default router;