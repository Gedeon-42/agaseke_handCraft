import React from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Users() {
  const users = [
    {
      id: 1,
      image: "/images/dog1.webp",
      name: "Umwizerwa Gedeon",
      email: "umwizerwagedeon49@gmail.com",
      phone: "0780749799",
      district: "Huye",
      province:"South"

    },

    {
      id: 2,
      image: "/images/dog1.webp",
      name: "Peter",
      email: "Peter@gmail.com",
      phone: "0780749799",
       district: "Huye",
      province:"South"
    },

    {
      id: 3,
      image: "/images/dog1.webp",
      name: "Kalisa Elissa",
      email: "Kalisa@gmail.com",
      phone: "0780749799",
     district: "Huye",
      province:"South"
    },

  ];
  return (
    <div className=" overflow-x-auto relative ">
       <div className="mx-[20px] mt-[30px] mb-[20px] bg-white shadow-md sm:rounded-lg p-[10px]">
        <h1 className="text-[20px] font-bold text-gray-700">Users</h1>
        
      </div>
     
      <table className="w-full bg-white m-4 border border-gray-200 mr-[20px]  rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2  text-gray-700 text-left">No</th>
            {/* <th>image</th> */}
            <th className="px-4 py-2  text-gray-700 text-left">Names</th>
            <th className="px-4 py-2  text-gray-700 text-left"> email</th>
            <th className="px-4 py-2  text-gray-700 text-left">Phone</th>
            <th className="px-4 py-2  text-gray-700 text-left">District</th>
            <th className="px-4 py-2  text-gray-700 text-left">Province</th>
            <th className="px-4 py-2  text-gray-700 text-left">Actions</th>
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
