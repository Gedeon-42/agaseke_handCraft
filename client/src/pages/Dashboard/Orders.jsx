import React from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Orders() {
  const orders = [
    {
      id: 1,
      image: "/images/dog1.webp",
      title: "simba",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
    {
      id: 2,
      image: "/images/dog4.jpg",
      title: "simba",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
    {
      id: 3,
      image: "/images/dog5.jpg",
      title: "mackasi",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
  ];
  return (
    <div className="recent-orders-container">
      <h1>Recent orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>No</th>
            <th>image</th>
            <th>Puppy</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders?.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>
                  <img className="order-img" src={order.image} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>{order.Date}</td>
                <td>{order.status}</td>

                <td className="actions">
                  <FaEye className="icon view-icon" />
                  {/* <Link ><FaEdit className="icon edit-icon" /></Link> */}
                  <FaTrashAlt className="icon delete-icon" />
                </td>
              </tr>
            ))
          ) : (
            <p>No Orders available at the moment.</p>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
