import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { ClipLoader } from 'react-spinners';
import env from '../../env';
import { toast, ToastContainer } from 'react-toastify';
function DashPuppies() {
  const [puppies,setPuppies]=useState([]);
  const[loading,setLoading]=useState(true)

  const apiUrl=  env.REACT_APP_API_URL
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
        <h1>All Puppies</h1>
        <Link className='btn-add-puppie' to="/admin/add-product">Add Puppie</Link>
        </div>
      <ToastContainer/>
      <table className="orders-table">
        <thead>
          <tr>
            <th>No</th>
            <th>image</th>
            <th>Puppy</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Gender</th>
            <th>color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {puppies.length > 0 ? (
            puppies?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img className="order-img" src={`${apiUrl}/uploads/${item.main_image}`} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.discount}</td>
                <td>{item.gender}</td>
                <td>{item.color}</td>

                <td className="actions">
                  <FaEye className="icon view-icon" />
                  <Link to={`/admin/edit-puppie/${item.id}`}><FaEdit className="icon edit-icon" /></Link>
                  <FaTrashAlt onClick={()=>handleDelete(item.id)} className="icon delete-icon" />
                </td>
              </tr>
            ))
          ) : (
            <p>No Puppies available at the moment.</p>
          )}
        </tbody>
      </table>
    </div>
    
  )
}

export default DashPuppies