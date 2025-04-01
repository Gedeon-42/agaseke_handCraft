// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import env from "../../env";


const PuppyCard = ({ product }) => {
  const apiUrl= env.REACT_APP_API_URL
  return (
    <div className="product-card">
      {product.discount && (
        <span className="discount-badge">{product.discount}</span>
      )}
      <Link to={`/puppies/${product.id}`}>
        <img src={`${apiUrl}/uploads/${product.main_image}`} alt={product.name} className="product-image" />
      </Link>{" "}
      {/* Replace with actual image source */}
      <Link to={`/puppies/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <div className="reviews">
        <span>⭐⭐⭐⭐⭐ ({product.reviews} review)</span>
      </div>
      <div className="price">
        <span>${product.price}</span>
        {product.originalPrice && (
          <span className="original-price">${product.originalPrice}</span>
        )}
      </div>
      {/* {product.countdown && <div className="countdown">{product.countdown}</div>} */}
      <button className="add-to-cart">
        {product.price === 0 ? "Pre-Order" : "Add To Cart"}
      </button>
    </div>
  );
};

export default PuppyCard;
