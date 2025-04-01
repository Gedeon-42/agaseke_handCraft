import React, { createContext, useState, useContext, useEffect } from "react";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch the cart data from the backend
  const fetchCart = async () => {
    try {
      const response = await axiosClient.get("/cart");
      setCartItems(response.data?.items || []);
      setCartItemCount(response.data?.items.reduce((total, item) => total + item.quantity, 0) || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Add an item to the cart
  const addToCart = async (puppieId, quantity, price) => {
    try {
      await axiosClient.post("/cart/add", { puppie_id: puppieId, quantity, price });
      await fetchCart(); // Refresh the cart
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartItemCount, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
