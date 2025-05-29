import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useGetAnalyticsQuery } from '../../slices/services/analyticsService';
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import { useTheme } from '../../context/ThemeContext';
import {
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
  FaBox,
  FaTrendingUp,
  FaTrendingDown,
  FaCalendarAlt,
  FaFilter
} from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  const { theme, currentTheme } = useTheme();
  const [dateRange, setDateRange] = useState('30'); // days
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: analytics, isLoading, error, refetch } = useGetAnalyticsQuery({
    days: dateRange
  });

  useEffect(() => {
    refetch();
  }, [dateRange, refreshKey, refetch]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <Message variant="danger">
        Failed to load analytics data. Please try again.
      </Message>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.text
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.textLight
        },
        grid: {
          color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        ticks: {
          color: theme.textLight
        },
        grid: {
          color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  const revenueData = {
    labels: analytics?.revenueChart?.labels || [],
    datasets: [
      {
        label: 'Revenue ($)',
        data: analytics?.revenueChart?.data || [],
        borderColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5',
        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const ordersData = {
    labels: analytics?.ordersChart?.labels || [],
    datasets: [
      {
        label: 'Orders',
        data: analytics?.ordersChart?.data || [],
        backgroundColor: currentTheme === 'dark' ? 'rgba(1, 255, 195, 0.8)' : 'rgba(16, 185, 129, 0.8)',
        borderColor: currentTheme === 'dark' ? '#01ffc3' : '#10b981',
        borderWidth: 1
      }
    ]
  };

  const categoryData = {
    labels: analytics?.topCategories?.map(cat => cat.name) || [],
    datasets: [
      {
        data: analytics?.topCategories?.map(cat => cat.count) || [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 0
      }
    ]
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <div className="p-6 rounded-lg shadow-lg" style={{
      backgroundColor: theme.cardBg,
      border: `1px solid ${theme.border}`
    }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: theme.textLight }}>
            {title}
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color: theme.text }}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <FaTrendingUp className="text-green-500 mr-1" />
              ) : (
                <FaTrendingDown className="text-red-500 mr-1" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trendValue}%
              </span>
              <span className="text-sm ml-1" style={{ color: theme.textLight }}>
                vs last period
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme.text }}>
            Analytics Dashboard
          </h1>
          <p style={{ color: theme.textLight }}>
            Track your business performance and insights
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-lg border"
            style={{
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: theme.inputBorder
            }}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          
          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: theme.primary,
              color: '#ffffff'
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={analytics?.totalUsers?.toLocaleString() || '0'}
          icon={FaUsers}
          trend={analytics?.usersTrend > 0 ? 'up' : 'down'}
          trendValue={Math.abs(analytics?.usersTrend || 0)}
          color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
        />
        
        <StatCard
          title="Total Revenue"
          value={`$${analytics?.totalRevenue?.toLocaleString() || '0'}`}
          icon={FaDollarSign}
          trend={analytics?.revenueTrend > 0 ? 'up' : 'down'}
          trendValue={Math.abs(analytics?.revenueTrend || 0)}
          color="#10b981"
        />
        
        <StatCard
          title="Total Orders"
          value={analytics?.totalOrders?.toLocaleString() || '0'}
          icon={FaShoppingCart}
          trend={analytics?.ordersTrend > 0 ? 'up' : 'down'}
          trendValue={Math.abs(analytics?.ordersTrend || 0)}
          color="#f59e0b"
        />
        
        <StatCard
          title="Total Products"
          value={analytics?.totalProducts?.toLocaleString() || '0'}
          icon={FaBox}
          color="#8b5cf6"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="p-6 rounded-lg shadow-lg" style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            Revenue Trend
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        {/* Orders Chart */}
        <div className="p-6 rounded-lg shadow-lg" style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            Orders Overview
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={ordersData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Categories */}
        <div className="p-6 rounded-lg shadow-lg" style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            Top Categories
          </h3>
          <div style={{ height: '250px' }}>
            <Doughnut 
              data={categoryData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: theme.text,
                      padding: 20
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-2 p-6 rounded-lg shadow-lg" style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            Top Selling Products
          </h3>
          <div className="space-y-3">
            {analytics?.topProducts?.slice(0, 5).map((product, index) => (
              <div key={product._id} className="flex items-center justify-between p-3 rounded-lg" style={{
                backgroundColor: theme.cardHoverBg
              }}>
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3" style={{
                    backgroundColor: theme.primary,
                    color: '#ffffff'
                  }}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium" style={{ color: theme.text }}>
                      {product.title}
                    </p>
                    <p className="text-sm" style={{ color: theme.textLight }}>
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: theme.text }}>
                    ${product.revenue?.toLocaleString()}
                  </p>
                  <p className="text-sm" style={{ color: theme.textLight }}>
                    Revenue
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
