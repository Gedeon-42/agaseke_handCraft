import React, { useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddCustomer from "./Forms/AddCustomer";

function Customers() {

  const [model,setModel] = useState(false)

  const handleOpenModel = ()=>{
    setModel(!model)
  }

  const orders = [
    {
      id: 1,
      image: "/images/dog1.webp",
      name: "Umwizerwa Gedeon",
      email: "umwizerwagedeon49@gmail.com",
      phone: "0780749799",
      status: "available",
    },

    {
      id: 2,
      image: "/images/dog1.webp",
      name: "Peter",
      email: "Peter@gmail.com",
      phone: "0780749799",
      status: "available",
    },

    {
      id: 3,
      image: "/images/dog1.webp",
      name: "Kalisa Elissa",
      email: "Kalisa@gmail.com",
      phone: "0780749799",
      status: "available",
    },

  ];
  return (
    <div className="recent-orders-container">
        <div className="categories-header">
        <h1>Customers</h1>
        <Link onClick={handleOpenModel} className="btn-add-category">Add new</Link>
      </div>
      {model &&<AddCustomer handleOpenModel={handleOpenModel}/>}
      <table className="users-table">
        <thead>
          <tr>
            <th>No</th>
            {/* <th>image</th> */}
            <th>Names</th>
            <th>email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders?.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                {/* <td>
                  <img className="order-img" src={order.image} alt="" />
                </td> */}
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.status}</td>

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

export default Customers;
