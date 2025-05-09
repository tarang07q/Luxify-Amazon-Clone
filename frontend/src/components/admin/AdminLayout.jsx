import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const { theme, currentTheme } = useTheme();

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
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.95)' : 'rgba(249, 250, 251, 0.95)',
          backdropFilter: 'blur(10px)',
          color: currentTheme === 'dark' ? theme.buttonText : theme.text,
          boxShadow: currentTheme === 'dark' ? '0 0 20px rgba(0, 242, 255, 0.2)' : theme.shadow,
          borderRight: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.1)' : `1px solid ${theme.border}`
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{
          borderColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : theme.border,
          borderImage: currentTheme === 'dark' ? 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.3), transparent) 1' : 'none'
        }}>
          <div className="flex items-center">
            <div className="h-8 w-8 flex items-center justify-center" style={{
              background: currentTheme === 'dark' ? 'linear-gradient(135deg, #00f2ff, #7928ca)' : 'linear-gradient(135deg, #5046e5, #f0338d)',
              borderRadius: '8px',
              boxShadow: currentTheme === 'dark' ? '0 0 10px rgba(0, 242, 255, 0.5)' : '0 0 10px rgba(80, 70, 229, 0.3)'
            }}>
              <FaUserShield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl ml-2" style={{
              color: currentTheme === 'dark' ? '#ffffff' : theme.text,
              textShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.5)' : 'none'
            }}>Admin Panel</span>
          </div>
          <button
            onClick={closeSidebar}
            className="focus:outline-none lg:hidden transition-colors"
            style={{
              color: currentTheme === 'dark' ? '#ffffff' : theme.text
            }}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-2 border-b" style={{
          borderColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : theme.border,
          borderImage: currentTheme === 'dark' ? 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.2), transparent) 1' : 'none'
        }}>
          <div className="flex items-center py-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold" style={{
              background: currentTheme === 'dark'
                ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.3), rgba(121, 40, 202, 0.3))'
                : 'linear-gradient(135deg, rgba(80, 70, 229, 0.2), rgba(240, 51, 141, 0.2))',
              boxShadow: currentTheme === 'dark'
                ? '0 0 10px rgba(0, 242, 255, 0.2)'
                : '0 0 10px rgba(80, 70, 229, 0.2)',
              border: currentTheme === 'dark'
                ? '1px solid rgba(0, 242, 255, 0.2)'
                : '1px solid rgba(80, 70, 229, 0.2)',
              color: currentTheme === 'dark' ? '#ffffff' : theme.text
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium" style={{
                color: currentTheme === 'dark' ? '#ffffff' : theme.text
              }}>{user?.name || 'Simple Admin'}</p>
              <p className="text-xs" style={{
                color: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.8)' : theme.primary,
                textShadow: currentTheme === 'dark' ? '0 0 3px rgba(0, 242, 255, 0.3)' : 'none'
              }}>{user?.email || 'admin@test.com'}</p>
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
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all`}
                  style={{
                    backgroundColor: isActive
                      ? currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)'
                      : 'transparent',
                    boxShadow: isActive
                      ? currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.2)' : '0 0 15px rgba(80, 70, 229, 0.1)'
                      : 'none',
                    border: isActive
                      ? currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.2)' : `1px solid ${theme.primary}30`
                      : '1px solid transparent',
                    backdropFilter: isActive ? 'blur(5px)' : 'none',
                    color: currentTheme === 'dark'
                      ? (isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)')
                      : (isActive ? theme.primary : theme.text)
                  }}
                  onClick={closeSidebar}
                >
                  <div className="w-8 h-8 flex items-center justify-center mr-3" style={{
                    background: isActive
                      ? currentTheme === 'dark'
                        ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.3), rgba(121, 40, 202, 0.2))'
                        : 'linear-gradient(135deg, rgba(80, 70, 229, 0.2), rgba(240, 51, 141, 0.1))'
                      : 'transparent',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease'
                  }}>
                    <item.icon
                      className={`h-4 w-4 transition-all`}
                      style={{
                        color: currentTheme === 'dark'
                          ? (isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)')
                          : (isActive ? theme.primary : theme.text),
                        filter: isActive
                          ? currentTheme === 'dark' ? 'drop-shadow(0 0 3px rgba(0, 242, 255, 0.7))' : 'none'
                          : 'none'
                      }}
                    />
                  </div>
                  <span style={{
                    textShadow: isActive && currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.5)' : 'none'
                  }}>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full border-t p-4" style={{
          borderColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : theme.border,
          borderImage: currentTheme === 'dark' ? 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.2), transparent) 1' : 'none'
        }}>
          <Link
            to="/"
            className="flex items-center transition-all group"
            style={{
              color: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.8)' : theme.primary,
              textShadow: currentTheme === 'dark' ? '0 0 3px rgba(0, 242, 255, 0.3)' : 'none'
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center mr-3 transition-all" style={{
              borderRadius: '6px',
              border: currentTheme === 'dark'
                ? '1px solid rgba(0, 242, 255, 0.2)'
                : `1px solid ${theme.primary}30`,
              background: currentTheme === 'dark' ? 'transparent' : 'rgba(80, 70, 229, 0.05)'
            }}>
              <FaSignOutAlt className="h-4 w-4 transition-all"
                style={{
                  color: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.8)' : theme.primary,
                  filter: currentTheme === 'dark' ? 'drop-shadow(0 0 2px rgba(0, 242, 255, 0.5))' : 'none'
                }}
              />
            </div>
            <span>Back to Store</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="shadow-sm z-10" style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.95)' : theme.cardBg,
          borderBottom: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.1)' : `1px solid ${theme.border}`,
          boxShadow: currentTheme === 'dark' ? '0 4px 20px rgba(0, 242, 255, 0.1)' : theme.shadow
        }}>
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="focus:outline-none lg:hidden"
              style={{ color: theme.text }}
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="text-xl font-semibold" style={{
              color: theme.text,
              textShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.3)' : 'none'
            }}>
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
        <main className="flex-1 overflow-y-auto p-4" style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(10, 11, 30, 0.95)' : theme.background,
          backgroundImage: currentTheme === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.03) 0%, transparent 80%)'
            : 'none'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
