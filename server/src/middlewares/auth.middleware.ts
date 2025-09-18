import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// Extend Express Request type to include 'session'
declare module 'express-serve-static-core' {
  interface Request {
    session?: {
      user?: any
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token
  // token from authorization
  if (req.headers.authorization) {
    const auth = req.headers.authorization
    if (auth.toLowerCase().startsWith('bearer ')) {
      token = auth.substring(7)
    }
  }
  // token from cookie
  if (req.cookies && req.cookies.access_business) {
    token = req.cookies.access_business
  }
  //
  req.session = { user: null }
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET ?? '')
      req.session.user = user
      return next()
    } catch (e: unknown) {
      let m: string = ''
      if (e instanceof Error) m = e.message
      console.log('Auth middleware error:', m)
    }
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
