import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()

import cookieParser from 'cookie-parser'
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './DB/dataBase.js'
const PORT = process.env.PORT || 5000; 

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(cookieParser())
app.use(express.static('public/'))




app.use('/api', userRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})