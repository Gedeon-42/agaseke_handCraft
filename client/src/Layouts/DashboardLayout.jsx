import React from 'react'

import { Outlet } from 'react-router'
import DashNavbar from '../pages/Dashboard/DashNavbar'
import DashSidebar from '../pages/Dashboard/DashSidebar'

function DashboardLayout() {
  return (
    <div >
      <DashNavbar/>
      <DashSidebar/>
      <div className="outle-wrapper">
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout