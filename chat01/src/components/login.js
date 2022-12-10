import React, { useState, useEffect } from 'react';


export const Login = (props) => {
    const [title, SetTitle] = useState('');
    const[desp, SetDescp] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if(!title || !desp){
            console.log("ddddd")
        }
        props.fun(title)

        //Login(title, desp)

    }

        return (
             <>
   <form onSubmit={submit}>
  <div className="form-group">
    <label htmlFor="title">Login Page</label>
    <input type="text" className="form-control" id="title"value={title} onChange={(e) => SetTitle(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>
  <div className="form-group">
    <label htmlFor="descp">Todo Description</label>
    <input type="text" className="form-control" id="descp" value={desp} onChange={(e) => SetDescp(e.target.value)} placeholder="Password" />
  </div>
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>        
             </>
        )
        }