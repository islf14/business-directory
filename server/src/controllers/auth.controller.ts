import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateLogin, validateRegister } from './auth.validator.js'
import type { Auth } from '../types.js'
import { UserModel } from '../models/user.model.js'
import { RolModel } from '../models/rol.mole.js'

export class AuthController {
  //

  async register(req: Request, res: Response) {
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

  async login(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ message: 'please enter valid values' })
      return
    }
    let values: Auth
    try {
      values = validateLogin(req.body) as Auth
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('error validating values')
      res.status(400).json({ error: JSON.parse(m || '{}') })
      return
    }

    try {
      // find user in db
      const user = await UserModel.findByEmail({ email: values.email })
      if (!user) {
        res.status(400).json({ message: 'Invalid email or password' })
        return
      }
      // validate password
      const valid = await bcrypt.compare(values.password, user.password)
      if (!valid) {
        res.status(400).json({ message: 'Invalid email or password' })
        return
      }
      // get roles
      const rol = await RolModel.roleNameByUserId({ id: user.id })

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET ?? '',
        { expiresIn: '1h' }
      )
      const { password, ...userWithoutPassword } = user
      const data = {
        user: userWithoutPassword,
        rol,
        token
      }
      res
        .status(200)
        .cookie('access_business', token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        })
        .json(data)
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Login Error:', m)
      res.status(500).json({ message: 'Login error' })
    }
    return
  }

  //

  async logout(_req: Request, _res: Response) {
    // logout logic
  }

  //
}
