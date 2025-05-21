import React, { useState } from "react";
import { usestateContext } from "../../Context/ContextProvider";
import env from "../../env";
import axiosClient from "../../axiosClient";

const CheckoutPage = () => {
  const { cartItems } = usestateContext();
  const apiUrl = env.REACT_APP_API_URL;
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const [formData, setFormData] = useState({
    email: "",
    street: "",
    cell: "",
    phone: "",
    district: "",
    sector: "",
  });
  const { user, token } = usestateContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      email: formData.email,
      street: formData.street,
      cell: formData.cell,
      district: formData.district,
      sector: formData.sector,
      phone: formData.phone,
      total_price: calculateTotal(),
      items: cartItems.map((item) => ({
        // id: item.id,
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
    };
    console.log("Order Data:", orderData);
    try {
      const response = await axiosClient.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Order placed successfully!");
      // Optionally clear form and cart here
    } catch (error) {
      console.error("Checkout failed:", error.response?.data || error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row p-10 gap-8 bg-gray-100 min-h-screen"
    >
      {/* Billing Details */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Billing details</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter Your Email"
              className="w-full p-[7px] text-gray-900 border-gray-600 border bg-gray-100 rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="district"
                onChange={handleChange}
                value={formData.district}
                className="w-full p-[7px] text-gray-900 border-gray-600 border bg-gray-100 rounded"
                placeholder="Enter Your District"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                Sector <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sector"
                onChange={handleChange}
                value={formData.sector}
                className="w-full p-[7px] text-gray-900 border border-gray-600 bg-gray-100 rounded"
                placeholder="Enter Your Sector"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              className="w-full p-[7px] text-gray-900 border border-gray-600 bg-gray-100 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Cell <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Cell"
              name="cell"
              onChange={handleChange}
              value={formData.cell}
              className="w-full p-[7px] border text-gray-900 border-gray-600 bg-gray-100 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Street Address (Optional) <span className="text-red-500"></span>
            </label>
            <input
              type="text"
              name="street"
              onChange={handleChange}
              value={formData.street}
              placeholder="Enter Street Address"
              className="w-full p-[7px] border text-gray-900 border-gray-600 bg-gray-100 rounded"
            />
          </div>
        </div>
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

              <p className="font-bold mt-1">RWF {item.price}</p>
            </div>
          </div>
        ))}
        <h4>Total: Rwf {calculateTotal().toLocaleString()}</h4>
        <button
          type="submit"
          className="bg-black cursor-pointer text-white py-2 px-4 rounded mt-4 w-full"
        >
          Place Order
        </button>
      </div>
    </form>
  );
};

export default CheckoutPage;
