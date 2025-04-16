import React, { useState } from "react";
import axiosClient from "../../../axiosClient";
import { toast, ToastContainer } from "react-toastify";

function AddPuppie() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const[is_featured,setIsFeatured]=useState("");
  const [main_image, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  const [loading,setLoading] = useState(false)
  // Handle main image selection and preview
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  // Handle additional images selection and preview
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setAdditionalImages(files);
    // Generate preview URLs for each selected image
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setAdditionalImagePreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("category", category);
    formData.append("is_featured",is_featured)
    formData.append("main_image", main_image);
  
    additionalImages.forEach((file, index) => {
      formData.append(`additionalImages[${index}]`, file);
    });
  
    try {
      await axiosClient.post('/puppies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("added successfully")

      setTimeout(() => {
        window.location.href="/admin/products"
      }, 4000);
      
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("failed to add puppie")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-puppie-wrapper">
      <div className="add-header">
        <h1>Add Product</h1>
      </div>
      <ToastContainer/>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="add-puppie-container">
          <div className="add-puppie-content1">
            <h1>General Information</h1>
            <div className="price-description">
              <label>Name of Product</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name of product"
                required
              />

              <label htmlFor="Descritpion">Description</label>
              <textarea
                name="description"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                id=""
              ></textarea>
           
            </div>
      
            <div className="price-discount">
              <div className="price1">
                <label htmlFor="price">price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="price"
                />
              </div>
              <div className="discount1">
                <label htmlFor="discount">discount</label>
                <input type="text" value={discount} onChange={(e)=>setDiscount(e.target.value)} placeholder="discount" />
              </div>
            </div>
            <button className="btn-add-puppie2" type="submit">
         {loading ? (<>Loading...</>):(<>Add Product</>)} 
        </button>
          </div>

          <div className="add-puppie-content2">
            <div className="main-image-wrapper">
              <label>Main Image:</label>
              <input
                type="file"
                onChange={handleMainImageChange}
                accept="image/*"
                required
              />
              {mainImagePreview && (
                <div>
                  <img
                    src={mainImagePreview}
                    alt="Main Preview"
                    className="main-image"
                  />
                </div>
              )}
            </div>
            <div className="main-image-wrapper">
              <label>Additional Images:</label>
              <input
                type="file"
                onChange={handleAdditionalImagesChange}
                accept="image/*"
                multiple
              />
              <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                {additionalImagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Additional Preview ${index + 1}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "7px",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="puppie-category">
              <label htmlFor="category"> category</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Musics">Musics</option>
                <option value="Category Musics">Clothes</option>
              </select>
            </div>
            <div className="puppie-category">
              <label htmlFor="category">Is Featured ?</label>
              <select value={is_featured} onChange={(e)=>setIsFeatured(e.target.value)}>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>

       
      </form>
    </div>
  );
}

export default AddPuppie;
