'use client';

import { useState } from 'react';

const PaymentMethods = ({ paymentMethods }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentList, setPaymentList] = useState(paymentMethods);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    default: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, you would make an API call here
      const lastFour = formData.cardNumber.slice(-4);
      const cardType = getCardType(formData.cardNumber);
      const expiryDate = `${formData.expiryMonth}/${formData.expiryYear.slice(-2)}`;
      
      const newPaymentMethod = {
        id: `PAY-${Math.floor(Math.random() * 1000)}`,
        type: 'Credit Card',
        cardType,
        lastFour,
        expiryDate,
        default: formData.default
      };
      
      // If this is set as default, update other payment methods
      let updatedPaymentMethods = [...paymentList];
      if (formData.default) {
        updatedPaymentMethods = updatedPaymentMethods.map(method => ({
          ...method,
          default: false
        }));
      }
      
      setPaymentList([...updatedPaymentMethods, newPaymentMethod]);
      setShowAddForm(false);
      setFormData({
        cardNumber: '',
        cardholderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        default: false
      });
      
    } catch (error) {
      console.error('Error adding payment method:', error);
    }
  };

  const handleDeletePaymentMethod = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        // In a real app, you would make an API call here
        const updatedPaymentMethods = paymentList.filter(method => method.id !== paymentId);
        setPaymentList(updatedPaymentMethods);
      } catch (error) {
        console.error('Error deleting payment method:', error);
      }
    }
  };

  const handleSetDefault = async (paymentId) => {
    try {
      // In a real app, you would make an API call here
      const updatedPaymentMethods = paymentList.map(method => ({
        ...method,
        default: method.id === paymentId
      }));
      
      setPaymentList(updatedPaymentMethods);
    } catch (error) {
      console.error('Error setting default payment method:', error);
    }
  };

  // Helper function to determine card type based on first digit
  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    switch (firstDigit) {
      case '4':
        return 'Visa';
      case '5':
        return 'Mastercard';
      case '3':
        return 'American Express';
      case '6':
        return 'Discover';
      default:
        return 'Credit Card';
    }
  };

  // Helper function to format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };

  const getCardIcon = (cardType) => {
    switch (cardType.toLowerCase()) {
      case 'visa':
        return 'fa-cc-visa';
      case 'mastercard':
        return 'fa-cc-mastercard';
      case 'american express':
        return 'fa-cc-amex';
      case 'discover':
        return 'fa-cc-discover';
      default:
        return 'fa-credit-card';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black">Payment Methods</h2>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Payment Method
          </button>
        )}
      </div>
      
      {showAddForm && (
        <form onSubmit={handleAddPaymentMethod} className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-black mb-4">Add New Payment Method</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Month
              </label>
              <select
                id="expiryMonth"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = i + 1;
                  return (
                    <option key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div>
              <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Year
              </label>
              <select
                id="expiryYear"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
              <span className="ml-2 text-sm text-gray-700">Set as default payment method</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Payment Method
            </button>
          </div>
        </form>
      )}
      
      {paymentList.length === 0 && !showAddForm ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You don't have any saved payment methods.</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Your First Payment Method
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentList.map((payment) => (
            <div 
              key={payment.id} 
              className={`border ${payment.default ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-lg p-4 relative`}
            >
              {payment.default && (
                <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  Default
                </span>
              )}
              
              <div className="flex items-center mb-2">
                <i className={`fas ${getCardIcon(payment.cardType)} text-2xl mr-2`}></i>
                <h3 className="font-medium text-black">{payment.cardType}</h3>
              </div>
              
              <p className="text-gray-700 mb-1">
                •••• •••• •••• {payment.lastFour}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Expires {payment.expiryDate}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeletePaymentMethod(payment.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
                {!payment.default && (
                  <button
                    onClick={() => handleSetDefault(payment.id)}
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

export default PaymentMethods;