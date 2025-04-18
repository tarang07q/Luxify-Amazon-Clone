import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AdminRegistration from '../components/admin/AdminRegistration';

const AdminRegistrationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Admin Registration</h1>
            <p className="text-indigo-100">Create a new administrator account for Luxify</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Administrator Access</h2>
              <p className="text-gray-600">
                Creating an admin account will give you access to:
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-600">
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
            
            <AdminRegistration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrationPage;
