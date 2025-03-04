import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import { useLocation } from 'react-router-dom'
function ListProduct() {

  const [all_products,setAllproducts]=useState([])

  
  const fetchInfo=async()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json()).then((data)=>{setAllproducts(data)})

    
    }
    useEffect(()=>{
      fetchInfo()
    },[])

    useEffect(()=>{
      document.body.style.overflow='auto'
      window.scrollTo(0,0)
    })


    const removeProduct=async(id)=>{
      await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
      })
      await fetchInfo()
    }
   



  return (
    <div className='listproduct'>
          <h1>All Products List</h1>
     <div className="listproduct-format-main">
     <p>Product</p>
     <p>Title</p>
     <p>Old Price</p>
     <p>New Price</p>
     <p>Category</p>
     <p>Remove</p>
     </div>
     <div className="listproduct-allproducts">
      <hr />
      {all_products.map((product,index)=>{
        return <> <div key={index} className='listproduct-format-main'>
          <img src={product.image} alt="" className="listproduct-product-icon" />
          <p>{product.name}</p>
          <p>{product.old_price}</p>
          <p>{product.new_price}</p>
          <p>{product.category}</p>
          <button onClick={()=>{removeProduct(product.id)}} type="button" class="btn btn-outline-secondary">Delete</button>

        </div>

        </>

      })}
        
    </div>
        </div>
  )
}

export default ListProduct