import React, { useState } from "react";
import CategorySidebar2 from "./CategorySidebar2";
import ProductList from "./ProductList";
import ProductList2 from "./ProductList2";


function Puppies2() {
  // const categories = ['Backpacks & Bags', 'Belts', 'Accessories', 'Jewellery', 'Sneakers & Shoes', 'Sunglasses'];
  // const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const gender = [
    "All",
    "music",
    "art"
  ];
  const [selectedGender, setSelectedGender] = useState("All"); // Default to "All" to display all products

  return (
    <div className="app-container">
      <CategorySidebar2
        gender={gender}
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
      />
      <ProductList2 selectedGender={selectedGender} />
    </div>
  );
}

export default Puppies2;
