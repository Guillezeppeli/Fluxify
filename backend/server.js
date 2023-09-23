import './config.js'
import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
