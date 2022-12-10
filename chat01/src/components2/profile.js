
import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile(){
    const user = useSelector(state=> state.user)




    return (
        <div>
             <h2>This is {user.name}</h2>
             
             <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Image: {user.image}</p>
            <p>Phone: {user.phone}</p>
             

        </div>
    )
}