import React, { useEffect, useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usestateContext } from "../../Context/ContextProvider";
import axiosClient from "../../axiosClient";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import ViewOrder from "./ViewOrder";
function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = usestateContext();
     const[viewModel,setViewModel]=useState(false)
  const[loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosClient.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
         setLoading(false)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  });

   const handleViewModel = ()=>{
    setViewModel(!viewModel)
   }

   if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }


  return (
    <div className="overflow-x-auto relative ">
      <div className="mx-[20px] mt-[30px] mb-[20px] bg-white shadow-md sm:rounded-lg p-[10px]">
        <h1 className="text-[20px] font-bold text-gray-700">Orders</h1>
        
      </div>
{
  viewModel && <>
  <ViewOrder handleViewModel={handleViewModel}/>
  </>
}
      <table className="min-w-full bg-white mr-[20px] ml-[20px] mt-[30px] border shadow-md border-gray-200  rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2  text-gray-700 text-left">No</th>
            <th className="px-4 py-2  text-gray-700 text-left">Names</th>
            {/* <th className="px-4 py-2  text-gray-700 text-left">Product</th> */}

            <th className="px-4 py-2  text-gray-700 text-left">email</th>
            <th className="px-4 py-2  text-gray-700 text-left"> District</th>
            <th className="px-4 py-2  text-gray-700 text-left" >Sector</th>
            <td className="px-4 py-2  text-gray-700 text-left">Phone</td>
            <th className="px-4 py-2  text-gray-700 text-left" > Date</th>
               <th className="px-4 py-2  text-gray-700 text-left">Amount</th>
            <th className="px-4 py-2  text-gray-700 text-left" > Status</th>
            <th className="px-4 py-2  text-gray-700 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders?.map((order, index) => (
              <tr key={order.id} className="border-b border-sky-500 hover:bg-gray-50">
                <td className="px-4 py-2 text-[14px]">{index + 1}</td>

                <td className="px-4 py-2 text-[14px]">
                  {order.user
                    ? `${order.user.first_name} ${order.user.last_name}`
                    : "N/A"}
                </td>
                {/* <td className="px-4 py-2 text-[14px]">
                  {order.items && order.items.length > 0 ? (
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.quantity} {item.name}
                          
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No items"
                  )}
                </td> */}
                {/* <td className="px-4 py-2 text-[14px]">{order.total_price} Rwf</td> */}
                <td className="px-4 py-2 text-[14px]">{order.email}</td>
                <td className="px-4 py-2 text-[14px]">{order.district}</td>
                <td className="px-4 py-2 text-[14px]">{order.sector}</td>
                <td className="px-4 py-2 text-[14px]">{order.phone}</td>
                <td className="px-4 py-2 text-[14px]">{moment (order.created_at).format("MMM D, YYYY")}</td>
                <td className="px-4 py-2 text-[14px]">{order.total_price} Rwf</td>
                
                <td className="px-4 py-2 text-[14px]">
                    <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {order.status}
                </span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <FaEye onClick={handleViewModel} className="icon cursor-pointer view-icon" />
                  {/* <Link ><FaEdit className="icon edit-icon" /></Link> */}
                  <FaTrashAlt className="icon delete-icon cursor-pointer" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">No Orders available at the moment.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
