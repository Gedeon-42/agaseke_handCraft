import React, { useState } from 'react';
import axios from 'axios';
import axiosClient from '../../axiosClient';
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
export default function SelectPaymentMethod() {

     const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') 
  const [network, setNetwork] = useState('mtn');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [ loading,setLoading] = useState(false)

  const handlePayment = async () => {
      setLoading(true); // 🟢 Start loading
  setStatus(''); // Optional: clear previous status
    try {
      const response = await axiosClient.post('payments/initiate', {
        order_id: orderId,
        phone,
        network,
      });
      if (response.data.status === 'pending') {
        setStatus('Payment initiated. Please check your phone to confirm.');
      } 
      // else {
      //   setStatus('Something went wrong: ' + JSON.stringify(response.data));
      // }
    } catch (error) {
      setStatus('Error: ' + error.message);
     
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

      <select
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="mtn">MTN Mobile Money</option>
        <option value="airtel">Airtel Money</option>
      </select>

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-4"
      />

     <button
  onClick={handlePayment}
  className="bg-blue-600 text-white p-2 w-full disabled:opacity-50"
  disabled={loading}
>
  {loading ? <ClipLoader size={12} color={'#fff'} /> : "Pay Now"}
</button>


      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
