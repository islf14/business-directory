import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './public/photos/')
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

export const categoryRoute = Router()
const categoryController = new CategoryController()
categoryRoute.get('/', categoryController.index)
categoryRoute.post('/', upload.single('photo'), categoryController.store)
categoryRoute.get('/:id', categoryController.show)
categoryRoute.put('/:id', upload.single('photo'), categoryController.update)
categoryRoute.delete('/:id', categoryController.destroy)
