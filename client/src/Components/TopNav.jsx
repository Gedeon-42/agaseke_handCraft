import React from 'react'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'

function TopNav() {
  return (
    <div className='top-nav'>
        <div className="top-icons">
        <FaFacebook/>
        <FaWhatsapp/>
        <FaTwitter/>
        </div>
        
        <div className="top-phone-email">
            <p>Need Help? Call us:+250-788-306-758</p>
        </div>
        
    </div>
  )
}

export default TopNav