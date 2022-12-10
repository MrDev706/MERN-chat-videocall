const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const newSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    image: String,
    password: String,
  


},{timestamps: true})

module.exports = mongoose.model('user', newSchema)