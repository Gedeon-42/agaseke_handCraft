import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../Components/Footer'
import TopNav from '../Components/TopNav'
import Navbar from '../Components/Navbar'

function HomeLayout() {
  return (
    <div>
      <TopNav/>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default HomeLayout