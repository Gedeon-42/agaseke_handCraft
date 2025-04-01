import React, { useEffect, useState } from "react";

import ProductList from "./ProductList";
import axiosClient from "../../axiosClient";
import CategorySidebar from "./CategorySidebar";

function Puppies() {
  const [categories, setCategories] = useState(["All"]); // Default "All" for all categories
  
  // const categories = [
  //   "All",
  //   "Goldendoodle",
  //   "Cavapoo",
  //   "BerneDoolde",
  //   "Poodle",
  //   "Havanes",
  //   "Maltese",
  // ];
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All" to display all products

  const [puppies, setPuppies] = useState([]); // State to store all puppies

  useEffect(() => {
    // Fetch puppies and dynamically populate categories
    const fetchPuppiesAndCategories = async () => {
      try {
        const response = await axiosClient.get("/puppies"); // Fetch from API
        const fetchedPuppies = response.data;

        // Extract unique categories from puppies
        const uniqueCategories = [
          "All",
          ...new Set(fetchedPuppies.map((puppy) => puppy.category)),
        ];

        setCategories(uniqueCategories); // Set categories for sidebar
        setPuppies(fetchedPuppies); // Set puppies data
      } catch (error) {
        console.error("Error fetching puppies:", error);
      }
    };

    fetchPuppiesAndCategories();
  }, []);

   // Filter puppies based on selected category
   const filteredPuppies =
   selectedCategory === "All"
     ? puppies
     : puppies.filter((puppy) => puppy.category === selectedCategory);

  return (
    <div className="app-container">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductList selectedCategory={selectedCategory} puppies={filteredPuppies} />
    </div>
  );
}

export default Puppies;
