import './chat.css';
import React, {useState,useEffect} from 'react';
import { useNavigate, redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getMessages, getRoom} from './helper/getMessages';
//import io from 'socket.io-client'


import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, ScreenLockLandscapeTwoTone, SearchOutlined} from '@material-ui/icons';
import VideoCallIcon from '@material-ui/icons/VideoCall'


import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { clearChats, newMsg, setChats, setCall } from './redux/action';
import { reset } from './components/store/action';

import ProfileModal from './components2/profileModal';

//let socket = io('http://localhost:3001')

export default function NewChat(){
    




    const [input, setInput] = useState("");
    const {chatid} = useParams();
    const dispatch = useDispatch()
    const state = useSelector((state) => state.gReducer)
    const chats = useSelector((state)=> state.gReducer.chats)
    const socket = useSelector((state)=> state.gReducer.socket)
    const [notification, SetNotification] = useState("")
    const navigate = useNavigate()
    const[room, setRoom] = useState({})
    const[sender, setSender] = useState({})
    const isReceivingCall = useSelector(state => state.callReducer.isReceivingCall)


    useEffect(()=>{

        dispatch(clearChats())
        socket.emit('join', chatid)
        getMessages(chatid).then((res)=>dispatch(setChats(res)))
        getRoom(chatid).then((res)=> {
            setRoom(res)
            console.log(res) 
            let snd = state.user._id==res.users[0]._id?res.users[1]:res.users[0]
            console.log(snd)
        
            setSender(snd)
           
        })

        console.log("chat idchanched") 


    },[chatid])


    //console.log( "room" + room)

    useEffect(()=>{
        socket.on('chat message', (data)=>{
            dispatch(newMsg(data))  
            console.log("got a new masg")
 
        })

        ////new portion///
        socket.on("calluser", ({ from, name: callerName, signal }) => {
            console.log("calling a user......")
    
            dispatch(setCall({ from, name: callerName, signal }))
          });



        ////////
        
    }, []) 




    //const [msg, setMsg] = useState(["hi", "Hellow", "What are u doing mr."])
    //socket.emit("new user", "DEv200")

   const showProf = function(){
         navigate('/profile')
   }

    const sendMsg = (e)=>{
        e.preventDefault()
        
                socket.emit('new message', 
                { roomId: chatid,
                message: input })
                console.log("message: " + input)
                setInput("")

    }
    
    return (
        <div className='chat'>
            <div className='incoming-call'>{
                //
                isReceivingCall ?<div>answer this call<button onClick={()=>navigate('/videocall')}>Answer</button></div>: ""
            
            }
            </div>
            <div className='chat_header'>
                <h2>{sender.name}</h2>
            <ProfileModal user={sender}/>
            
                
            <Avatar src={`https://avatars.dicebear.com/api/human/5677.svg`}/>
               
            
                <div className='chat_headerInfo'>
                    <h3 className='chat-room-name'>{}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen ..
                        
                    </p>
                </div>
  
                <div className="chat_headerRight">
                    <IconButton>
                        <VideoCallIcon onClick={()=> navigate(`/videocall/${chatid}`)}/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                    <AttachFile/>
                    </IconButton>
                    
                </div>
                
            </div>
            <div className='chat_body'>
                {/* <h1>{chatid}, {chats.length}</h1> */}
                {/* <div className='chat_message'> */}
                    {
                        chats.map(m =>(
                            
                        <p className= {`chat_message ${m.user==sender._id?'chat_receiver':''}`}>{m.message}</p>
                       
                        ))
                    }

               
            </div>
            <div className='chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMsg}> Send a Message</button>
                </form>
                <MicIcon/>
            </div>
            
        </div>
    )
}