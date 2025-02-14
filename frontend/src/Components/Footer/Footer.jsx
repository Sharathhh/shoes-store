import React from 'react'
import './Footer.css'
import flag_icon from '../../assets/flag.png'
import insta_gram from '../../assets/instagram.png'
import telegram from '../../assets/icons8-telegram-app-24.png'
import linked_in from '../../assets/linked_in.png'


function Footer() {
  return (
    <div className='footer'>
        <div className='footer-inner'>
        
          <div>
            <p>Support</p>
            <span>Contact us</span><br />
            <span>Promotions & Sale</span><br />
            <span>Track Order</span><br />
            <span>Shoe Care</span><br />
            <span>Privacy Policy</span><br />
            <span>Tech Glossary</span><br />
            <span>Initiate Return / Exchange</span><br />
            <span>Sitemap</span><br />
            </div>
          <div>
            <p>About</p>
            <span>Company</span><br />
            <span>Corporate News</span><br />
            <span>Press Center</span><br />
            <span>Investors</span><br />
            <span>Sustainability</span><br />
            <span>Careers</span>
          </div>
          <div>
            <p>Stay upto Date</p>
            <span>FAQ</span><br />
            <span>Contact</span><br />
            <div className='icons'>
            <img src={insta_gram} alt="" />
            <img src={telegram} alt="" />
            <img src={linked_in} alt="" />
            </div>
            
          </div>
          <div>
            <p>Explore</p>
            <span>Our Stores</span>
            </div>
          
        </div>
        <div className='final-footer'>
          <hr />
          <div className='flag-border'>
          <img src={flag_icon} alt="" />
          <h3>INDIA</h3>
          </div>
          <br />
        </div>
       


    </div>
  )
}

export default Footer