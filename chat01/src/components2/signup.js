import React, {useState,useEffect} from 'react';
import { signUp } from '../helper/getMessages';


export default function SignUp(){
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = async() =>{
        let data ={name, email, phone, password: pass, image}
        let result = await signUp(data)
        
            console.log(result)

        
    }





    return (
        
        <div className='signup-container'>
            <h3>email: {email}, password: {pass}</h3>
                        <form method='post' >
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" placeholder="name" />
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="email" />
                <input type="text" value={pass} onChange={(e)=>setPass(e.target.value)} name="pass" placeholder="pass" />
                <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} name="phone" placeholder="phone" />
                <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} name="image" placeholder="image" />
                <button type='button' onClick={handleSubmit}>Register</button>
            </form>


        </div>
    )
}