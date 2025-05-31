import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LoginForm from '../components/auth/LoginForm';
import { FaUserShield, FaArrowLeft } from 'react-icons/fa';

const NewLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTheme, theme } = useTheme();

  // Get the return path from location state or default to '/shop'
  const from = location.state?.from || '/shop';

  // Check if the return path is an admin route
  const isAdminRoute = from.startsWith('/admin');

  // Determine if this is an admin login attempt
  const isAdminLogin = isAdminRoute || from.includes('admin');

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: theme.background,
        backgroundImage: currentTheme === 'dark'
          ? 'radial-gradient(circle at 25% 25%, rgba(0, 242, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
          : 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 242, 255, 0.05) 0%, transparent 50%)'
      }}
    >
      {/* Back to Landing Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center px-4 py-2 rounded-lg transition-all"
        style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
          border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
        }}
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </button>

      <div
        className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl"
        style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold" style={{ color: theme.text }}>
            {isAdminLogin ? 'Admin Login' : 'Sign in to your account'}
          </h2>
          {isAdminLogin && (
            <div className="mt-2 text-sm" style={{ color: theme.textLight }}>
              <FaUserShield className="inline-block mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              Access the admin dashboard
            </div>
          )}
        </div>

        <LoginForm redirect={from} isAdmin={isAdminLogin} />
      </div>
    </div>
  );
};

export default NewLoginPage;
