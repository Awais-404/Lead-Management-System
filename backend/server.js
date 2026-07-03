const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, '.env') })
dotenv.config({ path: path.resolve(__dirname, '.env.example') })

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const leadRoutes = require('./routes/leads.js')
const userRoutes = require('./routes/users.js')

const app = express()
const port = process.env.PORT || 4000


// Middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// Routes
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