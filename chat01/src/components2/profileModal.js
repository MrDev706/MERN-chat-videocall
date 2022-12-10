import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ProfileModal({user}){
    const slChat = useSelector(state=>state.selectedChat)




    return(
    <div>
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {
                <div>
                    <h2>This is {user.name}</h2>
                    
                    <p>Name: {user.name}</p>
                   <p>Email: {user.email}</p>
                   <p>Image: {user.image}</p>
                   <p>Phone: {user.phone}</p>
                    
       
               </div>


        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</div>




    )

}