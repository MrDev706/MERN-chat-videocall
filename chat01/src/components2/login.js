
import { useSelector, useDispatch } from 'react-redux'
import React, {useState,useEffect} from 'react';
import{ setUser} from '../redux/action'
import {login} from '../helper/getMessages'
import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
let socket = io('http://localhost:3001')

export default function Login(){
    const [email, SetEmail] = useState("")
    const [pass, SetPass] = useState("")
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const navigate = useNavigate()
    


    const handleSubmit = async (e) =>{
        e.preventDefault();

        let userInfo = await login(email, pass)
        console.log(userInfo.data.data)
        let data = userInfo.data.data 
        data.socket = socket
        console.log(socket)
        socket.emit('setup', data.user._id)
        
            dispatch(setUser(data))
            navigate('/chat')
        
    }




    return (

        <div className='login-container'>
         <form method="post" onSubmit={handleSubmit}>
            <input type="text" placeholder='email..' name="email" onChange={(e)=>SetEmail(e.target.value)} value={email} className='email' />
            <input type="text" placeholder='Password..' onChange={(e)=>SetPass(e.target.value)} value={pass}name="pass" className='pass' />
            <button type="submit" id="submit-btn">LOGIN</button>
         </form>
         <h1>{state.user.email}</h1>
        </div>
        
    )
}