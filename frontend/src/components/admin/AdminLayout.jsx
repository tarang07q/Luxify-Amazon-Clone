import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaChartLine,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlus,
  FaChartPie,
  FaUserShield
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FaChartLine },
    { name: 'Products', href: '/admin/products', icon: FaBox },
    { name: 'Add Product', href: '/admin/products/new', icon: FaPlus },
    { name: 'Orders', href: '/admin/orders', icon: FaShoppingCart },
    { name: 'Analytics', href: '/admin/analytics', icon: FaChartPie },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-indigo-700 transition duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-800">
          <div className="flex items-center">
            <FaUserShield className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl ml-2">Admin Panel</span>
          </div>
          <button
            onClick={closeSidebar}
            className="text-white focus:outline-none lg:hidden"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-2 border-b border-indigo-800">
          <div className="flex items-center py-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-indigo-200">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`}
                  onClick={closeSidebar}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-indigo-800 p-4">
          <Link
            to="/"
            className="flex items-center text-indigo-100 hover:text-white transition-colors"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="text-xl font-semibold text-gray-800">
              {navigation.find((item) => item.href === location.pathname)?.name || 'Admin'}
            </div>
            <div className="flex items-center">
              <span className="hidden md:inline-block text-sm text-gray-500 mr-2">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
