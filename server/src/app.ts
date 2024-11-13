import express from 'express'
import 'dotenv/config'
import usersController from './controllers/users'
import missilesController from './controllers/missiles'
import organizationsController from './controllers/organizations'
import { connectToMongo } from './config/db'

const PORT = process.env.PORT || 3000

const app = express()

connectToMongo()
app.use(express.json())

app.use('/api/users', usersController)
app.use('/api/missiles', missilesController)
app.use('/api/organizations', organizationsController)

app.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`)
})