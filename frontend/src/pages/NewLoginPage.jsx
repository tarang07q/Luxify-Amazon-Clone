import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { FaUserShield } from 'react-icons/fa';

const NewLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the return path from location state or default to '/shop'
  const from = location.state?.from || '/shop';
  
  // Check if the return path is an admin route
  const isAdminRoute = from.startsWith('/admin');
  
  // Determine if this is an admin login attempt
  const isAdminLogin = isAdminRoute || from.includes('admin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isAdminLogin ? 'Admin Login' : 'Sign in to your account'}
          </h2>
          {isAdminLogin && (
            <div className="mt-2 text-center text-sm text-gray-600">
              <FaUserShield className="inline-block mr-2" />
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
