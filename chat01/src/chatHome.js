import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
  import NewChat from './Chat11.js'
  import Sidebar from './sidebar';

 export default function ChatHome(){

    return(
        <>
        
              <Sidebar/>
              {/* <NewChat /> */}
              
              <Routes> 
                 <Route exact path="allchat/:chatid" element={<NewChat />} />
                 <Route exact path="/allchat" element={<NewChat />} />                             
               </Routes>            
        
       
        </>
    )
}