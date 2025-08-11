import { Router } from "express";
import { ProdutosController } from "../controllers/ProtudoController";

const router = Router();

const controller = new ProdutosController();

router.get('/produtos', controller.listAllProdutoss);
router.post('/produtos', controller.createProdutos);
router.put('/produtos/:id', controller.updateProdutos);
router.delete('/produtos/:id', controller.deleteProdutos);

export default router;