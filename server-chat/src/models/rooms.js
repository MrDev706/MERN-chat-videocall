const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const newSchema = new mongoose.Schema({
    users: [{type: objectId, ref: 'user'}],
    description: String,
    topic: String,
    isGroup: {type: Boolean, default: false}

}, {timestamps: true})

module.exports = mongoose.model('room', newSchema)