import type { Request, Response } from 'express'
import { UserModel } from '../models/user.model.js'

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
}
