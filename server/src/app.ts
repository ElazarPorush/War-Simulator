import express from 'express'
import 'dotenv/config'
import usersController from './controllers/users'
import attacksController from './controllers/attacks'
import { connectToMongo } from './config/db'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'
import { handleConnection } from './sockets/io'

const PORT = process.env.PORT || 3000

const app = express()
const httpServer = http.createServer(app)
export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
})

io.on("connection", handleConnection)

connectToMongo()

app.use(express.json())
app.use(cors())

app.use('/api/users', usersController)
app.use('/api/attacks', attacksController)

httpServer.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`)
})