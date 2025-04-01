import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { usestateContext } from '../Context/ContextProvider';


function Navabar() {
  const { cartItemCount } = usestateContext();
  return (
   
      <div className="navbar-container">
      <div className="logo">
        <Link to="/"><img src="/images/logo2.webp" alt="" /></Link>
          
        </div>
        <div className="navbar-search">
        <form action="">
          <input type="text" placeholder='Seacrh for bread' />
          <button>Search</button>
        </form>
      </div>
        <div className="nav-ul">
          <Link>Home</Link>
          <Link to="/puppies">Puppies</Link>
          <Link>About us</Link>
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
      
      </div>
   
  )
}

export default Navabar