import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axiosClient from "../../axiosClient";
import { ClipLoader } from "react-spinners";

const ProductList = ({ selectedCategory }) => {
  const [puppies, setPuppies] = useState([]); // State to store all puppies
  const [filteredPuppies, setFilteredPuppies] = useState([]); // State for filtered puppies
  const[loading,setLoading]=useState(true)

  useEffect(() => {
    // Fetch puppies from API
    const fetchPuppies = async () => {
      try {
        const response = await axiosClient.get("/puppies"); // Adjust endpoint if needed
        const fetchedPuppies = response.data; // Adjust based on API response structure
        setPuppies(fetchedPuppies); // Save fetched puppies to state
        setLoading(false)
      } catch (error) {
        console.error("Error fetching puppies:", error);
      }
    };

    fetchPuppies();
  }, []); // Fetch puppies only once when the component mounts

  useEffect(() => {
    // Filter puppies based on selected category whenever it changes
    if (selectedCategory === "All") {
      setFilteredPuppies(puppies); // Show all puppies if "All" is selected
    } else {
      const filtered = puppies?.filter(
        (puppy) => puppy.category === selectedCategory
      );
      setFilteredPuppies(filtered); // Update state with filtered puppies
    }
  }, [selectedCategory, puppies]); // Run this effect whenever selectedCategory or puppies changes

  return (
    <div className="product-list">
      {loading&& <div className="puppie-loading"><ClipLoader size={30} color={"#123abc"}/></div>  }
      {filteredPuppies?.length > 0 ? (
        filteredPuppies.map((puppy) => (
          <ProductCard key={puppy.id} product={puppy} /> // Pass each puppy to ProductCard
        ))
      ) : (
        <p className="product-center">No puppies found for the selected category.</p> // Message when no products are available
      )}
    </div>
  );
};

export default ProductList;
