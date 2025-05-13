import React from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Orders() {
  const orders = [
    {
      id: 1,
      name:"Umwizerwa Gedeon",
      email:"umwizerwagedeon@gmail.com",
      district:"Nyarugenge",
      sector:"Nyakabanda",
      phone:"0781234567",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
    {
      id: 2,
    
      name:"Ishimwe Patrick",
      email:"patrick@gmail.com",
      district:"Gasabo",
      sector:"kacyiru",
      phone:"0781234567",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
    {
      id: 3,
      name:"iradukunda eric",
      email:"eric@gmail.com",
      district:"Gasabo",
      sector:"kacyiru",
      phone:"0781234567",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
      {
      id: 5,
      name:"iradukunda eric",
      email:"eric@gmail.com",
      district:"Gasabo",
      sector:"kacyiru",
      phone:"0781234567",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
      {
      id: 9,
      name:"Gratia Ishimwe",
      email:"eric@gmail.com",
      district:"Gasabo",
      sector:"kacyiru",
      phone:"0781234567",
      price: 345,
      Date: "12/8/2024",
      status: "completed",
    },
  ];
  return (
    <div className="recent-orders-container">
      <div className="dash-puppie-header">
      <h1>Recent orders</h1>
      </div>
      
      <table className="orders-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Customer name</th>
            <th>email</th>
            <th>District</th>
            <th>Sector</th>
            <td>Phone</td>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders?.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.district}</td>
                <td>{order.sector}</td>
                <td>{order.phone}</td>
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
