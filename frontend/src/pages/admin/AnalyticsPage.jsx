import React, { useState, useEffect } from 'react';
import { FaChartLine, FaChartBar, FaChartPie, FaShoppingCart, FaUsers, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import DashboardCard from '../../components/admin/DashboardCard';

const AnalyticsPage = () => {
  const { theme, currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const { data } = await axios.get('/api/analytics/dashboard', config);
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        console.error('Analytics error:', err);
        setError(err.response?.data?.message || err.response?.data?.error || 'Failed to load dashboard data');
        setLoading(false);
      }
    };

    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const { data } = await axios.get('/api/analytics/sales', config);
        setSalesData(data);
      } catch (err) {
        console.error('Failed to load sales data:', err);
      }
    };

    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const { data } = await axios.get('/api/analytics/products', config);
        setProductData(data);
      } catch (err) {
        console.error('Failed to load product data:', err);
      }
    };

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const { data } = await axios.get('/api/analytics/users', config);
        setUserData(data);
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

    fetchDashboardData();
    fetchSalesData();
    fetchProductData();
    fetchUserData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const renderOverviewTab = () => {
    if (!dashboardData) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Revenue"
          value={formatCurrency(dashboardData.totalRevenue)}
          icon={<FaChartLine />}
          color="primary"
          percentChange={12.5}
          period="vs. last month"
        />
        <DashboardCard
          title="Total Orders"
          value={dashboardData.totalOrders}
          icon={<FaShoppingCart />}
          color="secondary"
          percentChange={8.2}
          period="vs. last month"
        />
        <DashboardCard
          title="Total Products"
          value={dashboardData.totalProducts}
          icon={<FaBoxOpen />}
          color="success"
          percentChange={5.5}
          period="new products"
        />
        <DashboardCard
          title="Total Users"
          value={dashboardData.totalUsers}
          icon={<FaUsers />}
          color="info"
          percentChange={9.0}
          period="new users"
        />
      </div>
    );
  };

  const renderSalesTab = () => {
    if (!salesData) return null;

    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg p-6" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
              <FaChartLine className="inline-block mr-2" style={{ color: theme.primary }} />
              Monthly Sales
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full h-full flex items-end justify-around">
                {salesData.salesByMonth && Object.entries(salesData.salesByMonth).map(([month, amount], index) => (
                  <div key={month} className="flex flex-col items-center">
                    <div className="w-12 rounded-t-lg" 
                      style={{ 
                        height: `${Math.max(20, (amount / Math.max(...Object.values(salesData.salesByMonth))) * 200)}px`,
                        backgroundColor: currentTheme === 'dark' ? theme.primary : theme.primary,
                        opacity: currentTheme === 'dark' ? 0.8 : 0.7,
                      }}
                    ></div>
                    <span className="text-xs mt-2" style={{ color: theme.textLight }}>{month.substring(0, 3)}</span>
                    <span className="text-xs font-semibold" style={{ color: theme.text }}>{formatCurrency(amount).split('.')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
              <FaChartPie className="inline-block mr-2" style={{ color: theme.secondary }} />
              Sales by Category
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                {salesData.salesByCategory && Object.entries(salesData.salesByCategory).map(([category, amount], index) => (
                  <div key={category} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ 
                      backgroundColor: [theme.primary, theme.secondary, theme.success, theme.info, theme.warning, theme.error][index % 6] 
                    }}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium" style={{ color: theme.text }}>{category}</span>
                        <span className="text-sm" style={{ color: theme.textLight }}>{formatCurrency(amount).split('.')[0]}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full rounded-full" style={{ 
                          width: `${(amount / Object.values(salesData.salesByCategory).reduce((a, b) => a + b, 0)) * 100}%`,
                          backgroundColor: [theme.primary, theme.secondary, theme.success, theme.info, theme.warning, theme.error][index % 6]
                        }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProductsTab = () => {
    if (!productData) return null;

    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg p-6" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
              <FaBoxOpen className="inline-block mr-2" style={{ color: theme.success }} />
              Top Selling Products
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider" style={{ color: theme.textLight }}>Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider" style={{ color: theme.textLight }}>Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider" style={{ color: theme.textLight }}>Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.topSellingProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-2" style={{ color: theme.text }}>{product.title}</td>
                      <td className="px-4 py-2" style={{ color: theme.text }}>{formatCurrency(product.price)}</td>
                      <td className="px-4 py-2" style={{ color: theme.text }}>{product.sold || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
              <FaExclamationTriangle className="inline-block mr-2" style={{ color: theme.warning }} />
              Low Stock Products
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider" style={{ color: theme.textLight }}>Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider" style={{ color: theme.textLight }}>Stock</th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider" style={{ color: theme.textLight }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.lowStockProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-2" style={{ color: theme.text }}>{product.title}</td>
                      <td className="px-4 py-2" style={{ color: theme.text }}>{product.stock}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 text-xs rounded-full" style={{ 
                          backgroundColor: product.stock === 0 ? theme.error + '20' : theme.warning + '20',
                          color: product.stock === 0 ? theme.error : theme.warning
                        }}>
                          {product.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ 
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
          boxShadow: theme.shadow,
          borderColor: theme.border,
          border: '1px solid',
        }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
            <FaChartPie className="inline-block mr-2" style={{ color: theme.info }} />
            Products by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productData.productsByCategory && Object.entries(productData.productsByCategory).map(([category, count], index) => (
              <div key={category} className="p-4 rounded-lg" style={{ 
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.7)',
                border: '1px solid',
                borderColor: theme.border
              }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium" style={{ color: theme.text }}>{category}</span>
                  <span className="text-sm font-bold px-2 py-1 rounded-full" style={{ 
                    backgroundColor: [theme.primary, theme.secondary, theme.success, theme.info, theme.warning, theme.error][index % 6] + '20',
                    color: [theme.primary, theme.secondary, theme.success, theme.info, theme.warning, theme.error][index % 6]
                  }}>{count}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-full rounded-full" style={{ 
                    width: `${(count / Object.values(productData.productsByCategory).reduce((a, b) => a + b, 0)) * 100}%`,
                    backgroundColor: [theme.primary, theme.secondary, theme.success, theme.info, theme.warning, theme.error][index % 6]
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderUsersTab = () => {
    if (!userData) return null;

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg p-6" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
              <FaUsers className="inline-block mr-2" style={{ color: theme.info }} />
              User Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg" style={{ 
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.7)',
                border: '1px solid',
                borderColor: theme.border
              }}>
                <div className="text-sm" style={{ color: theme.textLight }}>Total Users</div>
                <div className="text-2xl font-bold" style={{ color: theme.text }}>{userData.totalUsers}</div>
              </div>
              <div className="p-4 rounded-lg" style={{ 
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.7)',
                border: '1px solid',
                borderColor: theme.border
              }}>
                <div className="text-sm" style={{ color: theme.textLight }}>New Users (30 days)</div>
                <div className="text-2xl font-bold" style={{ color: theme.text }}>{userData.newUsers}</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
              <FaChartLine className="inline-block mr-2" style={{ color: theme.primary }} />
              User Growth
            </h3>
            <div className="h-48 flex items-center justify-center">
              <div className="w-full h-full flex items-end justify-around">
                {userData.usersByMonth && Object.entries(userData.usersByMonth).map(([month, count], index) => (
                  <div key={month} className="flex flex-col items-center">
                    <div className="w-12 rounded-t-lg" 
                      style={{ 
                        height: `${Math.max(20, (count / Math.max(...Object.values(userData.usersByMonth))) * 150)}px`,
                        backgroundColor: currentTheme === 'dark' ? theme.info : theme.info,
                        opacity: currentTheme === 'dark' ? 0.8 : 0.7,
                      }}
                    ></div>
                    <span className="text-xs mt-2" style={{ color: theme.textLight }}>{month.substring(0, 3)}</span>
                    <span className="text-xs font-semibold" style={{ color: theme.text }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>Analytics Dashboard</h1>
        <p className="text-sm" style={{ color: theme.textLight }}>
          Comprehensive analytics and insights for your store
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'overview' ? 'font-semibold' : ''}`}
          style={{
            backgroundColor: activeTab === 'overview' 
              ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
              : 'transparent',
            color: activeTab === 'overview' ? theme.primary : theme.text,
            border: `1px solid ${activeTab === 'overview' ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : theme.primary + '30') : 'transparent'}`
          }}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine className="mr-2" /> Overview
        </button>
        <button
          className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'sales' ? 'font-semibold' : ''}`}
          style={{
            backgroundColor: activeTab === 'sales' 
              ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
              : 'transparent',
            color: activeTab === 'sales' ? theme.primary : theme.text,
            border: `1px solid ${activeTab === 'sales' ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : theme.primary + '30') : 'transparent'}`
          }}
          onClick={() => setActiveTab('sales')}
        >
          <FaChartBar className="mr-2" /> Sales
        </button>
        <button
          className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'products' ? 'font-semibold' : ''}`}
          style={{
            backgroundColor: activeTab === 'products' 
              ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
              : 'transparent',
            color: activeTab === 'products' ? theme.primary : theme.text,
            border: `1px solid ${activeTab === 'products' ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : theme.primary + '30') : 'transparent'}`
          }}
          onClick={() => setActiveTab('products')}
        >
          <FaBoxOpen className="mr-2" /> Products
        </button>
        <button
          className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'users' ? 'font-semibold' : ''}`}
          style={{
            backgroundColor: activeTab === 'users' 
              ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
              : 'transparent',
            color: activeTab === 'users' ? theme.primary : theme.text,
            border: `1px solid ${activeTab === 'users' ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : theme.primary + '30') : 'transparent'}`
          }}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers className="mr-2" /> Users
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <div>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'sales' && renderSalesTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'users' && renderUsersTab()}
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
