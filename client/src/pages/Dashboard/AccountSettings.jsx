'use client';

import { useState } from 'react';

const AccountSettings = ({ userData }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    accountActivity: true
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any previous messages
    setPasswordError('');
    setPasswordSuccess('');
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      // In a real app, you would make an API call here
      // const response = await fetch('/api/proxy', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     protocol: 'https',
      //     origin: 'api.example.com',
      //     path: '/user/password/update',
      //     method: 'PUT',
      //     body: JSON.stringify({
      //       currentPassword: passwordData.currentPassword,
      //       newPassword: passwordData.newPassword
      //     }),
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update password');
      // }
      
      // Success
      setPasswordSuccess('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordError('Current password is incorrect');
    }
  };
  
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, you would make an API call here
      // const response = await fetch('/api/proxy', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     protocol: 'https',
      //     origin: 'api.example.com',
      //     path: '/user/notifications/update',
      //     method: 'PUT',
      //     body: JSON.stringify(notificationSettings),
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update notification settings');
      // }
      
      // Success
      alert('Notification preferences updated successfully');
      
    } catch (error) {
      console.error('Error updating notification settings:', error);
      alert('Failed to update notification preferences');
    }
  };
  
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // In a real app, you would make an API call here
        // const response = await fetch('/api/proxy', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     protocol: 'https',
        //     origin: 'api.example.com',
        //     path: '/user/account/delete',
        //     method: 'DELETE',
        //   }),
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to delete account');
        // }
        
        // Success - redirect to homepage or login page
        alert('Account deleted successfully');
        
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-black mb-6">Account Settings</h2>
      
      <div className="space-y-8">
        {/* Password Change Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-black mb-4">Change Password</h3>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {passwordError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {passwordError}
              </div>
            )}
            
            {passwordSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {passwordSuccess}
              </div>
            )}
            
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
        
        {/* Notification Preferences */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-black mb-4">Notification Preferences</h3>
          
          <form onSubmit={handleNotificationSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="orderUpdates"
                  checked={notificationSettings.orderUpdates}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Order updates and shipping notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="promotions"
                  checked={notificationSettings.promotions}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Promotions and discounts</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="newProducts"
                  checked={notificationSettings.newProducts}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">New product announcements</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="accountActivity"
                  checked={notificationSettings.accountActivity}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Account activity and security alerts</span>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
        
        {/* Delete Account Section */}
        <div className="bg-red-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-700 mb-4">Delete Account</h3>
          <p className="text-gray-700 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;