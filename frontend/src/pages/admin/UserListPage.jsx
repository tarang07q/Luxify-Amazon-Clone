import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useCreateUserMutation } from '../../slices/services/adminService';
import { toast } from 'react-toastify';

const UserListPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, { isLoading }] = useCreateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Role is fixed to 'admin' for this form
      const role = 'admin'; 
      await createUser({ name, email, password, role }).unwrap();
      toast.success('Admin user created successfully');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Create New Admin User</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm dark:bg-gray-800 dark:shadow-lg">
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:shadow-outline-gray"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:shadow-outline-gray"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:shadow-outline-gray"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Admin User'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User listing table will be added here */}
    </AdminLayout>
  );
};

export default UserListPage; 