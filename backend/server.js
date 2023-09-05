// external import
import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

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

app.use('/api/users', userRoutes)

// 404 Not Found Page
app.use(notFound)

// error handler middleware
app.use(errorHandler)


// when database connection is connected successfully then server will run
mongoose.connection.once('open', () => {
    console.log('Database is connected')
    app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`))
})