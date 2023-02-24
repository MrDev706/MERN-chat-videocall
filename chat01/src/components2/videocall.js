
import { Button } from "@material-ui/core";
import { CallToAction, VideoCallTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/videoContext";
import { useContext } from "react";
import './video.css'
import { useSelector } from "react-redux";




/////



///






export default function VideoCall(){

    const socket = useSelector((state)=> state.socket)
    const {chatid} = useParams();
    const[recording, setRecording] = useState(false)

 /////////////////////////////

 const handleRecord = async () => {
    // console.log('record')
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    })
    // Needed for better browser support 
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
      ? "video/webm; codecs=vp9"
      : "video/webm"

    let mediaRecorder = new MediaRecorder(stream, { mimeType: mime })
    setRecording(true)
    


    let chunks = []
    mediaRecorder.addEventListener('dataavailable', ({ data }) => chunks.push(data))

    mediaRecorder.addEventListener('stop', function () {
      let blob = new Blob(chunks, {type: chunks[0].type})
      let url = URL.createObjectURL(blob)
      setRecording(false)

      let a = document.createElement('a')
      a.href = url
      a.download = 'video.webm'
      a.click()
    })


    mediaRecorder.start()
  }

 //////////////////////////////////////////////////////
    

    const {
        
        callAccepted,
        myVideo,
        userVideo,
        callUser,
        answerCall,
        leaveCall,
        callEnded,
        stream,
        call
      } = useContext(SocketContext);


      
    return (
        <div className="video-container">
            {recording?(<h2>Recording is on..</h2>) : ""}
            <div className="video-section">
                <div className="user-video box">
                    <h2>user Video</h2>
                    <video width="420" height="300" autoPlay controls ref={myVideo}>
      
                     </video>
                </div>


                <div className="receiver-video box">
                    <h2>Video coming</h2>

                    <video width="320" height="240" autoPlay controls ref={userVideo}>
      
                    </video>
                    
                    {/* <video
                    className=""
                    playsInline
                    muted
                    ref=""
                    style={{width:"320", height:"240"}}
                    autoPlay
                    /> */}

                </div>

            </div>
            <div className="controlls">
                <button onClick={()=>leaveCall()}>End call</button>
                <Button onClick={()=>callUser(chatid)}>call user</Button>
                <Button onClick={()=>answerCall()}>answer a call</Button>
                <Button onClick={handleRecord}>Record screen</Button>

            </div>
            {recording?(<h1 style={{position: "absolute", bottom: "100px", right: "100px", color: "red"}}>Recording is on..</h1>) : ""}
        </div>

    )
}
