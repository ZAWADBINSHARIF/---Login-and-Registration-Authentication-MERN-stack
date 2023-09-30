// external import
import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'

// internal import
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import dbConnection from './configs/dbConnection.js'

// for getting the values of .env file
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

// for getting cookies
app.use(cookieParser())

// for database connection
dbConnection()

// for getting json data
app.use(express.json())

// for getting form data values
app.use(express.urlencoded({ extended: true }))


const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'frontend', 'dist')))

// this is API router for CURD oparation
app.use('/api/users', userRoutes)

// this router works for sending front end data
app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))



// 404 Not Found Page
app.use(notFound)

// error handler middleware
app.use(errorHandler)


// when database connection is connected successfully then server will run
mongoose.connection.once('open', () => {
    console.log('Database is connected')
    app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`))
})