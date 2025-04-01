import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { FaBars, FaBell, FaMoon } from 'react-icons/fa6'

function DashNavbar() {
  return (
    <div className='dashnav-wrapper'>
        <div className="menu-icons">
            <FaBars/>
        </div>
        <div className="notification-wrapper">
            <FaMoon/>
            <FaBell/>
            <FaUserAlt/>
        </div>
    </div>
  )
}

export default DashNavbar