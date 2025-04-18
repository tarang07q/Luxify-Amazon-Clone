import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterForm from '../components/auth/RegisterForm';

const NewRegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <RegisterForm redirect={redirect} />
      </div>
    </div>
  );
};

export default NewRegisterPage;
