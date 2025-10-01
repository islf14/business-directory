import 'dotenv/config'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { authRoute } from './routes/auth.route.js'
import { categoryRoute } from './routes/category.route.js'
import { authMiddleware } from './middlewares/auth.middleware.js'
import { userRoute } from './routes/user.route.js'
import { corsMiddleware } from './middlewares/cors.middleware.js'

const app = express()
const port = process.env.PORT ?? 3000

app.use(corsMiddleware())
app.use(json())
app.use(cookieParser())
app.use(express.static('public'))

app.use('/', authRoute)
app.use('/user', authMiddleware, userRoute)
app.use('/category', authMiddleware, categoryRoute)

app.get('/w', (_req, res) => {
  console.log('welcome')
  res.status(200).json({ message: 'welcome' })
})

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`)
})
