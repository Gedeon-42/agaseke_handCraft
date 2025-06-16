import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { ClipLoader } from 'react-spinners';
import env from '../../env';
import { toast, ToastContainer } from 'react-toastify';
import AddPuppie from './Forms/AddPuppie';
import EditPuppie from './Forms/EditPuppie';
function DashPuppies() {
  const [puppies,setPuppies]=useState([]);
  const[loading,setLoading]=useState(true)

  const apiUrl=  env.REACT_APP_API_URL

   const[model,setModal]= useState(false)
 const[editModel,setEditModal]=useState(false)
   const [selectedProduct, setselectedProduct] = useState(null)


    const handleModel = ()=>{
  setModal(!model)
 }

 const EditModel = ()=>{
  setEditModal(!editModel)
 }
   const openEditModel = (product) => {
    setselectedProduct(product)
    EditModel()

  }
  const getPuppies = async ()=>{
    try {
      const response = await axiosClient.get('/puppies')
      setPuppies(response.data)
      setLoading(false)
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getPuppies()
  },[])

  const handleDelete =  async (id) => {
    try {
        await axiosClient.delete(`/puppie/${id}`);
        toast.success("deleted succesfully");
        setTimeout(() => {
            getPuppies()
        }, 4000);
        
    } catch (error) {
         toast.error("Error deleting Puppie");
    }
};

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }
  return ( 
      <div className="recent-orders-container">
        <div className="dash-puppie-header">
        <h1>All Products</h1>
        <Link className='btn-add-puppie' onClick={handleModel}>Add Product</Link>
        </div>
      <ToastContainer/>
      {model &&(<AddPuppie getPuppies={getPuppies} handleModel={handleModel}/>)}

      {/* Model to edit Product */}
{
  editModel && <>
  <EditPuppie product={selectedProduct} getPuppies={getPuppies}  openEditModel={openEditModel}/>
  </>
}
      <table className="orders-table">
        <thead>
          <tr>
            <th>No</th>
            <th>image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {puppies.length > 0 ? (
            puppies?.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img className="order-img" src={`${apiUrl}/uploads/${product.main_image}`} alt="" />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.discount}</td>
                <td className="actions flex gap-0.5">
                  <FaEye className="icon view-icon" />
                  <Link onClick={()=>openEditModel(product)}><FaEdit className="icon edit-icon" /></Link>
                  <FaTrashAlt onClick={()=>handleDelete(product.id)} className="icon delete-icon" />
                </td>
              </tr>
            ))
          ) : (
            <p className='text-center'>No Product available at the moment.</p>
          )}
        </tbody>
      </table>
    </div>
    
  )
}

export default DashPuppies