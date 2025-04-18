import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUserShield, FaKey, FaEnvelope, FaUser } from 'react-icons/fa';
import axios from 'axios';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: ''
  });
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword, secretKey } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!name || !email || !password || !confirmPassword || !secretKey) {
      return toast.error('Please fill in all fields');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    // The secret key should match what's set in your backend
    // For demo purposes, we're using a simple key, but in production
    // this should be a strong, environment-specific value
    const ADMIN_SECRET_KEY = 'admin-secret-123';

    if (secretKey !== ADMIN_SECRET_KEY) {
      return toast.error('Invalid secret key');
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({
        name,
        email,
        password,
        role: 'admin',
        secretKey
      });

      const res = await axios.post('/api/auth/register-admin', body, config);

      toast.success('Admin user created successfully!');

      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        secretKey: ''
      });

    } catch (err) {
      const message = err.response && err.response.data.error
        ? err.response.data.error
        : 'Something went wrong';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <FaUserShield className="text-3xl text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create Admin Account</h2>
        <p className="text-gray-700 mt-1">Create a new administrator account</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-500" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              className="pl-10 w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="pl-10 w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaKey className="text-gray-500" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className="pl-10 w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaKey className="text-gray-500" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="pl-10 w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="secretKey">
            Admin Secret Key
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaKey className="text-gray-500" />
            </div>
            <input
              type="password"
              id="secretKey"
              name="secretKey"
              value={secretKey}
              onChange={onChange}
              className="pl-10 w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter admin secret key"
            />
          </div>
          <p className="text-xs text-gray-700 mt-1">
            This key is required to create an admin account. For demo purposes, use: "admin-secret-123"
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
        >
          {loading ? 'Creating...' : 'Create Admin Account'}
        </button>
      </form>
    </div>
  );
};

export default AdminRegistration;
