import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axiosClient from "../../../axiosClient";
import { toast, ToastContainer } from "react-toastify";

function EditCategory({item, handelEditModal,refreshCategories}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(item?.name || "");
  const [status, setStatus] = useState(item?.status || "");
  const [image, setImage] = useState(null)
  
    // Update the state when `item` changes
    useEffect(() => {
      setName(item?.name || "");
      setStatus(item?.status || "");
      setImage(null); // Reset image
    }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", e.target.name.value);
    formData.append("status", e.target.status.value);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axiosClient.post(`/category/${item.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // showToastMessage();
      toast.success("Updated successfully");
      setTimeout(() => {
        refreshCategories(); // Refresh categories after success
         handelEditModal(); // Close modal
      }, 4000);
    } catch (error) {
      toast.error("failed to record data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category-wrapper">
   
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="category-form"
      >
        <div className="category-header-times">
          <h1>Edit Category</h1>
        
          <div>
            <FaTimes onClick={handelEditModal} />
          </div>
        </div>
        <ToastContainer />
        <div className="add-category-label">
          <label htmlFor="categoryname">category name</label>
          <input
            name="name"
            id="name"
            value={name}
            type="text"
            onChange={(e)=>setName(e.target.value)}
            placeholder="category name"
          />
          <label htmlFor="image">image</label>
          <input name="image"  onChange={(e)=>setImage(e.target.files[0])} type="file" />
          <label htmlFor="status">status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value)} name="status" id="status">
            <option  value="">Select</option>
            <option value="available">available</option>
            <option value="not available">not available</option>
          </select>
          <button>{loading ? <>Loading...</> : <>Save</>}</button>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
