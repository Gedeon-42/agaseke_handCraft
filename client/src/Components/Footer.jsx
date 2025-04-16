import React from 'react'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer-wrapper'>
        <div className="footer-container">
        <div className="footer-content1">
            <h1>Contact info</h1>
            <p><span>Email:gakondo@gmail.com</span></p>
            <p>Phone number:+250-788-306-758</p>
        </div>
        <div className="footer-content2">
            <h1>Customer service</h1>
            <Link>About us</Link>
            <Link>Privacy Policy</Link>
            <Link>Shipping Policy</Link>
            <Link>Terms & Condition</Link>
        </div>
        <div className="footer-content3">
            <h1>Follow Us</h1>
            <div className="footer-icon-wrapper">
            <FaFacebook className='footer-icon'/>
        <FaWhatsapp className='footer-icon'/>
        <FaTwitter className='footer-icon'/>
            </div>
        
        </div>
        </div>
        <div className="footer">
           <div className="footer-1">
            <p>&copy; Copyright 2024 <Link to=""> Gakondo</Link> . All rights Reserved!</p>
            </div>
            <div className="payment-method">
                <img src="/images/mastercard.png" alt="" />
                <img src="/images/mtn.jpg" alt="" />
                <img src="/images/visa.png" alt="" />
            </div>
           
        </div>
    </div>
  )
}

export default Footer