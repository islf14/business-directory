import type { Request, Response } from 'express'
import { UserModel } from '../models/user.model.js'
import { validatePartialUser, validateRegister } from './auth.validator.js'
import type { Auth } from '../types.js'
import bcrypt from 'bcrypt'

export class UserController {
  //

  async index(_req: Request, res: Response) {
    try {
      const all = await UserModel.findAll()
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
    if (!req.body) {
      res.status(400).json({ message: 'please enter valid values' })
      return
    }
    let values: Auth
    try {
      values = validateRegister(req.body) as Auth
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ error: JSON.parse(m || '{}') })
      return
    }

    const { name, email, password } = values

    try {
      const userExists = await UserModel.findByEmail({ email })
      if (userExists) {
        res.status(400).json({ message: 'Email already in use' })
        return
      }
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error registering:', m)
      res.status(500).json({ message: 'Error verifying user' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const result = await UserModel.create({ name, email, hashedPassword })
      const { password, ...userWithoutPassword } = result
      console.log('Registered user')
      res.status(201).json(userWithoutPassword)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error registering:', m)
      res.status(500).json({ message: 'Error registering user' })
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
      const result = await UserModel.find({ id: Number(req.params.id) })
      res.status(200).json(result)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error displaying:', m)
      res.status(500).json({ message: 'Error displaying user' })
    }
  }

  //

  async update(req: Request, res: Response) {
    // validate data
    if (!req.body) {
      res.status(400).json({ message: 'Please enter valid values' })
      return
    }
    if (!req.params.id || isNaN(Number(req.params.id))) {
      res.status(400).json({ message: 'Please enter valid id' })
      return
    }
    let valuesInput
    try {
      valuesInput = validatePartialUser(req.body)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ error: JSON.parse(m || '{}') })
      return
    }
    if (Object.keys(valuesInput).length === 0) {
      res.status(400).json({ message: 'Please enter values' })
      return
    }

    // search user
    let user
    try {
      user = await UserModel.find({ id: Number(req.params.id) })
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error verifying:', m)
      res.status(500).json({ message: 'Error verifying user' })
      return
    }

    // create sql
    const { name, email, password } = valuesInput
    let field = ''
    let count = 0
    let value: (number | string)[] = []

    if (name && name !== user.name) {
      count++
      field = `name = $${count}`
      value.push(name)
    }
    if (email && email !== user.email) {
      try {
        const userExists = await UserModel.findByEmail({ email })
        if (userExists) {
          res.status(400).json({ message: 'Email already in use' })
          return
        }
      } catch (e: unknown) {
        let m: string = ''
        if (e instanceof Error) m = e.message
        console.log('Error verifying:', m)
        res.status(500).json({ message: 'Error verifying user' })
        return
      }
      // email is different
      count++
      if (field) field += ', '
      field += `email = $${count}`
      value.push(email)
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      count++
      if (field) field += ', '
      field += `password = $${count}`
      value.push(hashedPassword)
    }

    // update user
    try {
      const result = await UserModel.update({
        id: Number(req.params.id),
        field,
        value
      })
      if (!result) throw new Error('no rows were changed')
      const { password, ...userWithoutPassword } = result
      res.status(200).json(userWithoutPassword)
      return
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error updating:', m)
      res.status(500).json({ message: 'Error updating user' })
      return
    }
  }

  //

  async delete(_req: Request, _res: Response) {
    //
  }

  //
}
