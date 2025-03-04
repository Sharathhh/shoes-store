import React from 'react'
import './UserDetails.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
function UserDetails() {

    const {orderId}=useParams()
    const [orderDetails,setOrderDetails]=useState({})
    const [allProducts,setAllProducts]=useState([])



    const fetchOrderDetails=async()=>{
       const response= await fetch(`http://localhost:4000/findorder/${orderId}`)
        const data= await response.json()
        console.log(data)
        setAllProducts(data.all_products)
        setOrderDetails(data.Order)
        

    }


    useEffect(()=>{
        fetchOrderDetails()
    },[])



    console.log(orderDetails)



  return (
    <div className='user-details'>
        <div className='user-details-header'>
            <p class='fw-bold'>Order Id</p>
            <p class='fw-bold'>User Id</p>
            <p class='fw-bold'> User Name</p>
            <p class='fw-bold'>Phone</p>
            <p class='fw-bold'>Address</p>
            <p class='fw-bold'>Payment Method</p>
            <p class='fw-bold'>Status</p>
        </div>
        <hr />




        <div className='user-details-body'>
           <p>{orderDetails._id}</p>
           <p>{orderDetails.userId}</p>
            <p>{orderDetails.name}</p>
            <p>{orderDetails.phone}</p>
            <p>{orderDetails.address}</p>
            <p>{orderDetails.paymentMethod}</p>
             <p>Ordered</p>
        </div>
        <hr />
        <div className='cartitems-details-container'>
          <h1 className='cartitems-headercartitems-header'>Cart Items</h1>
          <div className='cartitems-details-inner-container'>
           
          <div className='cartitems-details-header'>
                    <p class='fw-bold'>Id</p>
                    <p class='fw-bold'>Product Name</p>
                    <p class='fw-bold'>Image</p>
                    <p class='fw-bold'>category</p>
                    <p class='fw-bold'>New price</p>
                  </div>
             {allProducts.map((e)=>{
              if (orderDetails.cartItems[e.id]>0){

                return (<div className='cartitems-details-body'>
                  <p>{e.id}</p>
                  <p>{e.name}</p>
                  <img src={e.image} alt="" />
                  <p>{e.category}</p>
                  <p>${e.new_price}</p>
                  <p></p>


                </div>)
                
                
              }
             })}
        
             </div>
             <h2>Total Amount:   ${orderDetails.amount} </h2>
            
              
              
        </div>
        
      
      



    </div>
  )
}

export default UserDetails