import React, { useEffect, useRef, useState } from 'react'
import './Popular.css'
import data_product from '../../assets/data'
import Item from '../Item/Item'



function Popular() {
    const [popularProducts,setPopularProducts]=useState([])

    useEffect(()=>{

      fetch('http://localhost:4000/popularinwomen')
      .then((resp)=>resp.json()).then((data)=>setPopularProducts(data))
    })
    


  return (
    <div id='women' className='popular'>
        <h1>Elevate your Style</h1>
        <p>"Sharp Looks, Smooth Moves."</p>
   
        <div className="latest-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}/>

            })}


        </div>

    </div>
  )
}

export default Popular