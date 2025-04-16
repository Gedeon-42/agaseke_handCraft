import React from 'react';

const CategorySidebar2 = ({ gender, selectedGender, onSelectGender }) => {
  return (
    <div className="sidebar">
      <h3>Filter By Categories</h3>
      <ul>
        {gender.map((item, index) => (
          <li
            key={index}
            className={selectedGender === item ? 'active' : ''}
            onClick={() => onSelectGender(item)}
          >
            {item}
          </li>

        ))}
      </ul>
      {/* <a href="#" className="view-all">View All Categories</a> */}
    </div>
  );
};

export default CategorySidebar2;
