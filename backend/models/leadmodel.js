const mongoose = require('mongoose')

const Schema = mongoose.Schema

const leadSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}, 
    phone: {type: String, required: true}, 
    status: {type: String, enum:["new","contacted","converted"], default:"new", required: true},
    assignedTo: {type: String, required: true},
    user_id: {type: String, required: true}
},  {timestamps: true})

module.exports = mongoose.model('lead',leadSchema)