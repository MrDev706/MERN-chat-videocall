import { FunctionsRounded } from '@material-ui/icons'
import axios from 'axios'
import Login from '../components2/login'
export async function getMessages(id){
    const{data} = await axios.get(`http://localhost:3001/getmessages/${id}`)
    console.log(data.data)
    if(!data){

        return {status: false, data: []}
        
    }else{
        return {status: true, data: data.data}
    }

}

export async function userInfo(userId){
    let {data} = axios.get('api/user/{usrId}')
    if(data){
        return {status: true, data: data}
    }else{
        return {status: false}
    }
} 


export async function getChatList(userId){
    let user = "6369d134959e5990e67d8e0d"
    const {data} = await axios.get(`http://localhost:3001/chatlist/${user}`)
    console.log(data)

    if(data){
        return {data:data}
    }
}


export async function login(email, pass){
    console.log(email)
    let user = await axios.post('http://localhost:3001/login', {email: email, password: pass})
    console.log(user)
    
    if(user){
        return {status: true, data: user.data}
    }else{
        return {status: false}
    }

}
export async function signUp(data){
    let result = await axios.post("http://localhost:3001/user", data)
    return result.data.data
}

export async function getRoom(chatid){
    let {data} = await axios.get(`http://localhost:3001/room/${chatid}`)
    console.log(data.data)
    return data.data
}