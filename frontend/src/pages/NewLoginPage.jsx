import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../components/auth/LoginForm';
import { useTheme } from '../context/ThemeContext';
import { FaArrowLeft, FaUserShield, FaUser } from 'react-icons/fa';
import ModernCube from '../components/3d/ModernCube';

const NewLoginPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme, currentTheme } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  const adminParam = sp.get('admin');

  useEffect(() => {
    // Check if admin parameter is present
    if (adminParam === 'true') {
      setIsAdmin(true);
    }

    // Redirect if already logged in
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        // Redirect regular users to shop if they're trying to access admin routes
        if (redirect === '/' || redirect === '/admin' || redirect.startsWith('/admin/')) {
          navigate('/shop');
        } else {
          navigate(redirect);
        }
      }
    }
  }, [navigate, redirect, user, adminParam]);

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundColor: theme.background,
      color: theme.text
    }}>
      {/* Top Navigation */}
      <div className="py-4 px-6 flex items-center justify-between" style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: currentTheme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}>
        <Link to="/" className="flex items-center">
          <FaArrowLeft className="mr-2" style={{ color: theme.primary }} />
          <span style={{ color: theme.text }}>Back to Home</span>
        </Link>

        <div className="flex items-center">
          <div className="h-8 w-8 flex items-center justify-center" style={{
            background: currentTheme === 'dark' ? 'linear-gradient(135deg, #00f2ff, #7928ca)' : 'linear-gradient(135deg, #5046e5, #f0338d)',
            borderRadius: '8px',
            boxShadow: currentTheme === 'dark' ? '0 0 10px rgba(0, 242, 255, 0.5)' : '0 0 10px rgba(80, 70, 229, 0.3)'
          }}>
            <ModernCube size={20} color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'} />
          </div>
          <span className="font-bold text-xl ml-2" style={{
            color: currentTheme === 'dark' ? '#ffffff' : theme.text,
            textShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.5)' : 'none'
          }}>Luxify</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 rounded-lg" style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
          border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
          boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.1)' : 'none'
        }}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)',
            }}>
              {isAdmin ? (
                <FaUserShield className="text-3xl" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              ) : (
                <FaUser className="text-3xl" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              )}
            </div>
            <h1 className="text-2xl font-bold" style={{ color: theme.text }}>
              {isAdmin ? 'Admin Login' : 'Sign In'}
            </h1>
            <p style={{ color: theme.textLight }}>
              {isAdmin
                ? 'Access your admin dashboard'
                : 'Welcome back! Sign in to your account'}
            </p>
          </div>

          <LoginForm redirect={redirect} isAdmin={isAdmin} />

          <div className="mt-6 text-center">
            <p style={{ color: theme.textLight }}>
              {isAdmin
                ? 'Need a user account?'
                : 'Don\'t have an account?'}
            </p>
            {isAdmin ? (
              <Link to="/login" className="font-medium hover:underline" style={{ color: theme.primary }}>
                User Login
              </Link>
            ) : (
              <Link to="/register" className="font-medium hover:underline" style={{ color: theme.primary }}>
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoginPage;
