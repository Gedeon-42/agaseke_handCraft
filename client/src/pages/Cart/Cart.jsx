import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usestateContext } from "../../Context/ContextProvider";
import axiosClient from "../../axiosClient";
import { ClipLoader } from "react-spinners";
import env from "../../env";

function Cart() {
  const { cartItems, deleteCart, fetchCart } = usestateContext();
  const apiUrl = env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
      setLoading(false);
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div>
        <ClipLoader />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty!</h2>
        <Link to="/puppies">
          <button>Browse Puppies</button>
        </Link>
      </div>
    );
  }

  const totalPrice = calculateTotal();

  const handleDelete = async (itemId) => {
    try {
      await axiosClient.delete(`/cart/remove/${itemId}`);
      // Re-fetch cart after deletion
      await fetchCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="all-cart-container">
        <div className="cart-content1">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-body">
              {/* <img  src={item.image} alt="" /> */}
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `${apiUrl}/uploads/${item.image}`
                }
                alt={item.name}
              />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Rwf {item.price.toLocaleString()}</p>
              </div>
              <div className="cart-details">
                <h3>Quantity</h3>
                <p>{item.quantity}</p>
              </div>
              <FaTrash
                onClick={() => deleteCart(item.id)}
                className="btn-clear-cart"
              />
            </div>
          ))}
        </div>
        <div className="cart-content2">
          <div className="cart-content2-header">
            <h2>Order Summary</h2>
          </div>
          <div className="cart-content2-desc">
            <p>SubTotal: </p>
            <span>Rwf {totalPrice.toLocaleString()}</span>
          </div>

          <div className="cart-content2-desc">
            <p>Shipping: </p>
            <span>-</span>
          </div>
          <div className="cart-content2-desc">
            <p>Taxes: </p>
            <span>Rwf 0.00</span>
          </div>
          <div className="cart-content2-desc">
            <p>Discount: </p>
            <span>-</span>
          </div>
          <div className="cart-content2-desc">
            <p>Total: </p>
            <span>Rwf {totalPrice.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="btn-proceed-checkout">Proceed To checkout</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
