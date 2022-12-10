
const express = require('express')
const cnt = require('../controllers/chatController')
const userCnt = require('../controllers/userController')
const router = express.Router()


router.get('/chatlist/:userId',cnt.getChatList)

router.post('/sendmsg/:roomId', cnt.sendMessage)

router.get('/getmessages/:roomId', cnt.getMsg)




router.post('/user', cnt.createUser)    //01

router.post('/login', userCnt.login)    //01

router.post('/room/:userId', cnt.createRoom)    //03

router.get('/users/:userId', cnt.getUser)   //02

router.get('/allusers', userCnt.getAllUsers)

router.get('/room/:roomId', cnt.getRoom)

module.exports = router
