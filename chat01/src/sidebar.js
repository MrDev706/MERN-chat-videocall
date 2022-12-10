import "./sidebar.css"
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./sidebarChat";
import SideHo from "./side1";
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { getChatList } from "./helper/getMessages";
import { useSelector } from "react-redux";
 function Sidebar(){

    const [chatList, SetChatList] = useState([])
    const state = useSelector((state)=>state)
    const user = state.user._id

    useEffect(()=>{
        getChatList(user).then(res=> SetChatList(res.data.data))
    },[])

    return(
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/577.svg`}/>
                <h3>{state.name}</h3>
                <Link to="/chat">chat</Link>
                <Link to="/login">LogIn</Link>
                <Link to="/signup">SignUp</Link>
                <Link to="/profile">SignUp</Link>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebar_chats">
                 <SidebarChat key="12244" chatid="34233" name="hey dev"/> 
                 {chatList.map(ch=>(<SidebarChat key="12244" chatid={ch._id} name={ch.users[0].name==state.user.name?ch.users[1].name:ch.users[0].name} /> ))}

                <p>{}</p>
                {/* <Link to="/chat/devv">  <SideHo key="1234" id="1224" str="adfgh" name="dev"/> </Link>
                <Link to="/chat/0000"><SideHo key="1234" id="1224" str="abcd" name="dev "/> </Link> */}
                <p>ddddddddddd</p>
                <p>ddddddddddd</p>
                <p>ddddddddddd</p>
            </div>
            
        </div>
    );
}
export default Sidebar
