import React from "react";

import { BsThreeDots } from "react-icons/bs";
import { FaCaretUp, FaDollarSign } from "react-icons/fa";
import SalesChart from "./components/SalesChart";
import Orders from "./Orders";

function Dashboard() {
 

  const dataPieChart = [
    { name: "Falcon", value: 58, color: "#007bff" },
    { name: "Sparrow", value: 21, color: "#0dcaf0" },
    { name: "Phoenix", value: 22, color: "#ff5733" },
  ];

 

  return (
    <div className="p-4">
     <div className="grid grid-cols-4 gap-4">
  <div className="border border-gray-300 rounded-md p-2 bg-white h-36 ">
    <div className="flex justify-between items-center">
      <FaDollarSign className="text-[30px] text-gray-500" />
      <BsThreeDots />
    </div>
    <div className="flex flex-col gap-[5px]">
      <h1 className="text-gray-300 text-[17px]">TOTAL INCOME</h1>
      <h1 className="font-bold">200000 Rwf</h1>
    </div>
  </div>
  <div className="border border-gray-300 rounded-md bg-gray-300 p-4 h-36 ">
    <div className="flex justify-between items-center">
      <FaDollarSign className="text-[20px] text-gray-500" />
      <BsThreeDots />
    </div>
    <div className="flex flex-col gap-[5px]">
      <h1 className=" text-[17px]">TOTAL EXPENSES</h1>
      <h1 className="font-bold">200000 Rwf</h1>
    </div>
  </div>
  <div className="border border-gray-300 rounded-md  p-4 h-36 ">
    <div className="flex justify-between items-center">
      <FaDollarSign className="text-[20px] text-gray-500" />
      <BsThreeDots />
    </div>
    <div className="flex flex-col gap-[5px]">
      <h1 className="text-[#000] text-[15px]">ORDERS</h1>
      <h1 className="font-bold ">300</h1>
    </div>
  </div>
  <div className="border-gray-300 border rounded-md bg-green-700 p-4 h-36 ">
    <div className="flex justify-between items-center">
      <FaDollarSign className="text-[20px] text-white" />
      <BsThreeDots className="text-white" />
    </div>
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-white text-[17px]">Customers</h1>
      <h1 className="font-bold text-white">2000</h1>
    </div>
  </div>
</div>
      
      <SalesChart/>
      <Orders/>
    </div>
  );
}

export default Dashboard;
