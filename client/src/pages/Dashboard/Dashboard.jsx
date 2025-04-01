import React from "react";
import AreaCharts from "./components/AreaChart";
import BarCharts from "./components/BarChart";
import { FaCaretUp } from "react-icons/fa";
import SalesChart from "./components/SalesChart";
import Orders from "./Orders";

function Dashboard() {
 

  const dataPieChart = [
    { name: "Falcon", value: 58, color: "#007bff" },
    { name: "Sparrow", value: 21, color: "#0dcaf0" },
    { name: "Phoenix", value: 22, color: "#ff5733" },
  ];

  const dataRadialBarChart = [{ name: "Product Share", value: 34.6 }];
 
  return (
    <div className="dashboard-warpper">
      <div className="orders-container">
        <BarCharts/>
        <AreaCharts/>
      </div>
      <div className="dash-orders-container">
        <div className="dash-order-content">
          <h6 className="h6-order">Orders</h6>
          <h1 className="h1-order">340</h1>
          <div className="h1-orders-container">
           <h6>135</h6>
           <p><FaCaretUp /> 28%</p>
          </div>
        </div>
        <div className="dash-order-content">
          <h6 className="h6-order">Puppies Sold</h6>
          <h1 className="h1-order">40</h1>
          <div className="h1-orders-container">
           <h6>5</h6>
           <p><FaCaretUp /> 8%</p>
          </div>
        </div>

        <div className="dash-order-content">
          <h6 className="h6-order">Puppies in stock</h6>
          <h1 className="h1-order">40</h1>
          <div className="h1-orders-container">
           <h6>135</h6>
           <p><FaCaretUp /> 28%</p>
          </div>
        </div>
        <div className="dash-order-content">
          <h6 className="h6-order">Puppies in stock</h6>
          <h1 className="h1-order">40</h1>
          <div className="h1-orders-container">
           <h6>135</h6>
           <p><FaCaretUp /> 28%</p>
          </div>
        </div>

        <div className="dash-order-content">
          <h6 className="h6-order">Puppies in stock</h6>
          <h1 className="h1-order">40</h1>
          <div className="h1-orders-container">
           <h6>135</h6>
           <p><FaCaretUp /> 28%</p>
          </div>
        </div>

        <div className="dash-order-content">
          <h6 className="h6-order">Puppies in stock</h6>
          <h1 className="h1-order">40</h1>
          <div className="h1-orders-container">
           <h6>135</h6>
           <p><FaCaretUp /> 28%</p>
          </div>
        </div>

      </div>
      <SalesChart/>
      <Orders/>
    </div>
  );
}

export default Dashboard;
