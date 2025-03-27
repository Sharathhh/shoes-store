import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cart from './Cart'
import '../Pages/CSS/OrderSuccess.css'

function OrderSuccess() {
  const {navigate}=useNavigate()
  return (
    <div class='d-flex justify-content-center align-items-center flex-column min-vh-100'>
    <h1 class='text-center p-5'>Order Success</h1>
    <Link to='/myorders'><button class='btn btn-primary align-middle '>View Order</button></Link>
    </div>
      
  )
}

export default OrderSuccess
