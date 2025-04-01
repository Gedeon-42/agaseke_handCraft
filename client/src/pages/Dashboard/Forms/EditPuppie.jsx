import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import axiosClient from '../../../axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import env from '../../../env';

function EditPuppie() {
  const { id } = useParams(); // Get puppy ID from URL
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dob, setDob] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [main_image, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl=  env.REACT_APP_API_URL

    // Fetch puppy details on load
    useEffect(() => {
      const fetchPuppy = async () => {
        try {
          const { data } = await axiosClient.get(`/puppie/${id}`);
          setName(data.name);
          setDescription(data.description);
          setDob(data.dob);
          setPrice(data.price);
          setDiscount(data.discount);
          setGender(data.gender);
          setCategory(data.category);
          setColor(data.color);

          const mainImageURL = `${apiUrl}/uploads/${data.main_image}`;
          setMainImagePreview(mainImageURL); // Assuming the backend provides a URL

          const additionalImageURLs = data.images.map((img) => 
            `${apiUrl}/uploads/${img.image_path}`
          );

          setAdditionalImagePreviews(additionalImageURLs); // Map URLs
        
        } catch (error) {
          console.error("Error fetching puppy details:", error);
        }
      };
  
      fetchPuppy();
    }, [id]);
  
    // Handle main image change
    const handleMainImageChange = (e) => {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    };
  
    // Handle additional images change
    const handleAdditionalImagesChange = (e) => {
      const files = Array.from(e.target.files); // Convert FileList to array
      setAdditionalImages(files);
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setAdditionalImagePreviews(previewUrls);
    };


// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append("_method", "PUT"); // Add the _method field for Laravel to recognize it as a PUT request
  formData.append("name", name);
  formData.append("description", description);
  formData.append("dob", dob);
  formData.append("price", price);
  formData.append("discount", discount);
  formData.append("gender", gender);
  formData.append("category", category);
  formData.append("color", color);

  if (main_image) {
    formData.append("main_image", main_image);
  }
  additionalImages.forEach((file, index) => {
    formData.append(`additionalImages[${index}]`, file);
  });

  // console.log("FormData values:");
  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
  try {
    await axiosClient.post(`/puppies/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  
    toast.success("Product updated successfully!");
window.location.href="/admin/product"
  } catch (error) {
    console.error("Error updating puppy:", error);
    toast.error("Failed to update puppy.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="add-puppie-wrapper">
       {/* <ToastContainer />  */}
    <div className="add-header">
      <h1>Update Puppie</h1>
    </div>
  
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="add-puppie-container">
        {/* General Information */}
        <div className="add-puppie-content1">
          <h1>General Information</h1>
          <div className="price-description">
         
          <label>Name of Puppie</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name of puppie"
            required
          />
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <label htmlFor="Description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
          <label>Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter color of Puppie"
          />
        </div>
        <div className="sex-container">
              <div className="male-sex">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">male</label>
              </div>
              <div className="male-sex">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">female</label>
              </div>
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

        </div>

        {/* Main and Additional Images */}
        <div className="add-puppie-content2">
        <div className="main-image-wrapper">
          <label>Main Image:</label>
          <input
            type="file"
            onChange={handleMainImageChange}
            accept="image/*"
          />
          {mainImagePreview && (
            <img
              src={mainImagePreview}
              alt="Main Preview"
              className="main-image"
            />
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
          <div style={{ display: "flex", gap: "10px" }}>
            {additionalImagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            ))}
          </div>
          </div>
          <div className="puppie-category">
              <label htmlFor="category"> category</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="america">american</option>
                <option value="German Shephered">German shephered</option>
              </select>
            </div>
        </div>
        </div>
    

      <button type="submit" className="btn-add-puppie2" disabled={loading}>
        {loading ? "Updating..." : "Update Puppie"}
      </button>
    </form>
  </div>
  )
}

export default EditPuppie