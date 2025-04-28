import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
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
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FaChartLine },
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
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: theme.primary,
          color: theme.buttonText,
          boxShadow: theme.shadow
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
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

        <div className="px-4 py-2 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center py-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{user?.email || 'admin@example.com'}</p>
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
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? 'text-white'
                      : 'text-white opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                  onClick={closeSidebar}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-all ${
                      isActive ? 'text-white' : 'text-white group-hover:text-white'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full border-t p-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <Link
            to="/"
            className="flex items-center text-white opacity-80 hover:opacity-100 transition-all"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="shadow-sm z-10" style={{ backgroundColor: theme.cardBg, borderBottom: `1px solid ${theme.border}` }}>
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="focus:outline-none lg:hidden"
              style={{ color: theme.text }}
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="text-xl font-semibold" style={{ color: theme.text }}>
              {navigation.find((item) => item.href === location.pathname)?.name || 'Admin'}
            </div>
            <div className="flex items-center">
              <span className="hidden md:inline-block text-sm mr-2" style={{ color: theme.textLight }}>
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: theme.background }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
