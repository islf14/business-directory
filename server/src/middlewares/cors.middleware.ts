import cors from 'cors'
import type { StaticOrigin } from '../types.js'

const ACCEPTED_ORIGINS = ['http://localhost:5173', 'http://localhost:4173/']

export const corsMiddleware = (whitelist: string[] = ACCEPTED_ORIGINS) => {
  return cors({
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, origin?: StaticOrigin) => void
    ) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
}
