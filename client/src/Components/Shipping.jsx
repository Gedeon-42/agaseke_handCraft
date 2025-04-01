import React from 'react'
import { FaDollarSign, FaHeadphones, FaPlane, FaShop } from 'react-icons/fa6'

function Shipping() {
  return (
    <div className='shipping-wrapper'>
    <div className="shipping-content">
        <FaPlane className='shipping-icon'/>
        <div className="shipping-desc">
            <h3>Fast Shipping</h3>
            <p>on all orders</p>
        </div>
    </div>
    <div className="shipping-content">
        <FaDollarSign className='shipping-icon'/>
        <div className="shipping-desc">
            <h3>100% Money Guarantee</h3>
            <p>30 days money comeback</p>
        </div>
    </div>
    <div className="shipping-content">
        <FaShop className='shipping-icon'/>
        <div className="shipping-desc">
            <h3>Safe Shopping</h3>
            <p>safe shopping guarantee</p>
        </div>
    </div>
    <div className="shipping-content">
        <FaHeadphones className='shipping-icon'/>
        <div className="shipping-desc">
            <h3>Online Support</h3>
            <p>24/7 on day</p>
        </div>
    </div>
    </div>
  )
}

export default Shipping