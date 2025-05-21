import React from 'react'
import { FaTimes } from 'react-icons/fa'

function ViewOrder({handleViewModel}) {
  return (
    <div className="fixed z-[50] top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      {/* Background overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-50"></div>

      {/* Modal content */}
      <form className="relative z-[60] space-y-4 bg-white p-6 rounded shadow-lg w-[90%] max-w-lg">
        <FaTimes
          className="absolute top-4 right-4 text-gray-500 cursor-pointer"
          onClick={handleViewModel}
        />
        <div className='flex flex-col gap-[10px]'>
            <h1 className='border-b border-gray-400  text-white p-[7px] mt-[20px] pb-[10px] bg-gray-500'>Suppier Informtion</h1>
        <div className="flex items-center gap-[4px]">
            <h1>Names:</h1>
            <p className='text-[14px]'>Gedeon</p>

        </div>
        <div className="flex items-center gap-[4px]">
            <h1>Email:</h1>
            <p className='text-[14px]'>gedeon@gmail.com</p>
            
        </div>
        <h1 className='border-b border-gray-400 mt-[20px] text-white p-[7px] bg-gray-400'>Products Information</h1>
        <div className="flex items-center gap-[4px]">
            <h1>Product:</h1>
            <p className='text-green-600 text-[14px]'>Coltan</p>
            
        </div>
        <div className="flex items-center gap-[4px]">
            <h1>Quantity:</h1>
            <p className='text-[14px]'>2</p>
            
        </div>
        <div className="flex items-center gap-[4px]">
            <h1>Price:</h1>
            <p className='text-[14px]'>A</p>
            
        </div>
        <div className="flex items-center gap-[4px]">
            <h1>Date:</h1>
            <p className='text-[14px]'>56000 Rwf</p>
            
        </div>
       
        </div>
      </form>
    </div>
  )
}

export default ViewOrder