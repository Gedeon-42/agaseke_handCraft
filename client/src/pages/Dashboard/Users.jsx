import React from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Users() {
  const users = [
  

  ];
  return (
    <div className=" overflow-x-auto relative ">
       <div className="mx-[20px] mt-[30px] mb-[20px] bg-white shadow-md sm:rounded-lg p-[10px]">
        <h1 className="text-[20px] font-bold text-gray-700">Users</h1>
        
      </div>
     
      <table className="w-full bg-white m-4 border border-gray-200 mr-[20px]  rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No</th>
            {/* <th>image</th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Names</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"> email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">District</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Province</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users?.map((users, index) => (
              <tr className="border-b border-gray-400 hover:bg-gray-50" key={users.id}>
                <td className="px-4 py-2 text-[14px]">{index + 1}</td>
                {/* <td>
                  <img className="order-img" src={order.image} alt="" />
                </td> */}
                <td className="px-4 py-2 text-[14px]">{users.name}</td>
                <td className="px-4 py-2 text-[14px]"> {users.email}</td>
                <td className="px-4 py-2 text-[14px]">{users.phone}</td>
                <td className="px-4 py-2 text-[14px]">{users.district}</td>
                <td className="px-4 py-2 text-[14px]">{users.province}</td>

                <td className="px-4 py-2 flex space-x-2">
                  <FaEye className="icon view-icon" />
                  {/* <Link ><FaEdit className="icon edit-icon" /></Link> */}
                  <FaTrashAlt className="icon delete-icon" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">
                No Users available at the moment.
              </td>
            </tr>
            
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
