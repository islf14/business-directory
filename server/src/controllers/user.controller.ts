import type { Request, Response } from 'express'

export class UserController {
  //

  async index(_req: Request, res: Response) {
    console.log('in index')
    res.status(200).json({ message: 'holi' })
  }
  //
}
