import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "january", ThisYear: 65, previousYear: 150 },
  { month: "february", ThisYear: 70, previousYear: 90 },
  { month: "March", ThisYear: 60, previousYear: 65 },
  { month: "April", ThisYear: 75, previousYear: 40 },
  { month: "May", ThisYear: 55, previousYear: 70 },
  { month: "June", ThisYear: 80, previousYear: 70 },
  { month: "July", ThisYear: 120, previousYear: 85 },
  { month: "August", ThisYear: 65, previousYear: 60 },
  { month: "September", ThisYear: 50, previousYear: 70 },
  { month: "October", ThisYear: 45, previousYear: 80 },
  { month: "November", ThisYear: 55, previousYear: 65 },
  { month: "December", ThisYear: 150, previousYear: 150 },
];


const SalesChart = () => {
  return (
    <div  className="sales-wrapper">
      <div className="sales-analytics">
        <h3>Total Sales</h3>
        <div className="sales-span-wrapper">
          
        <p><span style={{ color: "#0066ff", fontSize:"14", fontWeight: "500" }}>This Year:</span> $32,502.00</p>
          <p><span style={{ color: "#ff9966", fontSize:"14",fontWeight: "500" }}>Prev Year:</span> $46,018.00</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ThisYear" stroke="#0066ff" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="previousYear" stroke="#ff9966" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
