import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axiosClient from "../../../axiosClient";
import { toast, ToastContainer } from "react-toastify";

function AddCategory({ handleOpenModel,refreshCategories }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("status", e.target.status.value);
    formData.append("image", e.target.image.files[0]);

    try {
      const response = await axiosClient.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // showToastMessage();
      toast.success("added successfully");
      setTimeout(() => {
        // handleCourseModel();
        refreshCategories() 
        handleOpenModel();
      }, 4000);
    } catch (error) {
      toast.error("failed to record data");
      console.log("error in updating", error);
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
          <h1>Add Category</h1>
          <div>
            <FaTimes onClick={handleOpenModel} />
          </div>
        </div>
        <ToastContainer />
        <div className="add-category-label">
          <label htmlFor="categoryname">category name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="category name"
          />
          <label htmlFor="image">image</label>
          <input name="image" type="file" />
          <label htmlFor="status">status</label>
          <select name="status" id="status">
            <option value="" >select</option>
            <option value="available">available</option>
            <option value="not available">not available</option>
          </select>
          <button>{loading ? <>Loading...</> : <>Save</>}</button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
