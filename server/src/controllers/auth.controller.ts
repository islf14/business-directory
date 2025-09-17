import type { Request, Response } from 'express'
import { validateAuth } from './auth.validator.js'
import type { Auth } from '../types.js'
import { UserModel } from '../models/user.model.js'

export class AuthController {
  //

  async register(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ message: 'please enter valid values' })
      return
    }
    let values: Auth
    try {
      values = validateAuth(req.body) as Auth
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ error: JSON.parse(m || '{}') })
      return
    }

    try {
      const userExists = await UserModel.findByEmail({ email: values.email })
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

    try {
      const result = await UserModel.create({ input: values })
      console.log('Registered user:', result)
      res.status(201).json({ message: 'User registered successfully' })
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Error registering:', m)
      res.status(500).json({ message: 'Error registering user' })
    }
    return
  }

  //

  async login(_req: Request, _res: Response) {
    // login logic
    console.log('login')
  }

  //

  async logout(_req: Request, _res: Response) {
    // logout logic
  }

  //
}
