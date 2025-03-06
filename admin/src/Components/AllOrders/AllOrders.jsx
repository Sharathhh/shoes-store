import React, { useEffect, useState } from 'react';
import './AllOrders.css'; 
import { Link } from 'react-router-dom';
function AllOrders() {
    const [allOrders, setAllOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

  const handleStatusChange=async(orderId,newStatus)=>{

    const response=await fetch('http://localhost:4000/setstatus',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderId,status:newStatus})
    })
  }

    const fetchAllOrders = async () => {
        try {
            const response = await fetch('http://localhost:4000/allorders');
            const data = await response.json();
            console.log(data)

            if (response.ok) {
                setAllOrders(data.allOrders);
                setAllProducts(data.all_products);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, );



    return (
        <div className='allorders-container'>

            {allOrders.length>0?(

                <div className="allorders-inner-container">
                    <div className='all-order'>
                    <div className='orders-list-header'>
                    <p class='fw-bold'>OrderId</p>
                    <p class='fw-bold'>User Name </p>
                    <p class='fw-bold'>Order Date</p>
                    <p class='fw-bold'>Status:</p>
                    </div>
                   
                    {allOrders.map((order,index)=>(
                        <div className='orders-list-body' key={index}>
                           <Link to={`userdetails/${order._id}`}> <a >{order._id}</a> </Link>
                            <p> {order.name}</p>
                            <p>{order.Date.slice(0,10)}</p>
                            <select value={order.status} className='order-status-dropdown' onChange={(e)=>{
                                window.alert("Are you sure?")
                                handleStatusChange(order._id,e.target.value)
                            } }>
                                <option value="Ordered">Ordered</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Deliverd">Delivered</option>
                            </select>
                        </div>
                    ))}
                    </div>
                </div>
            ):<p>No order</p>}
            
        </div>
    );
}

export default AllOrders;
