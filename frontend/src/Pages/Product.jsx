import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

function Product() {

const {all_product} = useContext(ShopContext)
const {productId} = useParams();
const product=all_product.find((e)=>e.id=== Number(productId));



  return (
    <div className='product'>
    <Breadcrums product={product}/>

    <DescriptionBox/>
 
    <RelatedProducts/>
      

    </div>
  )
}

export default Product