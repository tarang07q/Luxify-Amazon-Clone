import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../slices/services/authService';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaArrowRight, FaUserShield, FaSpinner, FaTools } from 'react-icons/fa';
import ApiConnectionTest from '../ui/ApiConnectionTest';

const LoginForm = ({ redirect = '/', isAdmin = false }) => {
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
    <>
      {apiError && (
        <div className="mb-4 p-3 rounded-md text-sm" style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.2)',
          color: '#ef4444'
        }}>
          <p>{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2" style={{ color: 'inherit' }}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(99, 102, 241, 0.2)',
              color: 'inherit',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block font-medium mb-2" style={{ color: 'inherit' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(99, 102, 241, 0.2)',
              color: 'inherit',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md transition-colors font-medium flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            color: '#ffffff',
          }}
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
          ) : isAdmin ? (
            <span className="flex items-center justify-center">
              <FaUserShield className="mr-2" /> Admin Login
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <FaSignInAlt className="mr-2" /> Sign In
            </span>
          )}
        </button>
      </form>

      {!isAdmin && (
        <div className="mt-4 text-center">
          <Link
            to="/admin-registration"
            className="text-sm flex items-center justify-center hover:underline"
            style={{ color: 'rgba(99, 102, 241, 0.8)' }}
          >
            <FaUserShield className="mr-2" /> Create Admin Account
          </Link>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <details className="text-sm">
          <summary className="cursor-pointer flex items-center justify-center" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
            <FaTools className="mr-2" /> Troubleshooting Tools
          </summary>
          <div className="mt-2">
            <ApiConnectionTest />
          </div>
        </details>
      </div>
    </>
  );
};

export default LoginForm;
