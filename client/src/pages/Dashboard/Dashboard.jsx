import React, { useEffect, useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { FaCaretUp, FaDollarSign } from "react-icons/fa";
import SalesChart from "./components/SalesChart";
import Orders from "./Orders";
import axiosClient from "../../axiosClient";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const[users,setUsers] = useState(null)
  useEffect(() => {
    axiosClient.get('/orders-summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);
 useEffect(() => {
    axiosClient.get('/users-summary')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

 if (!summary) return <p className="text-center">Loading...</p>;
  if (!users) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-gray-300 rounded-lg shadow p-5 bg-white  ">
          <div className="flex justify-between items-start">
            <h1 className="text-gray-300 text-[17px]">Total Sales</h1>
            <BsThreeDots />
          </div>
          <div className="flex flex-col gap-[5px]">
            <h1 className="font-bold">25000Rwf</h1>
          </div>

          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-green-600">+ 12 %</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clip-rule="evenodd"
              ></path>
            </svg>

            <span class="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg shadow p-5 bg-white  ">
          <div className="flex justify-between items-start">
            <h1 className="text-gray-300 text-[17px]">Total Orders</h1>
            <BsThreeDots />
          </div>
          <div className="flex flex-col gap-[5px]">
            <h1 className="font-bold">{summary.total_orders}</h1>
          </div>

          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-green-600">+ {summary.growth_percentage}%</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clip-rule="evenodd"
              ></path>
            </svg>

            <span class="text-xs text-gray-500 ml-1"> {summary.comparison_text}</span>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg shadow p-5 bg-white  ">
          <div className="flex justify-between items-start">
            <h1 className="text-gray-300 text-[17px]">Total Users</h1>
            <BsThreeDots />
          </div>
          <div className="flex flex-col gap-[5px]">
            <h1 className="font-bold">{users.total_users}</h1>
          </div>

          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-green-600">+ {users.growth_percentage} %</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clip-rule="evenodd"
              ></path>
            </svg>

            <span class="text-xs text-gray-500 ml-1">{users.comparison_text}</span>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg shadow p-5 bg-white  ">
          <div className="flex justify-between items-start">
            <h1 className="text-gray-300 text-[17px]">Avg. Order Value</h1>
            <BsThreeDots />
          </div>
          <div className="flex flex-col gap-[5px]">
            <h1 className="font-bold">81 Rwf</h1>
          </div>

          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-green-600">+ 12 %</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                clip-rule="evenodd"
              ></path>
            </svg>

            <span class="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>
      <div className="flex gap-[20px] mt-[20px]">
        <SalesChart />
        <div className=" bg-white w-[30%] rounded-lg shadow">
          <div className="border-b-1 border-b-gray-500 pb-[20px]">
            <h1 className="text-lg">Customer Insights</h1>
          </div>
          <div className="grid-cols-1 lg:grid-cols-2 p-[20px] gap-[20px] grid">
            <div className="flex flex-col gap-[10px] bg-gray-300 rounded-lg shadow items-center p-[20px]">
              <h6 className="text-gray">New Customers</h6>
              <h1>80</h1>
            </div>
            <div className="flex flex-col gap-[10px] bg-gray-300 rounded-lg shadow items-center p-[20px]">
              <h6 className="text-gray">Returned Customers</h6>
              <h1>70</h1>
            </div>
          </div>
          <div className="mb-6 px-[20px]">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Customer Rentention Rate
              </h3>
              <span className="text-sm font-medium text-green-600">86.2%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full w-[86%]"></div>
            </div>
          </div>

          <div className="px-[20px]">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Top Customers
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://placehold.co/40x40"
                    alt="John Smith"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-black">John Smith</p>
                    <p className="text-xs text-gray-500">12 orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">$1,246</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://placehold.co/40x40"
                    alt="Emily Johnson"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-black">
                      Emily Johnson
                    </p>
                    <p className="text-xs text-gray-500">8 orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">$988</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://placehold.co/40x40"
                    alt="Michael Brown"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-black">
                      Michael Brown
                    </p>
                    <p className="text-xs text-gray-500">7 orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">$876</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://placehold.co/40x40"
                    alt="Sarah Wilson"
                  />
                  <div class="ml-3">
                    <p className="text-sm font-medium text-black">
                      Sarah Wilson
                    </p>
                    <p className="text-xs text-gray-500">6 orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">$745</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Orders />
    </div>
  );
}

export default Dashboard;
