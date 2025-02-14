import React, { useContext, useState } from 'react';
import './CheckoutPage.css';
import { useUser } from '@clerk/clerk-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

function CheckoutPage() {
    const { user } = useUser();
    const navigate = useNavigate();

    // State for form inputs
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [savedOrder, setSavedOrder] = useState(null);



    const {getTotalCartAmount}=useContext(ShopContext)
    const amount = getTotalCartAmount()



    // Get cart items from the previous page
    const location = useLocation();
    const cartItems = location.state?.cartItems || {};  

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            alert('Please select a payment method');
            return;
        }

        if (paymentMethod === 'COD') {
            const userId = user?.id;

            try {
                const response = await fetch('http://localhost:4000/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ paymentMethod, userId, address, name, phone, cartItems,amount }),
                });

                const data = await response.json();
                setSavedOrder(data);

                if (response.status === 201) {
                    alert('Order Saved Successfully');
                    console.log(savedOrder)
                    navigate('/order-success',{state:{savedOrder:data}}); 
                } else {
                    alert('Failed to save order');
                }
            } catch (error) {
                console.error('Error saving order:', error);
                alert('Something went wrong. Please try again.');
            }
        } else if (paymentMethod === 'Paypal') {

            const formData = { name, address, phone, paymentMethod, cartItems };
            console.log(formData)
            navigate('/razorpay-checkout',{state:{formData}});
            
        }
    };

    return (
        <div className='checkoutpage'>
            <div className="container">
                <h2>Delivery Address</h2>
                <form id='checkout-form' onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>  
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>  
                            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>  
                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                    </div>

                    <div className="payment-container">
                        <div className='payment-method'>
                        <label>
                            <input type="radio" value="COD" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === "COD"} />
                            Cash on Delivery
                        </label>
                        
                        <br />
                        <label>
                            <input type="radio" value="Paypal" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === "Paypal"} />
                            PayPal
                        </label>
                        </div>
                        <br />
                        <div class='mt-3 d-flex justify-content-center'>
                        <button type='submit' class='btn btn-primary '>Proceed to Checkout</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CheckoutPage;
