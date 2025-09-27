import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { viewMiddleware } from '../middlewares/view.middleware.js'

export const userRoute = Router()
const userController = new UserController()
userRoute.get('/', viewMiddleware, userController.index)
