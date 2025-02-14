import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../../assets/cart_cross_icon.png'
import { Link } from 'react-router-dom'

function CartItem() {

    const {all_product,cartItems,removeFromCart,addToCart,getTotalCartAmount}=useContext(ShopContext)


  return (
    <div className='cartitems'>
        <h1>Welcome to your Cart</h1>
        <div className="cartitems-format-main">
            <p> Products</p>
            <p> Title</p>
            <p>Price</p>
            <p> Quantity</p>
            <p>Add</p>
            <p> Total</p>
            <p>Remove</p>
        </div>
        <hr />

        {all_product.map((e)=>{
            if(cartItems[e.id]>0 )
                {
                
                return <div>

                    <div key={e.id} className="classitems-format cartitems-format-main">
                    <img src={e.image}  className='carticon-product-icon' alt="" />
                
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitems-quantity'> {cartItems[e.id]}</button>
                    <button className='add-btn' onClick={()=>addToCart(e.id)}>+</button>
                        <p> ${e.new_price*cartItems[e.id]}</p>
                        <img src={remove_icon} className='cartitems-remove' onClick={()=>{removeFromCart(e.id)}} alt="" />
                        <hr />
                </div>
            </div>
            }

        })}
         <div className="cartitems-down">
                <div className="cartitems-total">
                    
                    <div>
                    <h1 className='total-cart-h1'>Cart Total</h1>
                        <div className="cartitems-total-items">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                        <hr />

                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <Link to={"/checkout"} state={{cartItems}} ><button>PROCEED TO CHECKOUT</button></Link>
                </div>
                <div className="cartitems-promocode">
                    <p >If you have promocode, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo-code' />
                        
                         <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default CartItem