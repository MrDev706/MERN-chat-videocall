import './chat.css';
import React, {useState,useEffect} from 'react';
import { useNavigate, redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getMessages, getRoom} from './helper/getMessages';
//import io from 'socket.io-client'


import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, ScreenLockLandscapeTwoTone, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { clearChats, newMsg, setChats } from './redux/action';
import { reset } from './components/store/action';

import ProfileModal from './components2/profileModal';

//let socket = io('http://localhost:3001')

export default function NewChat(){
    




    const [input, setInput] = useState("");
    const[selectId, setSelectId] = useState("i l u")
    const {chatid} = useParams();
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const chats = useSelector((state)=> state.chats)
    const socket = useSelector((state)=> state.socket)
    const navigate = useNavigate()
    const[room, setRoom] = useState({})
    const[sender, setSender] = useState({})

    useEffect(()=>{
        setSelectId(chatid)
        dispatch(clearChats())
        socket.emit('join', chatid)
        getMessages(chatid).then((res)=>dispatch(setChats(res)))
        getRoom(chatid).then(res=> {
            setRoom(res) 
            let snd = state.user._id==room.users[0]._id?room.users[1]:room.users[0]
        
            setSender(snd) 
           
        })


    },[chatid])


    //console.log( "room" + room)

    useEffect(()=>{
        socket.on('chat message', (data)=>{
            dispatch(newMsg(data))            
        })
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
            <div className='chat_header'>
                <h2>{sender.name}</h2>
            <ProfileModal user={sender}/>
            
                
            <Avatar src={`https://avatars.dicebear.com/api/human/5677.svg`}/>
               
            
                <div className='chat_headerInfo'>
                    <h3 className='chat-room-name'>{state.user.email}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen ..
                        
                    </p>
                </div>
  
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
                
            </div>
            <div className='chat_body'>
                <h1>{chatid}, {chats.length}</h1>
                <div className='chat_message'>
                    {
                        chats.map(m =>(<p>{m.message}</p>))
                    }

                </div>

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