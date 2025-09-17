import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'

export const authRoute = Router()
const authController = new AuthController()
authRoute.post('/register', authController.register)
authRoute.post('/login', authController.login)
