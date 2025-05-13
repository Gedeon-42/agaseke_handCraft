import React from 'react'
import { FaTimes } from 'react-icons/fa'

function AddDeliveries({handleModel}) {
  return (
    <div className='bg-gray-900 fixed z-[50] top-0 left-0 right-0 bottom-0  opacity-50 flex justify-center items-center'>
       <form className="space-y-4 bg-white z-[500]">
        <FaTimes className='float-right' onClick={handleModel}/>
          <div>
            <label className="block font-semibold mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-[7px] bg-gray-100 rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-[7px] bg-gray-100 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-[7px] bg-gray-100 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Company name (optional)
            </label>
            <input type="text" className="w-full p-[7px] bg-gray-100 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Country / Region <span className="text-red-500">*</span>
            </label>
            <select className="w-full p-[7px] bg-gray-100 rounded">
              <option>Rwanda</option>
            </select>
          </div>
        </form>
    </div>
  )
}

export default AddDeliveries