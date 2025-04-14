import React from 'react';
import { Link } from 'react-router-dom';
import env from '../../env';
import axiosClient from '../../axiosClient';
import { usestateContext } from '../../Context/ContextProvider';
const ProductCard = ({ product }) => {
  const{ addToCart} = usestateContext()
  const apiUrl= env.REACT_APP_API_URL
  // Handle Add to Cart

  const handleAddToCart = () => {
    addToCart(product.id, 1, product.price,product.name, product.main_image); // Add 1 item with its price
  };
  return (
    <div className="product-card">
      
      {product.discount && <span className="discount-badge">-{product.discount}%</span>}
      <Link to={`/product/${product.id}`}><img src={`${apiUrl}/uploads/${product.main_image}`} alt={product.title} className="product-image" /></Link>
      <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
      <div className="rating">⭐⭐⭐⭐⭐ (1 review)</div>
      <div className="price">
        <span className="current-price">${product.price}</span>
        {product.originalPrice && <span className="original-price">${product.originalPrice}</span>}
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
