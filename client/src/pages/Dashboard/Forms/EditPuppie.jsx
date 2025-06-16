import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import axiosClient from '../../../axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import env from '../../../env';
import { Editor } from "@tinymce/tinymce-react";
import { FaTimes } from 'react-icons/fa';

function EditPuppie({product:initialProduct,openEditModel,getPuppies}) {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [main_image, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [product ,setProduct] = useState(initialProduct || {
    name:"",
    id:"",
    description:"",
    price:"",
    discount:"",
    category:"",
    is_featured:"",
    main_image:null,
    mainImagePreview:null,
    additionalImagePreviews:[],
    additionalImages:[]
  })

  const apiUrl=  env.REACT_APP_API_URL

  const editorRef = useRef(null);
    // Fetch puppy details on load
   useEffect(() => {
  if (product && product.id) {
    fetchPuppy();
  }
}, [product.id]);
     const fetchPuppy = async () => {
        try {
          const { data } = await axiosClient.get(`/puppie/${product.id}`);
          setName(data.name);
          setDescription(data.description); 
          setPrice(data.price);
          setDiscount(data.discount);
          setGender(data.gender);
          setCategory(data.category);
          const mainImageURL = `${apiUrl}/uploads/${data.main_image}`;
          setMainImagePreview(mainImageURL); // Assuming the backend provides a URL
          const additionalImageURLs = data.images.map((img) => 
            `${apiUrl}/uploads/${img.image_path}`
          );

          setAdditionalImagePreviews(additionalImageURLs); // Map URLs
        
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      
  
      
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
  formData.append("name", product.name);
  formData.append("description", editorRef.current.getContent());
  formData.append("price", product.price);
  formData.append("discount", product.discount);
  formData.append("category", product.category);

  if (main_image) {
    formData.append("main_image", product.main_image);
  }
  additionalImages.forEach((file, index) => {
    formData.append(`additionalImages[${index}]`, file);
  });

 
  try {
    await axiosClient.post(`/puppies/${product.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Product updated successfully!");
 setTimeout(() => {
       openEditModel()
        getPuppies()
      }, 3000);
     
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product.");
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
           onClick={openEditModel}
         />
         <div className="add-puppie-container">
           <div className="add-puppie-content1">
             <h1>General Information</h1>
             <div className="price-description">
               <label>Name of Product</label>
               <input
                 type="text"
                 value={product.name}
              
                 onChange={e => setProduct({...product, name: e.target.value})}
                 placeholder="Enter name of product"
                 required
               />
 
               <label htmlFor="Descritpion">Description</label>
                 <Editor
             apiKey="66xufxp2kn9vf8szqm7iv0zv5whik4e4h3xh7agjwkz5gjhf" // api key
              initialValue={product.description}
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
          {loading ? (<>Loading...</>):(<>Save</>)} 
         </button>
           </div>
 
           <div className="add-puppie-content2">
             <div className="main-image-wrapper">
               <label>Main Image:</label>
               <input
                 type="file"
                 onChange={handleMainImageChange}
                 accept="image/*"
                
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
                   value={product.price}
                   onChange={e => setProduct({...product, price: e.target.value})}
                   placeholder="price"
                 />
               </div>
               <div className="discount1">
                 <label htmlFor="discount">discount</label>
                 <input type="text" value={product.discount}  onChange={e => setProduct({...product, discount: e.target.value})} placeholder="discount" />
               </div>
             </div>
             <div className="puppie-category">
               <label htmlFor="category"> category</label>
               <select value={product.category}   onChange={e => setProduct({...product, category: e.target.value})}>
                 <option value="">Select Category</option>
                 <option value="Musics">Musics</option>
                 <option value="Category Musics">Clothes</option>
               </select>
             </div>
             <div className="puppie-category">
               <label htmlFor="category">Is Featured ?</label>
               <select value={product.is_featured}   onChange={e => setProduct({...product, is_featured: e.target.value})}>
                 <option value="">Select</option>
                 <option value="1">Yes</option>
                 <option value="0">No</option>
               </select>
             </div>
           </div>
         </div>
 
        
       </form>
     </div>
  )
}

export default EditPuppie