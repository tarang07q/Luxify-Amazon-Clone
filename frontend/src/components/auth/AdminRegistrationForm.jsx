import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserShield, FaKey, FaEnvelope, FaUser, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const AdminRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { name, email, password, confirmPassword, secretKey } = formData;

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!name) {
      errors.name = 'Name is required';
    } else if (name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Secret key validation
    if (!secretKey) {
      errors.secretKey = 'Secret key is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
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

      const response = await axios.post('/api/auth/register-admin', body, config);

      console.log('Admin registration response:', response.data);

      toast.success('Admin user created successfully! You can now log in with these credentials.');
      setSuccess(true);

      // Store the email temporarily to help with login
      localStorage.setItem('lastRegisteredAdmin', email);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

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
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
          <FaArrowLeft className="mr-2" /> Back to Login
        </Link>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <FaUserShield className="text-3xl text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Create Admin Account</h1>
        <p className="text-gray-700 mt-1">Create a new administrator account for Luxify</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Administrator Access</h2>
        <p className="text-gray-700">
          Creating an admin account will give you access to:
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>Product management (add, edit, delete products)</li>
          <li>Order management and processing</li>
          <li>User management</li>
          <li>Site analytics and reporting</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Note:</strong> This is for demonstration purposes. In a production environment, admin creation would be more restricted.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2" htmlFor="name">
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
              className={`pl-10 w-full px-4 py-2 text-gray-800 bg-white border ${
                validationErrors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter your full name"
            />
          </div>
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2" htmlFor="email">
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
              className={`pl-10 w-full px-4 py-2 text-gray-800 bg-white border ${
                validationErrors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter your email"
            />
          </div>
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2" htmlFor="password">
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
              className={`pl-10 w-full px-4 py-2 text-gray-800 bg-white border ${
                validationErrors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter your password"
            />
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2" htmlFor="confirmPassword">
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
              className={`pl-10 w-full px-4 py-2 text-gray-800 bg-white border ${
                validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Confirm your password"
            />
          </div>
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2" htmlFor="secretKey">
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
              className={`pl-10 w-full px-4 py-2 text-gray-800 bg-white border ${
                validationErrors.secretKey ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter admin secret key"
            />
          </div>
          {validationErrors.secretKey && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.secretKey}</p>
          )}
          <p className="text-xs text-gray-700 mt-1">
            This key is required to create an admin account. For demo purposes, use: "admin-secret-123"
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors font-medium ${
            (loading || success) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              Creating Account...
            </span>
          ) : success ? (
            'Account Created Successfully!'
          ) : (
            'Create Admin Account'
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
