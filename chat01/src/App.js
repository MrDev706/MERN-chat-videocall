import logo from './logo.svg';
import './App.css';
//import  Login  from './components/login'
//import { SignUP } from './components/signUp'
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  reset,
  logIn,
  logOut,
} from "./components/store/action.js";
import SideHo from "./side1";

import Login from './components2/login';
import SignUP from './components2/signup';

import Sidebar from './sidebar';
import {Link} from 'react-router-dom'
//import Chat from './chat';
import NewChat from './Chat11.js'
import ChatHome from './chatHome'
import Profile from './components2/profile'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React, { useState} from 'react';
import LoginNew from './components2/loginNew';
const style1 = {
  width: "280px",
  heigth: "400px"

}


function App() {
  // const counter = useSelector((state) => state);
  const dispatch = useDispatch();


  return (
    <>
    <Router> 
    <div className='app'>
      
      <div className='app_body'>
      
      
               {/* <Sidebar/> */}
               
              <Routes>
                {/* <Route exact path="/chat/:chatid" element={<NewChat />} />
                <Route exact path="/chat" element={<NewChat />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUP />} />
                  */}
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/loginNew" element={<LoginNew />} />
                  <Route exact path="/signup" element={<SignUP />} />
                  <Route exact path="/chat/*" element={<ChatHome/>} />

                {/* <Route exact path="/sidebar" element={<Sidebar />} /> */}
                {/* <Route exact path="/profile" element={<Profile />} /> */} 
                             
              </Routes>            
            
       

         {/* <NewChat />  */}

        
         

     

      </div>

    </div>
    </Router> 




    </>
  );
}

// const mapStateToProps = (state) =>{
//   msg: state
// }

export default App;
