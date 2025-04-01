import React, { useState } from "react";
import CategorySidebar from "./CategorySideBar";
import ProductList from "./ProductList";

function AllPuppies() {
  // const categories = ['Backpacks & Bags', 'Belts', 'Accessories', 'Jewellery', 'Sneakers & Shoes', 'Sunglasses'];
  // const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const categories = [
    "All",
    "Goldendoodle",
    "Cavapoo",
    "BerneDoolde",
    "Poodle",
    "Havanes",
    "Maltese",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All" to display all products

  return (
    <div className="app-container">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
}

export default AllPuppies;
