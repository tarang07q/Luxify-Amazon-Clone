import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../slices/services/authService';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { FaUser, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const RegisterForm = ({ redirect = '/shop' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, currentTheme } = useTheme();

  const [register, { isLoading }] = useRegisterMutation();

  // Validation function
  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log('Attempting registration with:', { name, email });
      const res = await register({ name, email, password }).unwrap();
      console.log('Registration response:', res);

      // Ensure we have the correct data structure
      const userData = res.user || res.data;
      const token = res.token;

      if (!userData || !token) {
        throw new Error('Invalid response format from server');
      }

      dispatch(setCredentials({ user: userData, token }));
      toast.success(`Welcome to Luxify, ${userData.name}! Your account has been created successfully.`);

      // Redirect to shop page after successful registration
      const targetPath = redirect === '/' ? '/shop' : redirect;
      setTimeout(() => {
        navigate(targetPath, { replace: true });
      }, 1000);
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err?.data?.error || err?.data?.message || err.error || 'Registration failed. Please try again.';
      toast.error(errorMessage);

      // Handle specific validation errors from server
      if (err?.data?.errors) {
        setValidationErrors(err.data.errors);
      }
    }
  };
  
  return (
    <div
      className="p-8 rounded-lg shadow-md w-full max-w-md mx-auto"
      style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
      }}
    >
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          }}
        >
          <FaUser
            className="text-3xl"
            style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
          />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: theme.text }}>
          Create Account
        </h1>
        <p className="mt-1" style={{ color: theme.textLight }}>
          Join Luxify and start shopping today!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2" style={{ color: theme.text }}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (validationErrors.name) {
                setValidationErrors(prev => ({ ...prev, name: '' }));
              }
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors"
            style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(30, 31, 67, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              color: theme.text,
              borderColor: validationErrors.name
                ? '#ef4444'
                : currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(99, 102, 241, 0.3)',
              '--tw-ring-color': currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
            }}
            placeholder="Enter your full name"
            required
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2" style={{ color: theme.text }}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationErrors.email) {
                setValidationErrors(prev => ({ ...prev, email: '' }));
              }
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors"
            style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(30, 31, 67, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              color: theme.text,
              borderColor: validationErrors.email
                ? '#ef4444'
                : currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(99, 102, 241, 0.3)',
              '--tw-ring-color': currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
            }}
            placeholder="Enter your email"
            required
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2" style={{ color: theme.text }}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationErrors.password) {
                  setValidationErrors(prev => ({ ...prev, password: '' }));
                }
              }}
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 31, 67, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                color: theme.text,
                borderColor: validationErrors.password
                  ? '#ef4444'
                  : currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                '--tw-ring-color': currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
              }}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              style={{ color: theme.textLight }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block font-medium mb-2" style={{ color: theme.text }}>
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (validationErrors.confirmPassword) {
                  setValidationErrors(prev => ({ ...prev, confirmPassword: '' }));
                }
              }}
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 31, 67, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                color: theme.text,
                borderColor: validationErrors.confirmPassword
                  ? '#ef4444'
                  : currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                '--tw-ring-color': currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
              }}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              style={{ color: theme.textLight }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {validationErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            backgroundColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
            color: currentTheme === 'dark' ? '#141539' : '#ffffff',
            '--tw-ring-color': currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
          }}
          disabled={isLoading}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.target.style.backgroundColor = currentTheme === 'dark' ? '#00d9e6' : '#4338ca';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.target.style.backgroundColor = currentTheme === 'dark' ? '#00f2ff' : '#5046e5';
            }
          }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)'}` }}>
        <div className="text-center">
          <p className="mb-2" style={{ color: theme.textLight }}>Already have an account?</p>
          <Link
            to={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
            className="font-medium flex items-center justify-center transition-colors"
            style={{
              color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = currentTheme === 'dark' ? '#00d9e6' : '#4338ca';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = currentTheme === 'dark' ? '#00f2ff' : '#5046e5';
            }}
          >
            Sign In <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
