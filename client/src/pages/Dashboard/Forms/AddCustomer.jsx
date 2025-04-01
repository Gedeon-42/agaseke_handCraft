import React from 'react'
import { FaTimes } from 'react-icons/fa'

function AddCustomer({handleOpenModel}) {
  return (
    <div className='add-category-wrapper'>
      <form action="" className='category-form'>
        <div className="category-header-times">
          <h1>Add Customer</h1>
          <div>
            <FaTimes onClick={handleOpenModel} />
          </div>
        </div>
        <div className="add-category-label">
          <label htmlFor="categoryname">category name</label>
          <input type="text" placeholder='category name' />
      <label htmlFor="email">Email</label>
      <input type="text" placeholder='Email' />
      <label htmlFor="Phone">Phone Number</label>
      <input type="text"  placeholder='Phone Number'/>
      <label htmlFor="City">City</label>
      <input type="text" placeholder='City' />
         <label htmlFor="status">status</label>
         <select name="status" id="">
          <option value="available">available</option>
          <option value="not available">not available</option>
         </select>
         <button>Save</button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomer