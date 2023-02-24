
const initialState = {incomingCall: false, call: {}}

const callReducer = (state=initialState, action) =>{
    switch (action.type) {
        case "setCall":
            console.log("call reducer called")
            return {isReceivingCall: true, call: action.payload}
        default:
            return state;

    }
}
export default callReducer