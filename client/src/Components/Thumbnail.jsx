
import React from 'react'
import { Link } from 'react-router-dom'

function Thumbnail() {
  return (
    <div className='thumbnail-wrapper'>
      <img src="/images/im7.jpg" alt="" />

      <div className="thumb-desc">
        <h6> Ready for living with peoples</h6>
        <h1>The Perfect Puppy People</h1>
        <h3>America’s leading puppy adoption service</h3>
        <Link className='btn-shop-now' to="/"> Shop now</Link>
      </div>
    </div>
  )
}

export default Thumbnail