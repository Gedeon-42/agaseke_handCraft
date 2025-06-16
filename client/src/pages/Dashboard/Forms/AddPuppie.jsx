import React, { useRef, useState } from "react";
import axiosClient from "../../../axiosClient";
import {Editor} from "@tinymce/tinymce-react";
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddPuppie({getPuppies,handleModel}) {
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

    const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", editorRef.current.getContent());
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
       handleModel()
         getPuppies()
      }, 3000);
     
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("failed to add product")
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed z-[50] top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          {/* Background overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-50"></div>

      <ToastContainer/>
      <form onSubmit={handleSubmit} encType="multipart/form-data"
       className="relative z-[60] space-y-4 bg-white p-6 rounded shadow-lg overflow-y-scroll max-h-[100vh]  w-[90%]"
      >
         <FaTimes
          className="absolute top-4 right-4 text-gray-500 cursor-pointer"
          onClick={handleModel}
        />
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
                <Editor
            apiKey="66xufxp2kn9vf8szqm7iv0zv5whik4e4h3xh7agjwkz5gjhf" // api key
            // value={course.description}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 300,
              menubar: false,
           
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image",
            }}
          />
             
           
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
