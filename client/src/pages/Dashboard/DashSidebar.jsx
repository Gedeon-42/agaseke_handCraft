import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { CiSettings } from 'react-icons/ci'
import { MdOutlineDatasetLinked } from "react-icons/md";
import { FaDog, FaOrcid, FaSquarePollVertical, FaUser, FaUsers } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function DashSidebar() {

  return (
    <div className='sidebar-wrapper'>
        <Link to="/"><img className='logo-sidebar' src="/images/image1.jpg" alt="" /></Link>
        <div className="sidebar-content">
        <div className="sidebar-desc">
        <AiOutlineDashboard />
        <Link to='/admin'>Dashboard</Link>
        </div>
        <div className="sidebar-desc">
        <MdOutlineDatasetLinked />
       <Link to="/admin/products"> Products </Link>
        </div>
        <div className="sidebar-desc">
        <BiCategory />
        <Link to="/admin/Categories">Categories</Link>
        </div>
        <div className="sidebar-desc">
        <FaOrcid/>
        <Link to="/admin/orders">Orders</Link>
        </div>
        <div className="sidebar-desc">
        <FaUser/>
        <Link to="/admin/customers"> Customers</Link>
        </div>
        <div className="sidebar-desc">
        <FaUsers/>
        <Link to="/admin/users">Users</Link>
        </div>
        <div className="sidebar-desc">
         <FaSquarePollVertical />
        <Link to="/admin/reports">Reports</Link>
        </div>
        <div className="sidebar-desc">
        <CiSettings />
        <Link to="/admin/settings">Settings</Link>
        </div>
        </div>
        
    </div>
  )
}

export default DashSidebar