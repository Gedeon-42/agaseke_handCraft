import React from 'react'
import {FaBars} from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { usestateContext } from '../Context/ContextProvider'

function Navbar() {

  const {cartItemCount}=usestateContext()
  return (
    <div className='navbar-container'>
        <div className="logo">
          <img src="/images/logo.jpg" alt="" />
        </div>
        <div className="nav-ul">
          <Link>Home</Link>
          <Link>Categories</Link>
          <Link>Contact</Link>
          
        </div>
        <div className="auth-wrapper">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
         
        <div className="cart-container">
          <Link to="/cart"><FaCartShopping className='cart'/></Link>
          <div className="cart-numbers">
            <p>{cartItemCount}</p>
          </div>
        </div>
        </div>
        {/* <div className="icons">
          <span>🔍</span>
          <span>❤️</span>
          <span>🛒</span>
        </div> */}
    </div>
  )
}

export default Navbar