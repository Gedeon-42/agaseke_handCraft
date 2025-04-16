import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddCategory from "./Forms/AddCategory";
import env from "../../env";
import axiosClient from "../../axiosClient";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import EditCategory from "./Forms/EditCategory";

function DashCategories() {
  
const [model,setModel] = useState(false)
const [editModal,setEditModal] = useState(false)
const [categories,setCategories]=useState([])
const[loading,setLoading]=useState(true)
const [selectedCategory, setselectedCategory] = useState(null)
const apiUrl=  env.REACT_APP_API_URL

const fetchCategories =  async ()=>{
  try {
    const response =  await axiosClient.get('/categories');
    setCategories(response.data)
    setLoading(false)
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
  fetchCategories()
},[])

const handleDelete =  async (id) => {
  try {
      await axiosClient.delete(`/category/${id}`);
      toast.success("deleted succesfully");
      setTimeout(() => {
          fetchCategories()
      }, 4000);
      
  } catch (error) {
       toast.error("Error deleting Puppie");
  }
};

  const handleOpenModel = ()=>{
    setModel(!model)
  }

  const handelEditModal = ()=>{
    setEditModal(!editModal)
  }

 const openSelectedModal = (item)=>{
setselectedCategory(item)
handelEditModal()
 } 

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader   size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="dash-categories">
      <div className="dash-puppie-header">
        <h1>Categories</h1>
        <Link onClick={handleOpenModel} className="btn-add-category">Add Categories</Link>
      </div>
      <ToastContainer/>
      {model&&<AddCategory refreshCategories={fetchCategories} handleOpenModel={handleOpenModel}/>}
      {editModal && <EditCategory refreshCategories={fetchCategories} item={selectedCategory} handelEditModal={handelEditModal}/>}
      <table className="orders-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img className="order-img" src={`${apiUrl}/uploads/${item.image}`} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.status}</td>

                <td className="actions">
                  <FaEye className="icon view-icon" />
                  <Link>
                    <FaEdit className="icon edit-icon" onClick={()=>openSelectedModal(item)}  />
                  </Link>
                  <FaTrashAlt onClick={()=>handleDelete(item.id)} className="icon delete-icon" />
                </td>
              </tr>
            ))
          ) : (
            <p>No Categories available at the moment.</p>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DashCategories;
