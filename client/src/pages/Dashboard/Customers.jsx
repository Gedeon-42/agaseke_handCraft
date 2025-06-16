import React, { useEffect, useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddCustomer from "./Forms/AddCustomer";
import axiosClient from "../../axiosClient";
import { usestateContext } from "../../Context/ContextProvider";

function Customers() {

  const [model,setModel] = useState(false)

  const handleOpenModel = ()=>{
    setModel(!model)
  }

const [orders,setOrders] = useState([]);
const {token} = usestateContext()

useEffect(()=>{
  const fetchOrders = async () => {
    try {
      const response = await axiosClient.get("/orders",{
  
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
})

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
            <p className="text-center w-full">No Customers available at the moment.</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Customers;
