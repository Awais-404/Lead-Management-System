require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const leadRoutes = require('./routes/leads.js')
const userRoutes = require('./routes/users.js')

const app = express()
const port = 4000


// Middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// Routes
app.get('/',(req, res)=>{
    res.json({msg:"Hello from the server"})
})
app.use('/api/leads', leadRoutes)
app.use('/api/user', userRoutes)



// Connect to database and start server
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to database")
    app.listen(port,()=>{
        console.log("Listening on port:", port)
    })
}).catch((err)=>{
    console.log(err)
})