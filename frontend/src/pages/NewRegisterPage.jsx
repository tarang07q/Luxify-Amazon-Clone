import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import RegisterForm from '../components/auth/RegisterForm';
import { FaArrowLeft } from 'react-icons/fa';

const NewRegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { currentTheme, theme } = useTheme();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

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
        className="w-full max-w-md p-8 rounded-xl shadow-2xl"
        style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold" style={{ color: theme.text }}>
            Create your account
          </h2>
          <p className="mt-2 text-sm" style={{ color: theme.textLight }}>
            Join Luxify and start shopping today
          </p>
        </div>
        <RegisterForm redirect={redirect} />
      </div>
    </div>
  );
};

export default NewRegisterPage;
