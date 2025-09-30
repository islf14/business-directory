import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { viewMiddleware } from '../middlewares/view.middleware.js'

export const userRoute = Router()
const userController = new UserController()
userRoute.get('/', viewMiddleware, userController.index)
userRoute.post('/', userController.store)
userRoute.get('/:id', userController.show)
userRoute.put('/:id', userController.update)
userRoute.delete('/:id', userController.delete)
