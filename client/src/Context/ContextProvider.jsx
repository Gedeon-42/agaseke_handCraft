import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import env from "../env";
const stateContext = createContext({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("Token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const apiUrl= env.REACT_APP_API_URL

  // Helper to calculate the total cart item count
  const calculateItemCount = (items) =>
    items.reduce((total, item) => total + item.quantity, 0);

  // Fetch the cart data from the backend
  const fetchCart = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const response = await axiosClient.get("/cart");
        const items = response.data?.items || [];
        setCartItems(items);
        // console.log(items);
        setCartItemCount(calculateItemCount(items));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      setCartItems(guestCart);
      // console.log(guestCart);
      setCartItemCount(calculateItemCount(guestCart));
    }
  };

  // Add an item to the cart (handles both guest and logged-in users)
  const addToCart = async (productId, quantity,price,name,image, ) => {
    const cartItem = {
      product_id: productId,
      quantity,
      price,
      name, // pass this from where you're calling addToCart
   
      image: image,
    };
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        await axiosClient.post("/cart/add", {
          product_id: productId,
          quantity,
          price,
        });

        await fetchCart(); // Refresh the cart
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      // Guest cart logic
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const existingItem = guestCart.find(
        (item) => item.product_id === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        guestCart.push(cartItem);
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      setCartItems(guestCart);
      // console.log(guestCart);
      setCartItemCount(calculateItemCount(guestCart));
    }
    // Sync guest cart to the backend when user logs in
  };


  const deleteCart = async (productId, quantity, price) => {
    const cartItem = { product_id: productId, quantity, price };
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        await axiosClient.delete(`/cart/remove/${productId}`);
        // Re-fetch cart after deletion
        await fetchCart();
      } catch (error) {
        console.error("Error deleting cart item:", error);
      }
    } else {
      // Guest cart logic
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const existingItem = guestCart.find(
        (item) => item.product_id === productId
      );

      if (existingItem) {
        existingItem.quantity -= quantity;
      } else {
        guestCart.pop(cartItem);
      }

      
      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      setCartItems(guestCart);
      setCartItemCount(calculateItemCount(guestCart));
    }
  };

  const syncCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
    if (guestCart.length > 0) {
      try {
        await axiosClient.post("/cart/sync", { cart: guestCart });
        localStorage.removeItem("guest_cart"); // Clear guest cart
        await fetchCart(); // Refresh the cart
      } catch (error) {
        console.error("Error syncing cart:", error);
      }
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("Token", token);
    } else {
      localStorage.removeItem("Token");
    }
  };

  const setUserState = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };
  const SignupMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosClient.post("/register", data);
      console.log("Signup response:", res.data);
      return res.data;
    },

    onError: (err) => {
      // alert(err);
      console.log(err);
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("Signup success:", data);
       setUserState(data.user);
      setToken(data.token);
       setToken(data.token);
      if (data.user.is_admin === 1) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    },
  });

  const LoginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosClient.post("/login", data);
      return res.data;
    },
    onError: (err) => {
      setLoading(false);
      const response = err.response;
      if (response && response.status === 422) {
        if (response.data.errors_login) {
          setErrors_login(response.data.errors_login);
        } else {
          setErrors_login({
            email: [response.data.message],
          });
        }
      }
    },
    onSuccess: (data) => {
      console.log("Login success:", data);
      setUserState(data.user);
      setToken(data.token);
      if (data.user.is_admin === 1) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    },
  });

  return (
    <stateContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser: setUserState,
        SignupMutation,
        LoginMutation,
        cartItems,
        cartItemCount,
        addToCart,
        fetchCart,
        deleteCart,
        syncCart,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const usestateContext = () => useContext(stateContext);
