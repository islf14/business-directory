import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'

export const userRoute = Router()
const userController = new UserController()
userRoute.get('/', userController.index)
