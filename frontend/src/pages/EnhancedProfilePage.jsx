import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetMyOrdersQuery } from '../slices/services/orderService';
import { useGetMeQuery } from '../slices/services/authService';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import LargeCube from '../components/3d/LargeCube';
import { useTheme } from '../context/ThemeContext';
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaAddressCard,
  FaCreditCard,
  FaEdit,
  FaEye,
  FaArrowRight,
  FaShippingFast,
  FaBox,
  FaCheckCircle
} from 'react-icons/fa';
import './EnhancedProfile.css';

const EnhancedProfilePage = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetMyOrdersQuery();

  const { data: userData, isLoading: userLoading, refetch } = useGetMeQuery();

  useEffect(() => {
    if (userData?.data) {
      setName(userData.data.name);
      setEmail(userData.data.email);
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [userData, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // This is a placeholder for the update profile functionality
    // In a real app, you would call an API endpoint to update the user profile
    toast.success('Profile updated successfully');
    setEditMode(false);
    setPassword('');
    setConfirmPassword('');
    refetch(); // Refresh user data
  };

  // Calculate order statistics
  const orderStats = {
    total: orders?.data?.length || 0,
    pending: orders?.data?.filter(order => order.status === 'Pending').length || 0,
    shipped: orders?.data?.filter(order => order.status === 'Shipped').length || 0,
    delivered: orders?.data?.filter(order => order.status === 'Delivered').length || 0,
    totalSpent: orders?.data?.reduce((sum, order) => sum + order.totalPrice, 0) || 0
  };

  return (
    <div className="enhanced-profile-container" style={{
      backgroundColor: theme.background,
      color: theme.text
    }}>
      <div className="profile-header">
        <h1 className="profile-title">
          <FaUser className="profile-title-icon" /> My Account
        </h1>
        <p className="profile-subtitle">
          Manage your account details and view your order history
        </p>
      </div>

      <div className="enhanced-profile-grid">
        {/* User Profile Card */}
        <div
          className="enhanced-profile-card user-info"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div
            className="enhanced-card-header"
            style={{ borderColor: theme.border }}
            onMouseEnter={() => setHoveredCard('user')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="enhanced-card-title-container">
              <div className="enhanced-card-title-icon">
                <LargeCube
                  size={40}
                  autoRotate={true}
                />
              </div>
              <h2 className="enhanced-card-title" style={{ color: theme.text }}>
                {editMode ? 'Edit Profile' : 'Profile Information'}
              </h2>
            </div>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="enhanced-edit-profile-button"
                style={{
                  backgroundColor: theme.primary,
                  color: theme.buttonText
                }}
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            )}
          </div>

          <div className="enhanced-card-content">
            {editMode ? (
              <form onSubmit={submitHandler} className="enhanced-profile-form">
                <div className="enhanced-form-group">
                  <label htmlFor="name" style={{ color: theme.text }}>Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="enhanced-form-input"
                    style={{
                      backgroundColor: theme.inputBg || theme.background,
                      color: theme.text,
                      borderColor: theme.border
                    }}
                  />
                </div>

                <div className="enhanced-form-group">
                  <label htmlFor="email" style={{ color: theme.text }}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="enhanced-form-input"
                    style={{
                      backgroundColor: theme.inputBg || theme.background,
                      color: theme.text,
                      borderColor: theme.border
                    }}
                  />
                </div>

                <div className="enhanced-form-group">
                  <label htmlFor="password" style={{ color: theme.text }}>Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password (leave blank to keep current)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="enhanced-form-input"
                    style={{
                      backgroundColor: theme.inputBg || theme.background,
                      color: theme.text,
                      borderColor: theme.border
                    }}
                  />
                </div>

                <div className="enhanced-form-group">
                  <label htmlFor="confirmPassword" style={{ color: theme.text }}>Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="enhanced-form-input"
                    style={{
                      backgroundColor: theme.inputBg || theme.background,
                      color: theme.text,
                      borderColor: theme.border
                    }}
                  />
                </div>

                <div className="enhanced-form-actions">
                  <button
                    type="submit"
                    className="enhanced-save-button"

                    style={{
                      backgroundColor: theme.primary,
                      color: theme.buttonText
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setName(user.name);
                      setEmail(user.email);
                      setPassword('');
                      setConfirmPassword('');
                    }}
                    className="enhanced-cancel-button"
                    style={{
                      backgroundColor: 'transparent',
                      color: theme.text,
                      borderColor: theme.border
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="enhanced-profile-info">
                <div className="enhanced-profile-avatar" style={{ backgroundColor: theme.primary }}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="enhanced-profile-details">
                  <div className="enhanced-profile-field">
                    <span className="enhanced-field-label" style={{ color: theme.textLight }}>Name</span>
                    <span className="enhanced-field-value" style={{ color: theme.text }}>{user?.name}</span>
                  </div>
                  <div className="enhanced-profile-field">
                    <span className="enhanced-field-label" style={{ color: theme.textLight }}>Email</span>
                    <span className="enhanced-field-value" style={{ color: theme.text }}>{user?.email}</span>
                  </div>
                  <div className="enhanced-profile-field">
                    <span className="enhanced-field-label" style={{ color: theme.textLight }}>Member Since</span>
                    <span className="enhanced-field-value" style={{ color: theme.text }}>
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Stats */}
        <div
          className="enhanced-profile-card order-stats"
          style={{
            backgroundColor: theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border
          }}
        >
          <div
            className="enhanced-card-header"
            style={{ borderColor: theme.border }}
            onMouseEnter={() => setHoveredCard('orders')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="enhanced-card-title-container">
              <div className="enhanced-card-title-icon">
                <LargeCube
                  size={40}
                  autoRotate={true}
                />
              </div>
              <h2 className="enhanced-card-title" style={{ color: theme.text }}>
                Order Summary
              </h2>
            </div>
          </div>

          <div className="enhanced-card-content">
            {ordersLoading || userLoading ? (
              <Loader />
            ) : ordersError ? (
              <Message variant="danger">
                {ordersError?.data?.message || ordersError.error || 'An error occurred'}
              </Message>
            ) : (
              <div className="enhanced-stats-grid">
                <div
                  className="enhanced-stat-item"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border
                  }}
                >
                  <div className="enhanced-stat-icon" style={{ color: theme.primary }}>
                    <FaShoppingBag />
                  </div>
                  <div className="enhanced-stat-value" style={{ color: theme.text }}>{orderStats.total}</div>
                  <div className="enhanced-stat-label" style={{ color: theme.textLight }}>Total Orders</div>
                </div>

                <div
                  className="enhanced-stat-item"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border
                  }}
                >
                  <div className="enhanced-stat-icon" style={{ color: '#F59E0B' }}>
                    <FaBox />
                  </div>
                  <div className="enhanced-stat-value" style={{ color: theme.text }}>{orderStats.pending}</div>
                  <div className="enhanced-stat-label" style={{ color: theme.textLight }}>Pending</div>
                </div>

                <div
                  className="enhanced-stat-item"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border
                  }}
                >
                  <div className="enhanced-stat-icon" style={{ color: '#3B82F6' }}>
                    <FaShippingFast />
                  </div>
                  <div className="enhanced-stat-value" style={{ color: theme.text }}>{orderStats.shipped}</div>
                  <div className="enhanced-stat-label" style={{ color: theme.textLight }}>Shipped</div>
                </div>

                <div
                  className="enhanced-stat-item"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border
                  }}
                >
                  <div className="enhanced-stat-icon" style={{ color: '#10B981' }}>
                    <FaCheckCircle />
                  </div>
                  <div className="enhanced-stat-value" style={{ color: theme.text }}>{orderStats.delivered}</div>
                  <div className="enhanced-stat-label" style={{ color: theme.textLight }}>Delivered</div>
                </div>
              </div>
            )}

            <div
              className="enhanced-total-spent"
              style={{
                backgroundColor: theme.primary,
                color: theme.buttonText
              }}
            >
              <span>Total Spent</span>
              <span className="enhanced-amount">${orderStats.totalSpent.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div
        className="enhanced-quick-links"
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
        <div className="enhanced-links-grid">
          <Link
            to="/orders"
            className="enhanced-link-button"
            onMouseEnter={() => setHoveredCard('linkOrders')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            <div className="enhanced-link-icon" style={{ color: theme.primary }}>
              <LargeCube
                size={40}
                autoRotate={true}
              />
            </div>
            <div className="enhanced-link-text">
              <span className="enhanced-link-title" style={{ color: theme.text }}>My Orders</span>
              <span className="enhanced-link-desc" style={{ color: theme.textLight }}>View and track your orders</span>
            </div>
            <FaArrowRight className="enhanced-link-arrow" style={{ color: theme.primary }} />
          </Link>

          <Link
            to="/wishlist"
            className="enhanced-link-button"
            onMouseEnter={() => setHoveredCard('linkWishlist')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            <div className="enhanced-link-icon" style={{ color: theme.primary }}>
              <LargeCube
                size={40}
                autoRotate={true}
              />
            </div>
            <div className="enhanced-link-text">
              <span className="enhanced-link-title" style={{ color: theme.text }}>Wishlist</span>
              <span className="enhanced-link-desc" style={{ color: theme.textLight }}>Products you've saved</span>
            </div>
            <FaArrowRight className="enhanced-link-arrow" style={{ color: theme.primary }} />
          </Link>

          <Link
            to="/address"
            className="enhanced-link-button"
            onMouseEnter={() => setHoveredCard('linkAddress')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            <div className="enhanced-link-icon" style={{ color: theme.primary }}>
              <LargeCube
                size={40}
                autoRotate={true}
              />
            </div>
            <div className="enhanced-link-text">
              <span className="enhanced-link-title" style={{ color: theme.text }}>Addresses</span>
              <span className="enhanced-link-desc" style={{ color: theme.textLight }}>Manage your addresses</span>
            </div>
            <FaArrowRight className="enhanced-link-arrow" style={{ color: theme.primary }} />
          </Link>

          <Link
            to="/payment-methods"
            className="enhanced-link-button"
            onMouseEnter={() => setHoveredCard('linkPayment')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border
            }}
          >
            <div className="enhanced-link-icon" style={{ color: theme.primary }}>
              <LargeCube
                size={40}
                autoRotate={true}
              />
            </div>
            <div className="enhanced-link-text">
              <span className="enhanced-link-title" style={{ color: theme.text }}>Payment Methods</span>
              <span className="enhanced-link-desc" style={{ color: theme.textLight }}>Manage your payment options</span>
            </div>
            <FaArrowRight className="enhanced-link-arrow" style={{ color: theme.primary }} />
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div
        className="enhanced-profile-card recent-orders"
        style={{
          backgroundColor: theme.cardBg,
          boxShadow: theme.shadow,
          borderColor: theme.border
        }}
      >
        <div
          className="enhanced-card-header"
          style={{ borderColor: theme.border }}
          onMouseEnter={() => setHoveredCard('recentOrders')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="enhanced-card-title-container">
            <div className="enhanced-card-title-icon">
              <LargeCube
                size={40}
                autoRotate={true}
              />
            </div>
            <h2 className="enhanced-card-title" style={{ color: theme.text }}>
              Recent Orders
            </h2>
          </div>
          <Link
            to="/orders"
            className="enhanced-view-all-link"
            style={{ color: theme.primary }}
          >
            View All
          </Link>
        </div>

        <div className="enhanced-card-content">
          {ordersLoading || userLoading ? (
            <Loader />
          ) : ordersError ? (
            <Message variant="danger">
              {ordersError?.data?.message || ordersError.error || 'An error occurred'}
            </Message>
          ) : orders?.data?.length === 0 ? (
            <Message>You have no orders yet</Message>
          ) : (
            <div className="enhanced-table-container">
              <table className="enhanced-profile-table">
                <thead className="enhanced-table-header" style={{ backgroundColor: theme.background }}>
                  <tr>
                    <th style={{ color: theme.textLight }}>ID</th>
                    <th style={{ color: theme.textLight }}>Date</th>
                    <th style={{ color: theme.textLight }}>Total</th>
                    <th style={{ color: theme.textLight }}>Status</th>
                    <th style={{ color: theme.textLight }}>Action</th>
                  </tr>
                </thead>
                <tbody className="enhanced-table-body">
                  {orders.data.slice(0, 5).map((order) => (
                    <tr key={order._id} style={{ borderColor: theme.border }}>
                      <td style={{ color: theme.text }}>{order._id.substring(0, 8)}...</td>
                      <td style={{ color: theme.text }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td style={{ color: theme.text }}>${order.totalPrice.toFixed(2)}</td>
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
                      <td>
                        <Link
                          to={`/order/${order._id}`}
                          className="enhanced-view-button"
                          style={{
                            backgroundColor: theme.primary,
                            color: theme.buttonText
                          }}
                        >
                          <FaEye className="mr-1" /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfilePage;
