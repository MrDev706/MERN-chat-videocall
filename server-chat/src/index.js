const express = require('express');

const app = express()
const routes = require('./routes/routes')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const cors = require('cors');
const { sendMessage } = require('./controllers/chatController');
const chatModel = require('./models/chats')

const http = require('http').Server(app);
const io = require('socket.io')(http, {  cors: {
    origin: "*",
    credentials: true
  }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


mongoose.connect("mongodb+srv://ddutta706:Kp9AhM76EvHSQyYk@cluster0.levfaad.mongodb.net/chat-app-v-02", {
    useNewUrlParser: true
}).then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', routes)


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('setup', (userId)=>{
      socket.userId = userId
      console.log("scoket setUp complete :" + userId)
    })

    socket.on('join', (chatId)=>{
      socket.join(chatId)
      socket.emit("joined")
      console.log("scoket joined :" + socket.userId + "chatid" + socket.rooms)
    })

    ////////////////// new part////////////////////////

    // socket.on("i am ready", (chatid)=>{
    //   if(chatid.length>0){
    //     console.log("i am ready-server")
    //     socket.broadcast.to(chatid).emit("i am ready")
    //   }
    // })

    // socket.on("someone is calling you", (chatid)=>{
    //   console.log("someone is callingu")
      
    //     socket.broadcast.to(chatid).emit("someone is calling you", chatid)

    // })

////////////////////////////////////////////////////////////


    socket.on("new user", (data)=>{
           //console.log(data)
           socket.emit('msg', data)
           
    })


    socket.on('new message', async (data)=>{
          data.user = socket.userId
          let newdata = await chatModel.create(data) 
          io.to(data.roomId).emit('chat message', newdata)
           //socket.emit('chat message', newdata)
          console.log(newdata)
    })

    //Video calling Fetures

	socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    console.log("callng.....")
		socket.broadcast.to(userToCall).emit("calluser", { signal: signalData, from, name });
	});

    	socket.on("answercall", (data) => {
        console.log("answerng.....")
        socket.broadcast.to(data.to).emit("callaccepted", data.signal)
    	});

  })



http.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});