import React, { useState } from 'react'
import {FaAngleDown, FaBars} from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import {User} from 'lucide-react'
import { usestateContext } from '../Context/ContextProvider'

function Navbar() {

  const {cartItemCount,user}=usestateContext()

   const[showProfile,setProfile] = useState(false)
  const handleProfile = ()=>{
    setProfile(!showProfile)
  }

   const onlogout = (ev) => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    window.location.reload()
   
  };
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
          {!user?(
            <>
              <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
          ):(
             <div className="flex items-center space-x-4">
                    <div className="relative">
                    
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 bg-orange-400 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      {/* <span className="text-sm font-medium text-gray-900"> Gedeon</span> */}
                      <Link  className="auth-user">
                 
                  <FaAngleDown onClick={handleProfile} />
                </Link>
                    </div>
                    {showProfile &&(
                       <div className="absolute top-[30px] right-0 w-30  h-20 bg-gray-200  flex flex-col items-center  justify-center">
                      <Link className='mt-2 mb-1.5 text-[15px]' to="/profile">My Profile</Link>
                      <Link onClick={onlogout} className="auth-user">Logout</Link>
                    </div>
                    )}
                   
                  </div>
                </div>
          )}
          
         
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