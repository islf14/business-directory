import type { Request, Response } from 'express'
import { CategoryModel } from '../models/category.model.js'
import {
  validateCategory,
  validatePartialCategory
} from './category.validator.js'

export class CategoryController {
  //

  async index(_req: Request, res: Response) {
    try {
      const all = await CategoryModel.findAll()
      res.status(200).json(all)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error searching all:', m)
      res.status(500).json({ message: 'Error searching all' })
    }
    return
  }

  //

  async store(req: Request, res: Response) {
    // validate data and params
    if (!req.body) {
      res.status(400).json({ message: 'please enter valid values' })
      return
    }
    let valuesInput
    try {
      valuesInput = validateCategory(req.body)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ message: JSON.parse(m || '{}') })
      return
    }
    // data and file url to save
    const photo = req.file?.path
    const { name, description, slug, menu, ord } = valuesInput
    let field = ''
    let nval = ''
    let value: (number | string)[] = []

    if (name) {
      field = 'name'
      value.push(name)
    }
    if (description) {
      if (field) field += ', '
      field += 'description'
      value.push(description)
    }
    if (slug) {
      if (field) field += ', '
      field += 'slug'
      value.push(slug)
    }
    if (menu) {
      if (field) field += ', '
      field += 'menu'
      value.push(menu)
    }
    if (ord !== undefined) {
      if (field) field += ', '
      field += 'ord'
      value.push(ord)
    }
    if (photo) {
      if (field) field += ', '
      field += 'photo_url'
      value.push(photo)
    }
    for (let i = 1; i <= value.length; i++) {
      if (nval) nval += ', '
      nval += `$${i}`
    }

    try {
      const category = await CategoryModel.create({ field, nval, value })
      res.status(201).json(category)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error creating:', m)
      res.status(500).json({ message: 'Error registering category' })
    }
    return
  }

  //

  async show(req: Request, res: Response) {
    if (!req.params.id || isNaN(Number(req.params.id))) {
      res.status(400).json({ message: 'please enter valid id' })
      return
    }
    try {
      const result = await CategoryModel.find({ id: Number(req.params.id) })
      res.status(200).json(result)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error displaying:', m)
      res.status(500).json({ message: 'Error displaying product' })
    }
  }

  //

  async update(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ message: 'please enter valid values' })
      return
    }
    if (!req.params.id || isNaN(Number(req.params.id))) {
      res.status(400).json({ message: 'please enter valid id' })
      return
    }
    let valuesInput
    try {
      valuesInput = validatePartialCategory(req.body)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ message: JSON.parse(m || '{}') })
      return
    }

    const photo = req.file?.path
    const { name, description, slug, menu, ord } = valuesInput

    let field = ''
    let count = 0
    let value: (number | string)[] = []

    if (name) {
      count++
      field = `name = $${count}`
      value.push(name)
    }
    if (description) {
      count++
      if (field) field += ', '
      field += `description = $${count}`
      value.push(description)
    }
    if (slug) {
      count++
      if (field) field += ', '
      field += `slug = $${count}`
      value.push(slug)
    }
    if (menu) {
      count++
      if (field) field += ', '
      field += `menu = $${count}`
      value.push(menu)
    }
    if (ord) {
      count++
      if (field) field += ', '
      field += `ord = $${count}`
      value.push(ord)
    }
    if (photo) {
      count++
      if (field) field += ', '
      field += `photo_url = $${count}`
      value.push(photo)
    }

    try {
      const result = await CategoryModel.update({
        id: Number(req.params.id),
        field,
        value
      })
      if (!result) throw new Error('no rows were changed')
      res.status(200).json(result)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error updating:', m)
      res.status(500).json({ message: 'Error updating category' })
    }
  }

  //

  async destroy(req: Request, res: Response) {
    if (!req.params.id || isNaN(Number(req.params.id))) {
      res.status(400).json({ message: 'please enter valid id' })
      return
    }
    try {
      const result = await CategoryModel.delete({
        id: Number(req.params.id)
      })
      if (!result) throw new Error('no rows were deleted')
      res.status(204).json(result)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error creating:', m)
      res.status(500).json({ message: 'Error deleting product' })
    }
  }

  //
}
