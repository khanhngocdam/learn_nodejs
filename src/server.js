import express from 'express'
import * as dotenv from 'dotenv'
import {userRouter, studentRouter} from './routes/index.js'
import connect from './databases/database.js'
import checkToken from './authentication/auth.js'
dotenv.config()
const app = express()
app.use(checkToken)
const port = process.env.PORT || 3000
app.use(express.json())
app.use('/users', userRouter)
app.use('/students', studentRouter)
app.get('/', (req, res) => {
    res.send('Response')
})
app.listen(port, async() => {
    await connect()
    console.log(`Listening on port: ${port}`)
})
