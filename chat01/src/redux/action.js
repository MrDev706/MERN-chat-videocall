

export const setUser = (user) =>{
    //console.log("actionnnnn")
    return {type: "SET_USER", payload: user}

}


export const setToken = (token)=>{
    return {
        type: "set_token",
        payload: token
    }
}


export const setChats = (msg)=>{
    return {type: "chats", payload: msg}
}
export const clearChats = ()=>{
    return {type: "clearchats"}
}


export const setSelectedChat = (user)=>{
    return {type: "SET_SELECTED_CHAT", payload: user}
}



export const newMsg = (msg)=>{
    return {type: "NEW_MSG", payload: msg}
}
