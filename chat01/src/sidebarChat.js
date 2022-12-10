
import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import './sidebarChat.css';
import {Link} from 'react-router-dom';

 function SidebarChat({chatid, name, addNewChat}){
const [seed, setSeed] = useState("");
const [message, setMessage] = useState("Hi dev I love u")

useEffect(()=>{
    setSeed(Math.floor(Math.random() * 5000))

},[])


    return(
         <Link to={`/chat/allchat/${chatid}`} key={chatid}>
         <div className="sidebarChat">
           <Avatar src={`https://avatars.dicebear.com/api/human/364.svg`}/> 
            <div className="sidebarChat_infok">
               <h2>{name}</h2>
                <p>hi this is</p>
            </div>
       </div>
     </Link>
    )
}
export default SidebarChat