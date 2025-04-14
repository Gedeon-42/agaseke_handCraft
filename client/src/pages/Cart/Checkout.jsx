import React from "react";
import { usestateContext } from "../../Context/ContextProvider";
import env from "../../env";

const CheckoutPage = () => {
  const { cartItems } = usestateContext();
  const apiUrl = env.REACT_APP_API_URL;
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="flex flex-col lg:flex-row p-10 gap-8 bg-gray-100 min-h-screen">
      {/* Billing Details */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Billing details</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-[7px] bg-gray-100 rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-[7px] bg-gray-100 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-[7px] bg-gray-100 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Company name (optional)
            </label>
            <input type="text" className="w-full p-[7px] bg-gray-100 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Country / Region <span className="text-red-500">*</span>
            </label>
            <select className="w-full p-[7px] bg-gray-100 rounded">
              <option>Rwanda</option>
            </select>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Your order</h2>

        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between font-bold mb-2">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
        </div>

        {/* Order Items */}
        {cartItems.map((item) => (
          <div className="space-y-6">
            <div className="border-b border-[#d3d3d3]  pb-4 mb-2 ">
              <p className="font-medium">
                {item.name} × {item.quantity}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Delivery Time::</span> 2-5
                business days
              </p>
            
              <p className="font-bold mt-1">RWF {item.price}
              </p>
            </div>
            
          </div>
        ))}

<h4>Total: Rwf {calculateTotal().toLocaleString()}</h4>
<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
