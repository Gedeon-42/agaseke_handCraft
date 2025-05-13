'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import PersonalInfo from './PersonalInfo';
import OrderHistory from './OrderHistory';
import AccountSettings from './AccountSettings';
import ShippingAddresses from './ShippingAddresses';
import PaymentMethods from './PaymentMethods';
import LoadingSpinner from './LoadingSpinner';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            protocol: 'https',
            origin: 'api.example.com',
            path: '/user/profile',
            method: 'GET',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Use mock data for demonstration
        setUserData(mockUserData);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderActiveTab = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (!userData) {
      return <div className="p-6 text-center text-red-500">Failed to load user data. Please try again later.</div>;
    }

    switch (activeTab) {
      case 'personal-info':
        return <PersonalInfo userData={userData} />;
      case 'order-history':
        return <OrderHistory orders={userData.orders} />;
      case 'account-settings':
        return <AccountSettings userData={userData} />;
      case 'shipping-addresses':
        return <ShippingAddresses addresses={userData.addresses} />;
      case 'payment-methods':
        return <PaymentMethods paymentMethods={userData.paymentMethods} />;
      default:
        return <PersonalInfo userData={userData} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 bg-white rounded-lg shadow-md">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

// Mock data for demonstration
const mockUserData = {
  id: '12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  memberSince: '2020-05-15',
  orders: [
    {
      id: 'ORD-1234',
      date: '2023-10-15',
      total: 129.99,
      status: 'Delivered',
      items: [
        { id: 'PROD-1', name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 'PROD-2', name: 'Phone Case', price: 25.00, quantity: 2 }
      ]
    },
    {
      id: 'ORD-1235',
      date: '2023-09-22',
      total: 349.95,
      status: 'Shipped',
      items: [
        { id: 'PROD-3', name: 'Smart Watch', price: 349.95, quantity: 1 }
      ]
    },
    {
      id: 'ORD-1236',
      date: '2023-08-05',
      total: 85.97,
      status: 'Delivered',
      items: [
        { id: 'PROD-4', name: 'Bluetooth Speaker', price: 59.99, quantity: 1 },
        { id: 'PROD-5', name: 'USB-C Cable', price: 12.99, quantity: 2 }
      ]
    }
  ],
  addresses: [
    {
      id: 'ADDR-1',
      type: 'Home',
      default: true,
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States'
    },
    {
      id: 'ADDR-2',
      type: 'Work',
      default: false,
      street: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'United States'
    }
  ],
  paymentMethods: [
    {
      id: 'PAY-1',
      type: 'Credit Card',
      default: true,
      cardType: 'Visa',
      lastFour: '4242',
      expiryDate: '05/25'
    },
    {
      id: 'PAY-2',
      type: 'Credit Card',
      default: false,
      cardType: 'Mastercard',
      lastFour: '5555',
      expiryDate: '08/24'
    }
  ]
};

export default ProfilePage;