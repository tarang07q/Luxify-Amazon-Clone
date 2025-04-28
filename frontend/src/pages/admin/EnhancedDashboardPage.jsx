import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/services/productService';
import { useGetAllOrdersQuery } from '../../slices/services/orderService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import DashboardCards from '../../components/admin/DashboardCards';
import LargeCube from '../../components/3d/LargeCube';
import { useTheme } from '../../context/ThemeContext';
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaChartPie,
  FaChartBar,
  FaPlus,
  FaEdit,
  FaTags,
  FaExclamationTriangle,
  FaArrowRight
} from 'react-icons/fa';
import './EnhancedDashboard.css';

const EnhancedDashboardPage = () => {
  const { theme } = useTheme();
  const { data: productsData, isLoading: productsLoading, error: productsError } =
    useGetProductsQuery({ limit: 100 });

  const { data: ordersData, isLoading: ordersLoading, error: ordersError } =
    useGetAllOrdersQuery();

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    lowStockProducts: 0,
  });

  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (productsData && ordersData) {
      // Calculate statistics
      const totalSales = ordersData.data.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      );

      const pendingOrders = ordersData.data.filter(
        (order) => order.status === 'Pending'
      ).length;

      const shippedOrders = ordersData.data.filter(
        (order) => order.status === 'Shipped'
      ).length;

      const deliveredOrders = ordersData.data.filter(
        (order) => order.status === 'Delivered'
      ).length;

      const lowStockProducts = productsData.data.filter(
        (product) => product.stock < 5
      ).length;

      setStats({
        totalSales,
        totalOrders: ordersData.data.length,
        totalProducts: productsData.data.length,
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        lowStockProducts,
      });
    }
  }, [productsData, ordersData]);

  const isLoading = productsLoading || ordersLoading;
  const error = productsError || ordersError;

  return (
    <div className="enhanced-dashboard-container" style={{
      backgroundColor: theme.background,
      color: theme.text
    }}>
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <FaChartLine className="dashboard-title-icon" /> Admin Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Welcome back! Here's an overview of your store's performance.
        </p>
      </div>

      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error || 'An error occurred'}
        </Message>
      ) : (
        <>
          {/* 3D Dashboard Cards */}
          <DashboardCards />

          {/* Stats Cards */}
          <div className="enhanced-stats-grid">
            <div
              className="enhanced-stat-card sales"
              onMouseEnter={() => setHoveredCard('sales')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: theme.cardBg,
                boxShadow: theme.shadow,
                borderColor: theme.border
              }}
            >
              <div className="enhanced-stat-content">
                <div className="enhanced-stat-icon-container">
                  <LargeCube size={120} autoRotate={true} />
                </div>
                <div className="enhanced-stat-details">
                  <p className="enhanced-stat-label" style={{ color: theme.textLight }}>Total Sales</p>
                  <p className="enhanced-stat-value" style={{ color: theme.text }}>${stats.totalSales.toFixed(2)}</p>
                  <div className="enhanced-stat-trend positive">
                    <span>+12.5%</span> from last month
                  </div>
                </div>
              </div>
            </div>

            <div
              className="enhanced-stat-card orders"
              onMouseEnter={() => setHoveredCard('orders')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: theme.cardBg,
                boxShadow: theme.shadow,
                borderColor: theme.border
              }}
            >
              <div className="enhanced-stat-content">
                <div className="enhanced-stat-icon-container">
                  <LargeCube size={120} autoRotate={true} />
                </div>
                <div className="enhanced-stat-details">
                  <p className="enhanced-stat-label" style={{ color: theme.textLight }}>Total Orders</p>
                  <p className="enhanced-stat-value" style={{ color: theme.text }}>{stats.totalOrders}</p>
                  <div className="enhanced-stat-trend positive">
                    <span>+8.2%</span> from last month
                  </div>
                </div>
              </div>
            </div>

            <div
              className="enhanced-stat-card products"
              onMouseEnter={() => setHoveredCard('products')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: theme.cardBg,
                boxShadow: theme.shadow,
                borderColor: theme.border
              }}
            >
              <div className="enhanced-stat-content">
                <div className="enhanced-stat-icon-container">
                  <LargeCube size={120} autoRotate={true} />
                </div>
                <div className="enhanced-stat-details">
                  <p className="enhanced-stat-label" style={{ color: theme.textLight }}>Total Products</p>
                  <p className="enhanced-stat-value" style={{ color: theme.text }}>{stats.totalProducts}</p>
                  <div className="enhanced-stat-trend positive">
                    <span>+5.3%</span> new products
                  </div>
                </div>
              </div>
            </div>

            <div
              className="enhanced-stat-card low-stock"
              onMouseEnter={() => setHoveredCard('lowStock')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: theme.cardBg,
                boxShadow: theme.shadow,
                borderColor: theme.border
              }}
            >
              <div className="enhanced-stat-content">
                <div className="enhanced-stat-icon-container">
                  <LargeCube size={120} autoRotate={true} />
                </div>
                <div className="enhanced-stat-details">
                  <p className="enhanced-stat-label" style={{ color: theme.textLight }}>Low Stock Items</p>
                  <p className="enhanced-stat-value" style={{ color: theme.text }}>{stats.lowStockProducts}</p>
                  <div className="enhanced-stat-trend negative">
                    <span>Action needed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="enhanced-quick-actions"
            style={{
              backgroundColor: theme.cardBg,
              boxShadow: theme.shadow,
              borderColor: theme.border
            }}
          >
            <div className="enhanced-card-header" style={{ borderColor: theme.border }}>
              <h2 className="enhanced-card-title" style={{ color: theme.text }}>
                Quick Actions
              </h2>
            </div>
            <div className="enhanced-actions-grid">
              <Link
                to="/admin/products"
                className="enhanced-action-button products"
                onMouseEnter={() => setHoveredCard('actionProducts')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: theme.primary,
                  color: theme.buttonText
                }}
              >
                <div className="enhanced-action-icon">
                  <DashboardIcon3D
                    type="products"
                    width={40}
                    height={40}
                    color="#ffffff"
                    isHovered={hoveredCard === 'actionProducts'}
                    scale={0.8}
                  />
                </div>
                <div className="enhanced-action-text">
                  <span>Manage Products</span>
                  <FaArrowRight className="enhanced-action-arrow" />
                </div>
              </Link>

              <Link
                to="/admin/orders"
                className="enhanced-action-button orders"
                onMouseEnter={() => setHoveredCard('actionOrders')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.buttonText
                }}
              >
                <div className="enhanced-action-icon">
                  <DashboardIcon3D
                    type="orders"
                    width={40}
                    height={40}
                    color="#ffffff"
                    isHovered={hoveredCard === 'actionOrders'}
                    scale={0.8}
                  />
                </div>
                <div className="enhanced-action-text">
                  <span>Manage Orders</span>
                  <FaArrowRight className="enhanced-action-arrow" />
                </div>
              </Link>

              <Link
                to="/admin/products/new"
                className="enhanced-action-button add-product"
                onMouseEnter={() => setHoveredCard('actionAdd')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: theme.success,
                  color: theme.buttonText
                }}
              >
                <div className="enhanced-action-icon">
                  <DashboardIcon3D
                    type="add"
                    width={40}
                    height={40}
                    color="#ffffff"
                    isHovered={hoveredCard === 'actionAdd'}
                    scale={0.8}
                  />
                </div>
                <div className="enhanced-action-text">
                  <span>Add New Product</span>
                  <FaArrowRight className="enhanced-action-arrow" />
                </div>
              </Link>
            </div>
          </div>

          {/* Order Status and Recent Orders */}
          <div className="enhanced-dashboard-grid">
            <div
              className="enhanced-dashboard-card"
              style={{
                backgroundColor: theme.cardBg,
                boxShadow: theme.shadow,
                borderColor: theme.border
              }}
            >
              <div
                className="enhanced-card-header"
                style={{ borderColor: theme.border }}
                onMouseEnter={() => setHoveredCard('pieChart')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="enhanced-card-title-container">
                  <div className="enhanced-card-title-icon">
                    <DashboardIcon3D
                      type="pieChart"
                      width={40}
                      height={40}
                      color={theme.primary}
                      isHovered={hoveredCard === 'pieChart'}
                      scale={0.8}
                    />
                  </div>
                  <h2 className="enhanced-card-title" style={{ color: theme.text }}>
                    Order Status
                  </h2>
                </div>
              </div>
              <div className="enhanced-card-content">
                <div className="enhanced-progress-container">
                  <div className="enhanced-progress-header">
                    <span className="enhanced-progress-label" style={{ color: theme.text }}>Pending</span>
                    <span className="enhanced-progress-value" style={{ color: theme.text }}>{stats.pendingOrders}</span>
                  </div>
                  <div className="enhanced-progress-bar-bg" style={{ backgroundColor: theme.border }}>
                    <div
                      className="enhanced-progress-bar pending"
                      style={{
                        width: `${
                          stats.totalOrders
                            ? (stats.pendingOrders / stats.totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="enhanced-progress-container">
                  <div className="enhanced-progress-header">
                    <span className="enhanced-progress-label" style={{ color: theme.text }}>Shipped</span>
                    <span className="enhanced-progress-value" style={{ color: theme.text }}>{stats.shippedOrders}</span>
                  </div>
                  <div className="enhanced-progress-bar-bg" style={{ backgroundColor: theme.border }}>
                    <div
                      className="enhanced-progress-bar shipped"
                      style={{
                        width: `${
                          stats.totalOrders
                            ? (stats.shippedOrders / stats.totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="enhanced-progress-container">
                  <div className="enhanced-progress-header">
                    <span className="enhanced-progress-label" style={{ color: theme.text }}>Delivered</span>
                    <span className="enhanced-progress-value" style={{ color: theme.text }}>{stats.deliveredOrders}</span>
                  </div>
                  <div className="enhanced-progress-bar-bg" style={{ backgroundColor: theme.border }}>
                    <div
                      className="enhanced-progress-bar delivered"
                      style={{
                        width: `${
                          stats.totalOrders
                            ? (stats.deliveredOrders / stats.totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="enhanced-dashboard-card"
              style={{
                backgroundColor: theme.cardBg,
                boxShadow: theme.shadow,
                borderColor: theme.border
              }}
            >
              <div
                className="enhanced-card-header"
                style={{ borderColor: theme.border }}
                onMouseEnter={() => setHoveredCard('chart')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="enhanced-card-title-container">
                  <div className="enhanced-card-title-icon">
                    <DashboardIcon3D
                      type="chart"
                      width={40}
                      height={40}
                      color={theme.primary}
                      isHovered={hoveredCard === 'chart'}
                      scale={0.8}
                    />
                  </div>
                  <h2 className="enhanced-card-title" style={{ color: theme.text }}>
                    Recent Orders
                  </h2>
                </div>
                <Link
                  to="/admin/orders"
                  className="enhanced-view-all-link"
                  style={{ color: theme.primary }}
                >
                  View All
                </Link>
              </div>
              <div className="enhanced-table-container">
                <table className="enhanced-dashboard-table">
                  <thead className="enhanced-table-header" style={{ backgroundColor: theme.background }}>
                    <tr>
                      <th style={{ color: theme.textLight }}>ID</th>
                      <th style={{ color: theme.textLight }}>Date</th>
                      <th style={{ color: theme.textLight }}>Total</th>
                      <th style={{ color: theme.textLight }}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="enhanced-table-body">
                    {ordersData.data.slice(0, 5).map((order) => (
                      <tr key={order._id} style={{ borderColor: theme.border }}>
                        <td>
                          <Link
                            to={`/order/${order._id}`}
                            className="enhanced-table-link"
                            style={{ color: theme.primary }}
                          >
                            {order._id.substring(0, 8)}...
                          </Link>
                        </td>
                        <td style={{ color: theme.text }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ color: theme.text }}>
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td>
                          <span
                            className={`enhanced-status-badge ${
                              order.status === 'Delivered'
                                ? 'delivered'
                                : order.status === 'Shipped'
                                ? 'shipped'
                                : 'pending'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Low Stock Products */}
          <div
            className="enhanced-dashboard-card full-width"
            style={{
              backgroundColor: theme.cardBg,
              boxShadow: theme.shadow,
              borderColor: theme.border
            }}
          >
            <div
              className="enhanced-card-header"
              style={{ borderColor: theme.border }}
              onMouseEnter={() => setHoveredCard('lowStockTable')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="enhanced-card-title-container">
                <div className="enhanced-card-title-icon">
                  <DashboardIcon3D
                    type="lowStock"
                    width={40}
                    height={40}
                    color="#EF4444"
                    isHovered={hoveredCard === 'lowStockTable'}
                    scale={0.8}
                  />
                </div>
                <h2 className="enhanced-card-title" style={{ color: theme.text }}>
                  Low Stock Products
                </h2>
              </div>
              <Link
                to="/admin/products"
                className="enhanced-view-all-link"
                style={{ color: theme.primary }}
              >
                View All Products
              </Link>
            </div>
            <div className="enhanced-table-container">
              <table className="enhanced-dashboard-table">
                <thead className="enhanced-table-header" style={{ backgroundColor: theme.background }}>
                  <tr>
                    <th style={{ color: theme.textLight }}>Product</th>
                    <th style={{ color: theme.textLight }}>Category</th>
                    <th style={{ color: theme.textLight }}>Price</th>
                    <th style={{ color: theme.textLight }}>Stock</th>
                    <th style={{ color: theme.textLight }}>Action</th>
                  </tr>
                </thead>
                <tbody className="enhanced-table-body">
                  {productsData.data
                    .filter((product) => product.stock < 5)
                    .slice(0, 5)
                    .map((product) => (
                      <tr key={product._id} style={{ borderColor: theme.border }}>
                        <td>
                          <div className="enhanced-product-row">
                            <img
                              className="enhanced-product-image"
                              src={product.images[0]}
                              alt={product.title}
                            />
                            <span style={{ color: theme.text }}>{product.title}</span>
                          </div>
                        </td>
                        <td style={{ color: theme.text }}>{product.category}</td>
                        <td style={{ color: theme.text }}>${product.price.toFixed(2)}</td>
                        <td>
                          <span className="enhanced-stock-badge">
                            {product.stock}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                            className="enhanced-edit-button"
                            style={{
                              backgroundColor: theme.primary,
                              color: theme.buttonText
                            }}
                          >
                            <FaEdit /> Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedDashboardPage;
