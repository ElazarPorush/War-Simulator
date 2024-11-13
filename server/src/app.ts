import express from 'express'
import 'dotenv/config'
import users from './controllers/users'
import missiles from './controllers/missiles'
import organizations from './controllers/organizations'
import { connectToMongo } from './config/db'

const PORT = process.env.PORT || 3000

const app = express()

connectToMongo()

app.use('/api/users', users)
app.use('/api/missiles', missiles)
app.use('/api/organizations', organizations)

app.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`)
})