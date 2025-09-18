import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller.js'

export const categoryRoute = Router()
const categoryController = new CategoryController()
categoryRoute.get('/', categoryController.index)
categoryRoute.post('/', categoryController.store)
categoryRoute.get('/:id', categoryController.show)
categoryRoute.put('/:id', categoryController.update)
categoryRoute.delete('/:id', categoryController.destroy)
