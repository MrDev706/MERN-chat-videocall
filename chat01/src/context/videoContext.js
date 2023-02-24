import { createContext } from "react";
import { useSelector } from "react-redux";
import React, {useState,useEffect} from 'react';
import { useRef } from "react";
import Peer from 'simple-peer'
import { useParams } from "react-router-dom";



const SocketContext = createContext()

const ContextProvider = ({ children }) => {
    const socket = useSelector((state)=> state.gReducer.socket)

    const [callAccepted, setCallAccepted] = useState(false);
    const [isAudioAvailable, setAudioAvailability] = useState(true);
    const [isVideoAvailable, setVideoAvailability] = useState(true);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState("");
    const call = useSelector(state=>state.callReducer.call)
    //const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const {chatid} = useParams()
  
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();



    useEffect(() => {
      setStream(null);
  
      if (isVideoAvailable || isAudioAvailable) {
        navigator.mediaDevices
          .getUserMedia({ video: isVideoAvailable, audio: isAudioAvailable })
          .then(currentStream => {
            setStream(currentStream);
  
            if (isVideoAvailable) myVideo.current.srcObject = currentStream;
          });
      }
  
      if (!isVideoAvailable) {
        stream?.getVideoTracks()[0].stop();
      }
    }, [isVideoAvailable, isAudioAvailable]);

    // useEffect(() => {
    //   //socket.on("me", id => setMe(id));
      


    //   socket.on("calluser", ({ from, name: callerName, signal }) => {
    //     console.log("calling a user......")

    //     setCall({ isReceivingCall: true, from, name: callerName, signal })
    //   });
    // }, []);
    const callUser = (id) =>{
      console.log("calling..")
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on("signal", data => {
        socket.emit("calluser", {
          userToCall: id,
          signalData: data,
          from: chatid,
          name
        });
      });

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", signal => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  
    }

    const answerCall = () => {
        setCallAccepted(true);
        console.log("answering a user cal........")
    
        const peer = new Peer({ initiator: false, trickle: false, stream });
    
        peer.on("signal", data => {
          socket.emit("answercall", { signal: data, to: call.from });
        });
    
        peer.on("stream", currentStream => {
          userVideo.current.srcObject = currentStream;
        });
    
        peer.signal(call.signal);
    
        connectionRef.current = peer;
      };

      const leaveCall = () => {
        setCallEnded(true);
    
        connectionRef.current.destroy();
    
        window.location.reload();
      };


    return(
     <SocketContext.Provider
      value={{
        isAudioAvailable,
        isVideoAvailable,
        setAudioAvailability,
        setVideoAvailability, 
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall
      }}
    >
      {children}
    </SocketContext.Provider>
    )
}

export {SocketContext, ContextProvider}