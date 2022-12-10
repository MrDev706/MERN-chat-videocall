
const initialState = {user: {_id:""}, token:"788", socket:{id:""}, chats: [], selectedChat: {userInfo: {}, chats: []}}

const reducer = (state=initialState, action) =>{
    switch (action.type){
        case "SET_USER":
            console.log("actionnnnn")
            return {...state, user: action.payload.user, token: action.payload.token, socket: action.payload.socket}

        // case "SET_TOKEN":
        //     return {...state, token: action.payload.token}

        case "chats":
            let temp = state.chats
            temp.push(...action.payload.data)
            //console.log(action.payload.data)
            return {...state, chats: temp}
        case "NEW_MSG":
            let tempchat = state.chats
            tempchat.push(action.payload) 
            return {...state, chats: tempchat}
        case "SET_SELECTED_CHAT":
            return {...state, selectedChat: action.payload}

        case "clearChats":
            return { ...state, chats: []}

          default:
            return state
    }
}


export default reducer