'use client';

import { useState } from 'react';

const ShippingAddresses = ({ addresses }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressList, setAddressList] = useState(addresses);
  const [formData, setFormData] = useState({
    type: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    default: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, you would make an API call here
      const newAddress = {
        id: `ADDR-${Math.floor(Math.random() * 1000)}`,
        ...formData
      };
      
      // If this is set as default, update other addresses
      let updatedAddresses = [...addressList];
      if (formData.default) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          default: false
        }));
      }
      
      setAddressList([...updatedAddresses, newAddress]);
      setShowAddForm(false);
      setFormData({
        type: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        default: false
      });
      
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);
    setFormData({
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      default: address.default
    });
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, you would make an API call here
      
      // If this is set as default, update other addresses
      let updatedAddresses = [...addressList];
      if (formData.default) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          default: addr.id === editingAddressId ? true : false
        }));
      }
      
      // Update the edited address
      updatedAddresses = updatedAddresses.map(addr => 
        addr.id === editingAddressId ? { ...addr, ...formData } : addr
      );
      
      setAddressList(updatedAddresses);
      setEditingAddressId(null);
      setFormData({
        type: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        default: false
      });
      
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        // In a real app, you would make an API call here
        const updatedAddresses = addressList.filter(addr => addr.id !== addressId);
        setAddressList(updatedAddresses);
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      // In a real app, you would make an API call here
      const updatedAddresses = addressList.map(addr => ({
        ...addr,
        default: addr.id === addressId
      }));
      
      setAddressList(updatedAddresses);
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const renderAddressForm = (isEditing = false) => (
    <form onSubmit={isEditing ? handleUpdateAddress : handleAddAddress} className="border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium text-black mb-4">
        {isEditing ? 'Edit Address' : 'Add New Address'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Address Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Home, Work, etc."
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State/Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP/Postal Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="default"
            checked={formData.default}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Set as default shipping address</span>
        </label>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => {
            setShowAddForm(false);
            setEditingAddressId(null);
            setFormData({
              type: '',
              street: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'United States',
              default: false
            });
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Update Address' : 'Add Address'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black">Shipping Addresses</h2>
        {!showAddForm && !editingAddressId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Address
          </button>
        )}
      </div>
      
      {showAddForm && renderAddressForm()}
      
      {editingAddressId && renderAddressForm(true)}
      
      {addressList.length === 0 && !showAddForm ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You don't have any saved addresses.</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addressList.map((address) => (
            <div 
              key={address.id} 
              className={`border ${address.default ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-lg p-4 relative`}
            >
              {address.default && (
                <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  Default
                </span>
              )}
              
              <h3 className="font-medium text-black mb-1">{address.type}</h3>
              <p className="text-gray-700 mb-4">
                {address.street}<br />
                {address.city}, {address.state} {address.zipCode}<br />
                {address.country}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditAddress(address)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
                {!address.default && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShippingAddresses;