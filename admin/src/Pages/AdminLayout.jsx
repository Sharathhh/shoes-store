import React from 'react'
import {  Link, Outlet } from 'react-router-dom'
import Navbar from '../Components/Naavbar/Navbar'


function AdminLayout() {
  return (
   <div>
      <Navbar/>
      <Outlet />

   </div>

  )
}

export default AdminLayout