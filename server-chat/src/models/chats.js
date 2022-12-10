const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const newSchema = new mongoose.Schema({
    roomId : {
        type: objectId,
        ref: 'room'
    },
    message: String,
    user: String
    

},{timestamps: true})

module.exports = mongoose.model('chat', newSchema)