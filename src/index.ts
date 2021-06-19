import { PORT } from './config/app'
import { DB_URI } from './config/mongodb'
import express from 'express'
import { createServer } from 'http'
import WebSocket from 'ws'
import cors from 'cors'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/error-middleware'
import router from './router'
import wsHandler from './ws-handlers'

const app = express()
const server = createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    wss.on('connection', wsHandler)

    server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
