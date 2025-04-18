import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/services/productService';
import { useGetAllOrdersQuery } from '../../slices/services/orderService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
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
  FaExclamationTriangle
} from 'react-icons/fa';
import './DashboardPage.css';

const DashboardPage = () => {
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <FaChartLine className="dashboard-title-icon" /> Admin Dashboard
        </h1>
      </div>

      {isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', padding: '40px'}}>
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error || 'An error occurred'}
        </Message>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card sales">
              <div className="stat-content">
                <div className="stat-icon-container">
                  <FaDollarSign className="stat-icon" />
                </div>
                <div className="stat-details">
                  <p className="stat-label">Total Sales</p>
                  <p className="stat-value">${stats.totalSales.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="stat-card orders">
              <div className="stat-content">
                <div className="stat-icon-container">
                  <FaShoppingCart className="stat-icon" />
                </div>
                <div className="stat-details">
                  <p className="stat-label">Total Orders</p>
                  <p className="stat-value">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="stat-card products">
              <div className="stat-content">
                <div className="stat-icon-container">
                  <FaBox className="stat-icon" />
                </div>
                <div className="stat-details">
                  <p className="stat-label">Total Products</p>
                  <p className="stat-value">{stats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="stat-card low-stock">
              <div className="stat-content">
                <div className="stat-icon-container">
                  <FaExclamationTriangle className="stat-icon" />
                </div>
                <div className="stat-details">
                  <p className="stat-label">Low Stock Products</p>
                  <p className="stat-value">{stats.lowStockProducts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status and Recent Orders */}
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="card-title">
                  <FaChartPie className="card-title-icon" /> Order Status
                </h2>
              </div>
              <div>
                <div className="progress-container">
                  <div className="progress-header">
                    <span className="progress-label">Pending</span>
                    <span className="progress-value">{stats.pendingOrders}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar pending"
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
                <div className="progress-container">
                  <div className="progress-header">
                    <span className="progress-label">Shipped</span>
                    <span className="progress-value">{stats.shippedOrders}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar shipped"
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
                <div className="progress-container">
                  <div className="progress-header">
                    <span className="progress-label">Delivered</span>
                    <span className="progress-value">{stats.deliveredOrders}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar delivered"
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

            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="card-title">
                  <FaChartBar className="card-title-icon" /> Recent Orders
                </h2>
                <Link
                  to="/admin/orders"
                  className="view-all-link"
                >
                  View All
                </Link>
              </div>
              <div className="table-container">
                <table className="dashboard-table">
                  <thead className="table-header">
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {ordersData.data.slice(0, 5).map((order) => (
                      <tr key={order._id}>
                        <td>
                          <Link
                            to={`/order/${order._id}`}
                            className="table-link"
                          >
                            {order._id.substring(0, 8)}...
                          </Link>
                        </td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${
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

          {/* Quick Actions */}
          <div className="quick-actions">
            <div className="card-header">
              <h2 className="card-title">Quick Actions</h2>
            </div>
            <div className="actions-grid">
              <Link
                to="/admin/products"
                className="action-button products"
              >
                <FaTags className="action-icon" /> Manage Products
              </Link>
              <Link
                to="/admin/orders"
                className="action-button orders"
              >
                <FaShoppingCart className="action-icon" /> Manage Orders
              </Link>
              <Link
                to="/admin/products/new"
                className="action-button add-product"
              >
                <FaPlus className="action-icon" /> Add New Product
              </Link>
            </div>
          </div>

          {/* Low Stock Products */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">
                <FaExclamationTriangle className="card-title-icon" /> Low Stock Products
              </h2>
              <Link
                to="/admin/products"
                className="view-all-link"
              >
                View All Products
              </Link>
            </div>
            <div className="table-container">
              <table className="dashboard-table">
                <thead className="table-header">
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {productsData.data
                    .filter((product) => product.stock < 5)
                    .slice(0, 5)
                    .map((product) => (
                      <tr key={product._id}>
                        <td>
                          <div className="product-row">
                            <img
                              className="product-image"
                              src={product.images[0]}
                              alt={product.title}
                            />
                            <span className="product-name">{product.title}</span>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              product.stock === 0
                                ? 'out-of-stock'
                                : 'low-stock'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                            className="table-link"
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

export default DashboardPage;
