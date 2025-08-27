// src/app.ts
import express from 'express'
import { config } from 'dotenv'
import routes from './routes'
import cors from "cors"





config()
const app = express()
//app.use(cors()) //permite requisição de QUALQUER ORIGEM
app.use(cors({origin: "http://127.0.0.1:5500"}))
app.use(express.json())
app.use(routes)

export default app