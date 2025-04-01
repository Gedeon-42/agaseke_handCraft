import React from 'react'
import { Area,AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

function AreaCharts() {
  const dataAreaChart = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 80 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 90 },
    { name: "May", value: 50 },
    { name: "Jun", value: 73 },
    { name: "July", value: 180 },
    { name: "August", value: 70 },
    { name: "september", value: 140 },
    { name: "october", value: 83 },
    { name: "november", value: 120 },
    { name: "december", value: 101 },
  ];
  return (
    <div className="order-content">
    <h6>Orders</h6>
    <div className="order-desc">
      <div>
        <h1 className="h1-charts">230</h1>
      </div>
      <div className="chart-container">
        <AreaChart width={200} height={100} data={dataAreaChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide/>
          <YAxis hide />
          <Tooltip  />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#007bff"
            fill="#007bff"
            fillOpacity={0.6}
          />
        </AreaChart>
      </div>
    </div>
  </div>
  )
}

export default AreaCharts