import React from 'react';
import AdminRegistrationForm from '../components/auth/AdminRegistrationForm';

const NewAdminRegistrationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <AdminRegistrationForm />
      </div>
    </div>
  );
};

export default NewAdminRegistrationPage;
