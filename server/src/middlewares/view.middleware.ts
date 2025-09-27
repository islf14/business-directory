import type { NextFunction, Request, Response } from 'express'
import { RolModel } from '../models/rol.mole.js'

export async function viewMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // view
  // create
  // update
  // delete

  const user = req.session?.user
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    //
    const result = await RolModel.permissionByUserId({
      user_id: user.id,
      permission_name: 'view'
    })
    if (result.length > 0) {
      return next()
    } else {
      return res.status(401).json({ message: 'Unauthorized, no permits' })
    }
  } catch (e: unknown) {
    let m: string = ''
    if (e instanceof Error) m = e.message
    console.log('View middleware error:', m)
    return res.status(500).json({ message: 'View Middleware Error' })
  }
}
