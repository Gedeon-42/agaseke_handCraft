import React from 'react';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="sidebar">
      <h3>All Breeds</h3>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => onSelectCategory(category)}
          >
  
            {category}
          </li>

        ))}
      </ul>
      {/* <a href="#" className="view-all">View All Categories</a> */}
    </div>
  );
};

export default CategorySidebar;
