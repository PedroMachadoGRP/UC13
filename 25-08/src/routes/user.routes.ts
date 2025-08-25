import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()
const controller = new UserController()
/*
router.get('/', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.remove.bind(controller))
*/

//LIST: normalmente só admins podem listar todos os usuarios
router.get('/', controller.list.bind((controller)))

//PROFILE do usuario logado
//le as infos
router.get('/me', authMiddleware,controller.getById.bind(controller))

//Atualiza as infos
router.put('/me',authMiddleware, controller.update.bind(controller))

//Remove
router.delete('/me',authMiddleware, controller.remove.bind(controller))

//CREATE: permite cadastro de novo usuario (não precisa estar logado)
router.post('/', controller.create.bind(controller))




export default router