// ProductTabs.js
import React, { useEffect, useState } from "react";

import PuppyTab from "./PuppyTab";
import PuppyCard from "./PuppyCard";
import axiosClient from "../../axiosClient";

const PuppyTabs = () => {
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const [products, setProducts] = useState({
    "New Arrivals": [],
    "Featured Puppies": [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/all-puppies?tab=${activeTab}`);
      setProducts((prevProducts) => ({
        ...prevProducts,
        [activeTab]: response.data,
      }));
    } catch (err) {
      console.error("Error fetching puppies:", err);
      setError("Failed to fetch puppies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when activeTab changes
  useEffect(() => {
    fetchProducts();
  }, [activeTab])

  // const products = {
  //   "New Arrivals": [
  //     {
  //       id: 1,
  //       name: "Blink",
  //       price: 0,
  //       reviews: 1,
  //       discount: "New",
  //       image:'/images/dog11.avif',
  //     },
  //     { id: 2, name: "Mackssi", price: 290, reviews: 1, discount: null,
  //       image:'/images/dog7.jpg',
  //      },
  //      { id: 3, name: "Mack", price: 290, reviews: 1, discount: null,
  //       image:'/images/dog10.avif',
  //      },
  //      { id: 4, name: "Meppo", price: 290, reviews: 1, discount: null,
  //       image:'/images/dog12.avif',
  //      },
  //      { id: 5, name: "Simba", price: 290, reviews: 1, discount: '20%',
  //       image:'/images/dog9.webp',
  //      },
  //      { id: 6, name: "Lunny", price: 220, reviews: 1, discount: null,
  //       image:'/images/dog8.webp',
  //      },
  //   ],
  //   "Featured Puppies": [
  //     {
  //       id: 38,
  //       name: "Simba",
  //       price: 1300,
  //       originalPrice: 1500,
  //       reviews: 1,
  //       discount: "-14%",
  //       countdown: "115 Days 05 Hrs 36 Mins 04 Secs",
  //       image:'/images/dog12.avif',
    
  //     },
  //     {
  //       id: 34,
  //       name: "cummel",
  //       price: 1200,
  //       originalPrice: 1600,
  //       reviews: 1,
  //       discount: "-25%",
  //       countdown: "274 Days 05 Hrs 36 Mins 05 Secs",
  //       image:'/images/dog1.webp',
  //     },
  //     { id: 13, name: "Mack", price: 290, reviews: 1, discount: null,
  //       image:'/images/dog10.avif',
  //      },
  //      { id: 14, name: "Meppo", price: 290, reviews: 1, discount: '30%',
  //       image:'/images/dog2.jpg',
  //      },
  //      { id: 15, name: "Simba", price: 290, reviews: 1, discount: '20%',
  //       image:'/images/dog3.jpg',
  //      },
  //      { id: 16, name: "Lummy", price: 220, reviews: 1, discount: null,
  //       image:'/images/dog4.jpg',
  //      },
  //   ],
  // };



  return (
    <div>
      <div className="tabs">
        {["New Arrivals", "Featured Puppies"]?.map((tab) => (
          <PuppyTab
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
        
      </div>
      
      <div className="tab-content">
        {products[activeTab].map((product) => (
          <PuppyCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PuppyTabs;
