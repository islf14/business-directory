import 'dotenv/config'
import express, { json } from 'express'
import { authRoute } from './routes/auth.route.js'
import { categoryRoute } from './routes/category.route.js'
// import { corsMiddleware } from './middlewares/cors.js'

const app = express()
const port = process.env.PORT ?? 3000

// app.use(corsMiddleware())
app.use(json())
app.use('/', authRoute)
app.use('category', categoryRoute)

app.get('/w', (_req, res) => {
  console.log('welcome')
  res.status(200).json({ message: 'welcome' })
})

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`)
})
