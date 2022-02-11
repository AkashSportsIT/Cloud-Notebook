const express = require('express');
const mongodb = require('./Mongoose/Mongodb')
const app = express()
var dotenv = require('dotenv')
const UserRouter = require('./Routes/User.route')
const NoteRouter = require('./Routes/Note.route')
var cors = require('cors')
app.use(cors())

// configuaration of dotenv
dotenv.config()

// middleware
app.use(express.json())                                                                                                                                                                                                                                                                                                                                                                                     

// Routers
app.use('/api/auth',UserRouter)
app.use('/api/notes',NoteRouter)

// MongoDb
mongodb.connectDb(process.env.MONGO_URL)

// Server
app.listen(process.env.PORT,()=>{
    console.log("Server started at  " + process.env.PORT)
}) 