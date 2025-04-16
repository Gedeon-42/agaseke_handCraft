import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axiosClient from '../../axiosClient';

const ProductList2 = ({ selectedGender}) => {
  const [products, setProducts] = useState([]);
  const [puppies, setPuppies] = useState([]); // State to store all puppies
  const [filteredPuppies, setFilteredPuppies] = useState([]); // State for filtered puppies

  useEffect(() => {
    // Fetch puppies from API
    const fetchPuppies = async () => {
      try {
        const response = await axiosClient.get("/puppies"); // Adjust endpoint if needed
        const fetchedPuppies = response.data; // Adjust based on API response structure
        setPuppies(fetchedPuppies); // Save fetched puppies to state
      } catch (error) {
        console.error("Error fetching puppies:", error);
      }
    };

    fetchPuppies();
  }, []); // Fetch puppies only once when the component mounts


  useEffect(() => {
    // Filter puppies based on selected category whenever it changes
    if (selectedGender === "All") {
      setFilteredPuppies(puppies); // Show all puppies if "All" is selected
    } else {
      const filtered = puppies?.filter(
        (puppy) => puppy.gender === selectedGender
      );
      setFilteredPuppies(filtered); // Update state with filtered puppies
    }
  }, [selectedGender, puppies]); // Run this effect whenever selectedCategory or puppies changes


useEffect(() => {
    // Simulated product data
    const allProducts = [
      { id: 1, name: 'Product 1',gender:"male",category: 'Goldendoodle', price: 120, originalPrice: 150, discount: 20, image: '/images/dog1.webp' },
      { id: 2, name: 'Product 2',gender:"male",category: 'Cavapoo', price: 150, originalPrice: 200, discount: 25, image: '/images/dog2.jpg' },
      { id: 3, name: 'Product 3',gender:"female",category: 'BerneDoolde', price: 69, originalPrice: 120, discount: 43, image: '/images/dog3.jpg' },
      { id: 4, name: 'Product 4', gender:"female",category: 'Poodle', price: 162, originalPrice: 266, discount: 40, image: '/images/puppy2.jpg' },
      // Add more products here
    ];


    const filtedGender = selectedGender == 'All'
    ?allProducts:allProducts.filter(product=>product.gender ===selectedGender)
    setProducts(filtedGender)
  }, [selectedGender]);

  return (
    <div className="product-list">
      {filteredPuppies?.length > 0 ? (
        filteredPuppies.map((puppy) => (
          <ProductCard key={puppy.id} product={puppy} /> // Pass each puppy to ProductCard
        ))
      ) : (
        <p className="product-center">No product found for the selected category.</p> // Message when no products are available
      )}
    </div>
  );
};

export default ProductList2;
