import React, { useState } from 'react'
import './AddProduct.css'
import add_image from '../../assets/add-image.png'

function AddProduct() {

    const [image,setImage]=useState(false)

    const imagechangeHandler=(e)=>{
        setImage(e.target.files[0])
    }


    const [productDetails,setproductDetails]=useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: "",
    })

    



    const ChangeHandler=(e)=>{
        setproductDetails({...productDetails,[e.target.name]:e.target.value})
    }



const Add_Product=async()=>{
     
    let product=productDetails;

    let responseData;
    console.log(productDetails)
    let formData=new FormData();
    formData.append('product',image)



    await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
            Accept: 'application/json'
        },
        body:formData
    }).then((resp)=>resp.json()).then((data)=>{responseData=data} )
    console.log("image uploaded")



    if(responseData.success){
        product.image=responseData.image_url
        console.log("updated product details with image", product);
        await fetch('http://localhost:4000/addproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
            console.log("Product stringified",JSON.stringify(product))
            data.success ? alert("Product Added") : alert("failed");
            

        })
    }

}



  return (
    <div className='addproduct'>
         <h1>Add Product</h1>
    <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={ChangeHandler} type="text" name='name' placeholder='Type here' required />
    </div>
    <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={ChangeHandler}  type="text" name='old_price' placeholder='Type here' required/>
        </div>
        <div className="addproduct-itemfield">
            <p> Offer Price</p>
            <input value={productDetails.new_price} onChange={ChangeHandler} type="text" name='new_price' placeholder='Type here' required/>
        </div>
    </div>
    <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={ChangeHandler}  name="category" className='add-product-selector' required>
            <option value='women'>Women</option>
            <option value='men'>Men</option>
            <option value='kid'>Kid</option>
        </select>
    </div>
    <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image? URL.createObjectURL(image):add_image} alt="" />
           
        </label>
        <input onChange={imagechangeHandler} type="file" name='image'  id='file-input' hidden required />
    </div>
    <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
</div>
  )
}

export default AddProduct