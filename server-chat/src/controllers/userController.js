const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')



const login = async function(req, res){
    const{ email, password} = req.body
    if(!email || !password){
        return res.send({status: false, error: "PLEASE ENTER FIELDS"})
    }
    console.log(req.body) 

    let user = await userModel.findOne({email: email, password: password}).select("-password")

    if(!user){
        return res.send({status: false, error: "email & password is wrong"})
    }

    let payload = {
        userId: user._id.toString(),
        type: "user"
    }

    let token = jwt.sign(payload, "Debu-chat-app")

    return res.send({status: true, data: {user: user, token: token}})

}


const getAllUsers = async function(req, res){
    let data = await userModel.find();
    return res.send({status: true, data: data})
}

module.exports ={ login, getAllUsers}