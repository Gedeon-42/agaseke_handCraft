// ProductTabs.js
import React, { useEffect, useState } from "react";

import PuppyTab from "./PuppyTab";
import PuppyCard from "./PuppyCard";
import axiosClient from "../../axiosClient";
import { ClipLoader } from "react-spinners";

const PuppyTabs = () => {
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const [products, setProducts] = useState({
    "New Arrivals": [],
    "Featured Product": [],
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

      // console.log("Fetched products for tab:", activeTab, response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when activeTab changes
  useEffect(() => {
    fetchProducts();
  }, [activeTab])

if (loading) return <div>
  <div className="spinner-container">
        <ClipLoader  size={30} color={"#123abc"}  />
      </div>
</div>;


  return (
    <div>
      <div className="tabs">
        {["New Arrivals", "Featured Product"]?.map((tab) => (
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
