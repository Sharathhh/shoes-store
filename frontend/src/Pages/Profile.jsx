import { UserButton,useUser} from '@clerk/clerk-react'
import React, { useState } from 'react'
import './CSS/Profile.css'


function Profile() {
    const { isSignedIn, user } = useUser();

    const[sidebar,setsidebarState]=useState(false)


    const sidebarToggle=()=>{
      
      window.location.href='/profile'

    }
    const sidebarToggle2=()=>{
      setsidebarState(false)
      window.location.href='/myorders'
    }
    
  return (
    
    <div className='profile'>
        {isSignedIn?
      <div className="profile-main">
        

        <div className="profile-side-bar">
          <div className='btn-profile'><button onClick={sidebarToggle}>Account</button></div>
          <div className='btn-profile'><button onClick={sidebarToggle2}>My Orders</button></div>

        </div>
      
        {sidebar?(<h1>MY orders</h1>):(<div className="profile-content">
           <img src={user.imageUrl} alt="" />
           <div className="user-details">
           <p class='fw-bold font-size'>  {user.username}</p>
           <p class='fw-bold'>  {user.emailAddresses[0].emailAddress}</p>

           </div>
           
        </div>)}
        
        </div>:null}
    </div>
    

  )
}

export default Profile