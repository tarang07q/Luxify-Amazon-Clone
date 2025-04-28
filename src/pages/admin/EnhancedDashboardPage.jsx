import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/services/productService';
import { useGetAllOrdersQuery } from '../../slices/services/orderService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import CubeIcon from '../../components/3d/CubeIcon';
import ModernCube from '../../components/3d/ModernCube';
import DashboardCards from '../../components/admin/DashboardCards';
import { useTheme } from '../../context/ThemeContext';
import {
  FaBoxes,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaChartArea,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import './EnhancedDashboard.css';

const EnhancedDashboardPage = () => {
  const { theme, currentTheme } = useTheme();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 100, // Placeholder
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({});

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetAllOrdersQuery();

  useEffect(() => {
    if (products && products.products) {
      setStats((prevStats) => ({
        ...prevStats,
        totalProducts: products.products.length,
      }));

      // Set top products (for demo, just take first 5)
      const sortedProducts = [...products.products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      setTopProducts(sortedProducts);
    }
  }, [products]);

  useEffect(() => {
    if (orders) {
      // Calculate total revenue and set recent orders
      let revenue = 0;
      orders.forEach((order) => {
        if (order.isPaid) {
          revenue += order.totalPrice;
        }
      });

      setStats((prevStats) => ({
        ...prevStats,
        totalOrders: orders.length,
        totalRevenue: revenue,
      }));

      // Set recent orders (latest 5)
      const sortedOrders = [...orders]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5);
      setRecentOrders(sortedOrders);
    }
  }, [orders]);

  if (productsLoading || ordersLoading) {
    return <Loader />;
  }

  if (productsError) {
    return (
      <Message variant="danger">
        {productsError?.data?.message || productsError.error}
      </Message>
    );
  }

  if (ordersError) {
    return (
      <Message variant="danger">
        {ordersError?.data?.message || ordersError.error}
      </Message>
    );
  }

  return (
    <div className="enhanced-dashboard">
      <div className="enhanced-dashboard-header">
        <h1 className="enhanced-dashboard-title">Admin Dashboard</h1>
        <p className="enhanced-dashboard-subtitle">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      <div className="enhanced-stats-grid">
        {/* Products Stat */}
        <div
          className="enhanced-stat-card"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div className="enhanced-stat-content">
            <div className="enhanced-stat-icon-container">
              <CubeIcon
                iconType="product"
                size={80}
                autoRotate={true}
                color={theme.primary}
              />
            </div>
            <div className="enhanced-stat-info">
              <h3 className="enhanced-stat-title">Total Products</h3>
              <p className="enhanced-stat-value">{stats.totalProducts}</p>
              <Link to="/admin/products" className="enhanced-stat-link">
                View All Products
              </Link>
            </div>
          </div>
        </div>

        {/* Orders Stat */}
        <div
          className="enhanced-stat-card"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div className="enhanced-stat-content">
            <div className="enhanced-stat-icon-container">
              <CubeIcon
                iconType="order"
                size={80}
                autoRotate={true}
                color={theme.secondary}
              />
            </div>
            <div className="enhanced-stat-info">
              <h3 className="enhanced-stat-title">Total Orders</h3>
              <p className="enhanced-stat-value">{stats.totalOrders}</p>
              <Link to="/admin/orders" className="enhanced-stat-link">
                View All Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Revenue Stat */}
        <div
          className="enhanced-stat-card"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div className="enhanced-stat-content">
            <div className="enhanced-stat-icon-container">
              <CubeIcon
                iconType="dashboard"
                size={80}
                autoRotate={true}
                color={theme.success}
              />
            </div>
            <div className="enhanced-stat-info">
              <h3 className="enhanced-stat-title">Total Revenue</h3>
              <p className="enhanced-stat-value">
                ${stats.totalRevenue.toFixed(2)}
              </p>
              <span className="enhanced-stat-trend enhanced-trend-up">
                <FaChartLine /> +12.5% from last month
              </span>
            </div>
          </div>
        </div>

        {/* Users Stat */}
        <div
          className="enhanced-stat-card"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div className="enhanced-stat-content">
            <div className="enhanced-stat-icon-container">
              <CubeIcon
                iconType="user"
                size={80}
                autoRotate={true}
                color={theme.info}
              />
            </div>
            <div className="enhanced-stat-info">
              <h3 className="enhanced-stat-title">Total Users</h3>
              <p className="enhanced-stat-value">{stats.totalUsers}</p>
              <span className="enhanced-stat-trend enhanced-trend-up">
                <FaChartLine /> +5.2% from last month
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="enhanced-dashboard-sections">
        {/* Recent Orders Section */}
        <div
          className="enhanced-dashboard-section"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div className="enhanced-section-header">
            <h2 className="enhanced-section-title">Recent Orders</h2>
            <Link to="/admin/orders" className="enhanced-view-all">
              View All
            </Link>
          </div>
          <div className="enhanced-section-content">
            {recentOrders.length === 0 ? (
              <p className="enhanced-no-data">No recent orders found.</p>
            ) : (
              <div className="enhanced-table-container">
                <table className="enhanced-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <span className="enhanced-order-id">
                            #{order._id.substring(order._id.length - 6)}
                          </span>
                        </td>
                        <td>{order.user ? order.user.name : 'Unknown User'}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                        <td>
                          <span
                            className={`enhanced-status ${
                              order.isPaid
                                ? 'enhanced-status-paid'
                                : 'enhanced-status-pending'
                            }`}
                          >
                            {order.isPaid ? 'Paid' : 'Pending'}
                          </span>
                          <span
                            className={`enhanced-status ${
                              order.isDelivered
                                ? 'enhanced-status-delivered'
                                : 'enhanced-status-processing'
                            }`}
                          >
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                          </span>
                        </td>
                        <td>
                          <div className="enhanced-actions">
                            <Link
                              to={`/order/${order._id}`}
                              className="enhanced-action-btn enhanced-view-btn"
                              title="View Order"
                            >
                              <FaEye />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Top Products Section */}
        <div
          className="enhanced-dashboard-section"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div className="enhanced-section-header">
            <h2 className="enhanced-section-title">Top Products</h2>
            <Link to="/admin/products" className="enhanced-view-all">
              View All
            </Link>
          </div>
          <div className="enhanced-section-content">
            {topProducts.length === 0 ? (
              <p className="enhanced-no-data">No products found.</p>
            ) : (
              <div className="enhanced-products-grid">
                {topProducts.map((product) => (
                  <div
                    key={product._id}
                    className="enhanced-product-card"
                    style={{
                      backgroundColor: theme.cardBg,
                      boxShadow: theme.shadow,
                      borderColor: theme.border
                    }}
                  >
                    <div className="enhanced-product-image">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.png';
                        }}
                      />
                    </div>
                    <div className="enhanced-product-details">
                      <h3 className="enhanced-product-name">{product.name}</h3>
                      <div className="enhanced-product-meta">
                        <span className="enhanced-product-price">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="enhanced-product-rating">
                          ★ {product.rating} ({product.numReviews} reviews)
                        </span>
                      </div>
                      <div className="enhanced-product-stock">
                        <span
                          className={`enhanced-stock-status ${
                            product.countInStock > 0
                              ? 'enhanced-in-stock'
                              : 'enhanced-out-of-stock'
                          }`}
                        >
                          {product.countInStock > 0
                            ? `In Stock (${product.countInStock})`
                            : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="enhanced-product-actions">
                        <Link
                          to={`/product/${product._id}`}
                          className="enhanced-action-btn enhanced-view-btn"
                          title="View Product"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to={`/admin/product/${product._id}/edit`}
                          className="enhanced-action-btn enhanced-edit-btn"
                          title="Edit Product"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="enhanced-quick-actions">
        <Link
          to="/admin/products/new"
          className="enhanced-quick-action-btn"
          style={{
            backgroundColor: theme.primary,
            color: theme.buttonText
          }}
        >
          <FaPlus /> Add New Product
        </Link>
        <Link
          to="/admin/products"
          className="enhanced-quick-action-btn"
          style={{
            backgroundColor: theme.secondary,
            color: theme.buttonText
          }}
        >
          <FaBoxes /> Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="enhanced-quick-action-btn"
          style={{
            backgroundColor: theme.accent,
            color: theme.buttonText
          }}
        >
          <FaShoppingCart /> Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default EnhancedDashboardPage;
