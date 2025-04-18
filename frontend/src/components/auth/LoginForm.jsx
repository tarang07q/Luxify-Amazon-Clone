import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../slices/services/authService';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaArrowRight, FaUserShield, FaSpinner, FaTools } from 'react-icons/fa';
import ApiConnectionTest from '../ui/ApiConnectionTest';

const LoginForm = ({ redirect = '/' }) => {
  // Check if there's a recently registered admin email
  const lastRegisteredAdmin = localStorage.getItem('lastRegisteredAdmin') || '';

  const [email, setEmail] = useState(lastRegisteredAdmin);
  const [password, setPassword] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [adminRedirect, setAdminRedirect] = useState(false);
  const [adminLoginSuccess, setAdminLoginSuccess] = useState(false);

  // Clear the last registered admin after using it
  useEffect(() => {
    if (lastRegisteredAdmin) {
      localStorage.removeItem('lastRegisteredAdmin');
    }
  }, [lastRegisteredAdmin]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    // If we've successfully logged in as admin, redirect to admin dashboard
    if (adminRedirect) {
      navigate('/admin/dashboard');
    }
  }, [adminRedirect, navigate]);

  const [apiError, setApiError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginAttempted(true);
    setApiError(null);

    try {
      console.log('Attempting login with:', { email, password });
      const res = await login({ email, password }).unwrap();
      console.log('Login response:', res);

      dispatch(setCredentials(res));

      // Check if user is admin and redirect accordingly
      if (res.user && res.user.role === 'admin') {
        console.log('Admin user detected, redirecting to admin dashboard');
        setAdminLoginSuccess(true);
        toast.success('Admin login successful!');

        // Delay redirect to show success message
        setTimeout(() => {
          setAdminRedirect(true);
        }, 1000);
      } else {
        navigate(redirect);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err?.data?.error || err.error || 'Authentication failed. Please check your credentials.';
      setApiError(errorMessage);
      toast.error(errorMessage);
      setLoginAttempted(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <FaSignInAlt className="text-3xl text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
        <p className="text-gray-700 mt-1">Welcome back! Sign in to your account</p>
        <p className="text-xs text-gray-500 mt-2">Admin users will be redirected to the admin dashboard</p>
        <div className="mt-2 p-2 bg-blue-50 rounded-md">
          <p className="text-xs text-blue-700">Test Admin Credentials:</p>
          <p className="text-xs text-blue-700">Email: admin@test.com</p>
          <p className="text-xs text-blue-700">Password: admin123</p>
        </div>
      </div>

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          <p>{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" /> Signing in...
            </span>
          ) : adminLoginSuccess ? (
            <span className="flex items-center justify-center">
              <FaUserShield className="mr-2" /> Admin Login Successful!
            </span>
          ) : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-700 mb-2">New Customer?</p>
          <Link
            to={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center"
          >
            Create an Account <FaArrowRight className="ml-1" />
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            to="/admin-registration"
            className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <FaUserShield className="mr-2" /> Create Admin Account
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-600 flex items-center justify-center">
              <FaTools className="mr-2" /> Troubleshooting Tools
            </summary>
            <ApiConnectionTest />
          </details>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
