import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../../assets/breadcrum_arrow.png'
import { useNavigate } from 'react-router-dom';
import ProductDisplay from '../ProductDisplay/ProductDisplay';

function Breadcrums(props) {

    const navigate= useNavigate();

    const {product}= props;
  return (
    <div className='breadcrum'>
        <button className='btn-home' onClick={()=>navigate('/')}>Home</button><img src={arrow_icon} alt="" /> <button className='btn-home' onClick={()=>navigate(`/${product.category}`)}>{product.category}</button> <img src={arrow_icon} alt="" /><button className='btn-home'>{product.name}</button>
        <div>
            <ProductDisplay product={product}/>
        </div>
    </div>
  )
}

export default Breadcrums