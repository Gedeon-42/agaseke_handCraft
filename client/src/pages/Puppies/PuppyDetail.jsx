import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axiosClient from "../../axiosClient";
import env from "../../env";
import { ClipLoader } from "react-spinners";
import { usestateContext } from "../../Context/ContextProvider";

function PuppyDetail() {

  const { id } = useParams();
  const [puppy, setPuppy] = useState(null);
  
  const [main_image, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const apiUrl=  env.REACT_APP_API_URL
  const{ addToCart} = usestateContext()


useEffect(() => {
  // Fetch puppy details including additional images
  axiosClient.get(`/puppie/${id}`)
    .then(response => {
      const data = response.data;
      setPuppy(data);
      setMainImage(data.main_image); // Set initial main image
    })
    .catch(error => {
      // console.error("Error fetching puppy details:", error);
    });
}, [id]);

const handleImageClick = (image) => {
    setMainImage(image);
};

const increaseQuantity = () => {
        setQuantity(quantity + 1);
        addToCart(
          puppy.id,
          1, // Always increment by 1
          puppy.price,
          puppy.name,
          puppy.main_image // assuming you're storing the filename
        );
    
};

const decreaseQuantity = () => {
  if (quantity > 0) {
      setQuantity(quantity - 1);
  }
};


const handleAddToCart = () => {
  addToCart(puppy.id, 1, puppy.price,puppy.name, puppy.main_image); // Add 1 item with its price
};

if (!puppy) return <div>
  <div className="spinner-container">
        <ClipLoader size={30} color={"#123abc"}  />
      </div>
</div>;

  return (
    <div className="puppie-container">
      
      <div className="puppy-content1">
        <img src={`${apiUrl}/uploads/${main_image}`}  alt="Main Product" className="main-images" />
        <div className="thumbnail-images">
                    {puppy?.images.map((image, index) => (
                        <img
                            key={index}
                            src={`${apiUrl}/uploads/${image.image_path}`}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => handleImageClick(image.image_path)}
                            className="thumbnail"
                        />
                    ))}
                </div>
      </div>
      <div className="puppy-content2">
        <div className="puppy-content2-desc">
          <h1>{puppy?.name}</h1>
          {/* <span>⭐⭐⭐⭐⭐ </span> */}
        </div>
        <div className="puppy-content2-body">
          <p>
            Every item is a vital part of a woman's wardrobe. The result? Cool,
            easy, chic looks with youthful elegance and unmistakable signature
            style. All the beautiful pieces are made in Italy and manufactured
            with the greatest attention. Now Fashion extends to a range of
            accessories including shoes, hats, belts and more!
          </p>
      
          <ul className="ul-puppy">
            <li>Gender:male</li>
            <li>BirtDay:11/10/2024</li>
            <li>Color:black & white</li>
          </ul>
          <p className="discount-details">Discount:$20%</p>
          <div className="product-info">
                <div className="quantity-control">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                
 {/* Conditionally render buttons */}
 {quantity === 0 ? (
            <button className="add-to-cart-detail" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            
            <Link to="/cart" className="add-to-cart-detail">
              Buy now
            </Link>
          )}

            </div>
        </div>
      </div>
    </div>
  );
}

export default PuppyDetail;
