const chatModel = require('../models/chats')
const userModel = require('../models/userModel')
const roomModel = require('../models/rooms')



const createUser = async function(req, res){
    let data = req.body
    let result = await userModel.create(data)
    return res.send({status: true, data: result})

}

module.exports.createUser = createUser

const getUser = async function(req, res){
    let data = await userModel.findById(req.params.userId)
    if(data){
        return res.send({status: true, data: data})
    }
}

module.exports.getUser = getUser
/////////////


const createRoom = async function(req, res){
     let user = req.params.userId
    let body = req.body     //users, description, topic

    let newRoom = {
        users: [user, body.sender],
        description: body.description,
        topic: body.topic,
        isGroup: body.isGroup
    }
    let room = await roomModel.create(newRoom)
    if(room){
        return res.send({status: true, data: room})

    }
    
}

module.exports.createRoom = createRoom

const sendMessage = async function(req, res){
    let user = req.params.roomId
    
    let body = req.body   //roomId, user, msg
    // if(user!=req.body.user){
    //     return res.send({status: false, error: "You are sending a wrong request"})
    // }

    let result = await chatModel.create(body)

    return res.send({status: true, data: result})
}

module.exports.sendMessage = sendMessage

const getMsg = async function(req, res){
 
    const roomId = req.params.roomId
    let data = await chatModel.find({roomId: roomId}).sort({updatedAt: -1})

    if(!data){
        return res.send({status: false, error: "RoomId is Not available"})
    }
    return res.send({status: true, data: data})
}

module.exports.getMsg = getMsg


const getChatList = async function(req, res){
    let user = req.params.userId
    let list = await roomModel.find({users: {$elemMatch: {$eq: user}}}).populate('users', "-password").sort({updatedAt: -1})
    if(!list){
        return res.send({status: false, error: "no chat list"})
    }
    return res.send({status: true, data: list})

}

module.exports.getChatList = getChatList

const getRoom = async function(req, res){
    let id = req.params.roomId
    let data = await roomModel.findById(id).populate('users')
    if(!data){
        return res.send({status: false, error: "Room Id is invalid"})
    }
    return res.send({status: true, data: data})
}

module.exports.getRoom = getRoom



