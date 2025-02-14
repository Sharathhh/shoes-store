import React, { useEffect } from 'react'
import '../Pages/CSS/LoginSignUp.css'
import { SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";
import Profile from './Profile';


function LoginSignUp() {
  const { isSignedIn, user } = useUser();



  return (
  
    <div className='login-signup'>
         <div className='inner-login'>
      {isSignedIn?<Profile/>:
      <SignIn/> }
    </div>
      

    </div>
  )
}

export default LoginSignUp