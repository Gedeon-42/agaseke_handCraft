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
    <div className="recent-orders-container">
      <h1>Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>No</th>
            {/* <th>image</th> */}
            <th>Names</th>
            <th>email</th>
            <th>Phone</th>
            <th>District</th>
            <th>Province</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users?.map((users, index) => (
              <tr key={users.id}>
                <td>{index + 1}</td>
                {/* <td>
                  <img className="order-img" src={order.image} alt="" />
                </td> */}
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.phone}</td>
                <td>{users.district}</td>
                <td>{users.province}</td>

                <td className="actions">
                  <FaEye className="icon view-icon" />
                  {/* <Link ><FaEdit className="icon edit-icon" /></Link> */}
                  <FaTrashAlt className="icon delete-icon" />
                </td>
              </tr>
            ))
          ) : (
            <p>No Users available at the moment.</p>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
