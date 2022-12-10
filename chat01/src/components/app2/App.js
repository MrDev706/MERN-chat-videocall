import logo from './logo.svg';
import './App.css';
import {Login} from './components/login'
import {SignUP} from './components/signUp'
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  reset,
  logIn,
  logOut,
} from "./components/store/action.js";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
const style1 = {
  width: "280px",
  heigth: "400px"

}

function App() {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();
  const fun1=()=>{
    "state"
  }

  return (
    <>    <div className="container" style={style1}>
        
         <Router>           
              <Routes>
                <Route exact path="/Login" element={<Login fun={fun1} />} />
                <Route exact path="/Signup" element={<SignUP />} />
              </Routes>            
         </Router>
         <h2>{counter}</h2>
       
         <button onClick={() => dispatch(increment())}>Login</button>
      <button onClick={() => dispatch(decrement())}>Logout</button>
         </div>

    </>
  );
}

// const mapStateToProps = (state) =>{
//   msg: state
// }

export default App;
