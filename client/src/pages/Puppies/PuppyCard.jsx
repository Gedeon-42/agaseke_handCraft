// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import env from "../../env";
import { usestateContext } from "../../Context/ContextProvider";


const PuppyCard = ({ product }) => {
  const apiUrl= env.REACT_APP_API_URL
   const{ addToCart} = usestateContext()
   const handleAddToCart = () => {
    addToCart(product.id, 1, product.price,product.name, product.main_image); // Add 1 item with its price
  };
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
      <button onClick={handleAddToCart} className="add-to-cart">
        {product.price === 0 ? "Pre-Order" : "Add To Cart"}
      </button>
    </div>
  );
};

export default PuppyCard;
