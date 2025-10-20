import 'dotenv/config'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { authRoute } from './routes/auth.route.js'
import { categoryRoute } from './routes/category.route.js'
import { authMiddleware } from './middlewares/auth.middleware.js'
import { userRoute } from './routes/user.route.js'
import { corsMiddleware } from './middlewares/cors.middleware.js'
import { csp } from './middlewares/csp.middleware.js'
import { ecors } from './middlewares/errorCors.middleware.js'
import path from 'node:path'

const app = express()
const port = process.env.PORT ?? 3000

app.use(corsMiddleware()) // validate cors
app.use(ecors()) // catch cors error
app.use(json())
app.use(cookieParser())
app.use(csp()) // Content Security Policy (CSP)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public/dist')))

app.use('/auth', authRoute)
app.use('/users', authMiddleware, userRoute)
app.use('/categories', authMiddleware, categoryRoute)
app.get('/welcome', (_req, res) => {
  console.log('welcome')
  res.status(200).json({ message: 'welcome' })
})

app.get('{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`)
})
