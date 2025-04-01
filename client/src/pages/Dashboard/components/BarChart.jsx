import React from 'react'
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

function BarCharts() {
  const dataBarChart = [
    { name: "Sun", sales: 300 },
    { name: "Mon", sales: 400 },
    { name: "Tue", sales: 200 },
    { name: "Wed", sales: 500 },
    { name: "Thu", sales: 600 },
    { name: "Fri", sales: 700 },
    { name: "Sat", sales: 800 },
  ];
  return (
    <div className="order-content">
          <h6>Total Sales</h6>
          <div className="order-desc">
            <div>
              <h1 className="h1-charts">$45</h1>
            </div>
            <div className="chart-container">
              <BarChart width={150} height={100}
          
              margin={{  right: 5, left: 50, bottom: 5 }} // Reduce margin to minimize space
              data={dataBarChart}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Bar barSize={5} dataKey="sales" fill="#007bff" />
              </BarChart>
            </div>
          </div>
        </div>
  )
}

export default BarCharts