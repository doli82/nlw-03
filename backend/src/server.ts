import './database/connection'
import 'express-async-errors'

import cors from 'cors'
import express from 'express'
import path from 'path'

import errorHandler from './errors/handler'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(3333)
