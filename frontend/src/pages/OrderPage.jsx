import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  useUpdateOrderStatusMutation,
  useUpdateOrderPaymentMutation,
} from '../slices/services/orderService';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import OrderDoc3D from '../components/3d/OrderDoc3D';
import PaymentProcessor from '../components/payment/PaymentProcessor';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheck,
  FaTruck,
  FaBox,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaMoneyBill,
  FaMoneyBillWave,
  FaClock,
} from 'react-icons/fa';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { theme, currentTheme } = useTheme();
  const { formatPrice } = useCurrency();
  const [showPaymentProcessor, setShowPaymentProcessor] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log('OrderPage - Rendering with orderId:', orderId);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId, {
    // Add error handling for the query
    onError: (err) => {
      console.error('Error fetching order details:', err);
      setErrorMessage(err?.data?.error || err.error || 'Failed to load order details');
    }
  });

  const [updateOrderStatus, { isLoading: loadingUpdate }] =
    useUpdateOrderStatusMutation();

  const [updateOrderPayment, { isLoading: loadingPayment }] =
    useUpdateOrderPaymentMutation();

  const { user } = useSelector((state) => state.auth);

  // Helper function to normalize status for comparison
  const normalizeStatus = (status) => status?.toLowerCase();

  // Helper function to check if status matches any of the allowed statuses
  const isStatusAllowed = (currentStatus, allowedStatuses) => {
    const normalized = normalizeStatus(currentStatus);
    return allowedStatuses.some(status => normalizeStatus(status) === normalized);
  };

  useEffect(() => {
    console.log('OrderPage - useEffect triggered', { isLoading, error, order });
    if (!isLoading && !error) {
      refetch();
    }
  }, [orderId, refetch, isLoading, error]);

  const updateStatusHandler = async (status, paymentReceived = false) => {
    try {
      console.log('🔄 Updating order status:', { orderId, status, paymentReceived });
      console.log('👤 Current user:', user);
      console.log('🔑 User role:', user?.role);

      const updateData = {
        orderId,
        status,
      };

      if (paymentReceived) {
        updateData.paymentReceived = true;
      }

      console.log('📤 Sending update data:', updateData);
      const result = await updateOrderStatus(updateData).unwrap();
      console.log('✅ Order status updated successfully:', result);

      const message = paymentReceived
        ? `Order marked as ${status} and payment received`
        : `Order marked as ${status}`;

      toast.success(message);
      refetch();
    } catch (err) {
      console.error('❌ Error updating order status:', err);
      console.error('❌ Full error object:', JSON.stringify(err, null, 2));
      const errorMessage = err?.data?.message || err?.data?.error || err?.message || err.error || 'Failed to update order status';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const handlePaymentSuccess = async (paymentResult) => {
    try {
      await updateOrderPayment({
        orderId,
        paymentResult,
      }).unwrap();
      setShowPaymentProcessor(false);
      toast.success('Payment completed successfully!');
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentProcessor(false);
  };

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FaBox className="text-yellow-500" />;
      case 'Packed':
        return <FaBoxOpen className="text-blue-500" />;
      case 'Shipped':
        return <FaTruck className="text-purple-500" />;
      case 'Delivered':
        return <FaCheck className="text-green-500" />;
      default:
        return null;
    }
  };

  // Check if order data is available
  if (isLoading) {
    return <Loader />;
  }

  if (error || errorMessage) {
    return (
      <Message variant="danger">
        {errorMessage || error?.data?.error || error.error || 'An error occurred'}
      </Message>
    );
  }

  if (!order || !order.data) {
    return (
      <Message variant="danger">
        Order data not available. Please try again later.
      </Message>
    );
  }

  // Additional safety checks for order data structure
  const orderData = order.data;
  if (!orderData.orderItems || !orderData.shippingAddress || !orderData.user) {
    return (
      <Message variant="danger">
        Order data is incomplete. Please try refreshing the page.
      </Message>
    );
  }

  console.log('OrderPage - Rendering order data:', order);
  console.log('📊 Order status:', order?.data?.status);
  console.log('💰 Order prices:', {
    totalPrice: order?.data?.totalPrice,
    itemsPrice: order?.data?.itemsPrice,
    shippingPrice: order?.data?.shippingPrice,
    taxPrice: order?.data?.taxPrice
  });
  console.log('🔍 Status checks:', {
    currentStatus: order?.data?.status,
    packAllowed: isStatusAllowed(order?.data?.status, ['Pending', 'Processing']),
    shipAllowed: isStatusAllowed(order?.data?.status, ['Packed']),
    deliverAllowed: isStatusAllowed(order?.data?.status, ['Shipped', 'Out for Delivery']),
    cancelAllowed: !isStatusAllowed(order?.data?.status, ['Delivered', 'Cancelled'])
  });

  // For testing: Let's make Ship Order and Mark Delivered buttons always enabled for pending status
  const currentStatus = order?.data?.status?.toLowerCase();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="container mx-auto px-4 py-6" style={{ color: theme.text }}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
        Order {order.data._id}
      </h1>
      <p style={{ color: theme.textLight }} className="mb-6">
        Placed on {new Date(order.data.createdAt).toLocaleDateString()}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Order Status */}
          <div className="rounded-lg shadow-md p-4 mb-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Order Status</h2>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: order.data.status === 'Pending' ||
                      order.data.status === 'Packed' ||
                      order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                      ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(16, 185, 129, 0.1)')
                      : (currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)')
                  }}
                >
                  <FaBox
                    style={{
                      color: order.data.status === 'Pending' ||
                        order.data.status === 'Packed' ||
                        order.data.status === 'Shipped' ||
                        order.data.status === 'Delivered'
                        ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                        : (currentTheme === 'dark' ? '#4b5563' : '#9ca3af')
                    }}
                  />
                </div>
                <span className="mt-2 text-sm" style={{ color: theme.text }}>Pending</span>
              </div>
              <div className="flex-1 h-1 mx-2" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)'
              }}>
                <div
                  className="h-full"
                  style={{
                    backgroundColor: order.data.status === 'Packed' ||
                      order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                      ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                      : 'transparent'
                  }}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: order.data.status === 'Packed' ||
                      order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                      ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(16, 185, 129, 0.1)')
                      : (currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)')
                  }}
                >
                  <FaBoxOpen
                    style={{
                      color: order.data.status === 'Packed' ||
                        order.data.status === 'Shipped' ||
                        order.data.status === 'Delivered'
                        ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                        : (currentTheme === 'dark' ? '#4b5563' : '#9ca3af')
                    }}
                  />
                </div>
                <span className="mt-2 text-sm" style={{ color: theme.text }}>Packed</span>
              </div>
              <div className="flex-1 h-1 mx-2" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)'
              }}>
                <div
                  className="h-full"
                  style={{
                    backgroundColor: order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                      ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                      : 'transparent'
                  }}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                      ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(16, 185, 129, 0.1)')
                      : (currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)')
                  }}
                >
                  <FaTruck
                    style={{
                      color: order.data.status === 'Shipped' ||
                        order.data.status === 'Delivered'
                        ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                        : (currentTheme === 'dark' ? '#4b5563' : '#9ca3af')
                    }}
                  />
                </div>
                <span className="mt-2 text-sm" style={{ color: theme.text }}>Shipped</span>
              </div>
              <div className="flex-1 h-1 mx-2" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)'
              }}>
                <div
                  className="h-full"
                  style={{
                    backgroundColor: order.data.status === 'Delivered'
                      ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                      : 'transparent'
                  }}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: order.data.status === 'Delivered'
                      ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(16, 185, 129, 0.1)')
                      : (currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)')
                  }}
                >
                  <FaCheck
                    style={{
                      color: order.data.status === 'Delivered'
                        ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                        : (currentTheme === 'dark' ? '#4b5563' : '#9ca3af')
                    }}
                  />
                </div>
                <span className="mt-2 text-sm" style={{ color: theme.text }}>Delivered</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-lg font-medium flex items-center justify-center" style={{ color: theme.text }}>
                <span style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#10b981', marginRight: '8px' }}>
                  {getStatusIcon(order.data.status)}
                </span>
                <span className="ml-2">Current Status: {order.data.status}</span>
              </p>
              {order.data.deliveredAt && (
                <p className="text-sm mt-1" style={{ color: theme.textLight }}>
                  Delivered on{' '}
                  {new Date(order.data.deliveredAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Admin Controls */}
            {user && user.role === 'admin' && (
              <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${theme.border}` }}>
                <h3 className="text-md font-semibold mb-3" style={{ color: theme.text }}>
                  🛠️ Admin Controls
                </h3>

                {/* Current Status Display */}
                <div className="mb-4 p-3 rounded-lg" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                }}>
                  <p className="text-sm" style={{ color: theme.textLight }}>
                    Current Status: <span className="font-semibold" style={{ color: theme.text }}>{order.data.status}</span>
                  </p>
                  {order.data.trackingNumber && (
                    <p className="text-sm mt-1" style={{ color: theme.textLight }}>
                      Tracking: <span className="font-mono" style={{ color: theme.text }}>{order.data.trackingNumber}</span>
                    </p>
                  )}
                  {order.data.paymentMethod === 'Cash on Delivery' && !order.data.isPaid && (
                    <p className="text-sm mt-1" style={{ color: theme.warning }}>
                      💰 Payment will be collected on delivery
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                  <button
                    onClick={() => updateStatusHandler('Packed')}
                    disabled={
                      !isStatusAllowed(order.data.status, ['Pending', 'Processing']) || loadingUpdate
                    }
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      !isStatusAllowed(order.data.status, ['Pending', 'Processing']) || loadingUpdate
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: !isStatusAllowed(order.data.status, ['Pending', 'Processing']) || loadingUpdate
                        ? theme.border
                        : currentTheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#3b82f6',
                      color: !isStatusAllowed(order.data.status, ['Pending', 'Processing']) || loadingUpdate
                        ? theme.textLight
                        : '#ffffff',
                      border: currentTheme === 'dark' ? '1px solid rgba(59, 130, 246, 0.3)' : 'none'
                    }}
                  >
                    📦 Pack Order
                  </button>

                  <button
                    onClick={() => updateStatusHandler('Shipped')}
                    disabled={
                      !isStatusAllowed(order.data.status, ['Packed']) || loadingUpdate
                    }
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      !isStatusAllowed(order.data.status, ['Packed']) || loadingUpdate
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: !isStatusAllowed(order.data.status, ['Packed']) || loadingUpdate
                        ? theme.border
                        : currentTheme === 'dark' ? 'rgba(147, 51, 234, 0.2)' : '#9333ea',
                      color: !isStatusAllowed(order.data.status, ['Packed']) || loadingUpdate
                        ? theme.textLight
                        : '#ffffff',
                      border: currentTheme === 'dark' ? '1px solid rgba(147, 51, 234, 0.3)' : 'none'
                    }}
                  >
                    🚚 Ship Order
                  </button>

                  <button
                    onClick={() => updateStatusHandler('Delivered')}
                    disabled={
                      !isStatusAllowed(order.data.status, ['Shipped', 'Out for Delivery']) || loadingUpdate
                    }
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      !isStatusAllowed(order.data.status, ['Shipped', 'Out for Delivery']) || loadingUpdate
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: !isStatusAllowed(order.data.status, ['Shipped', 'Out for Delivery']) || loadingUpdate
                        ? theme.border
                        : currentTheme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#22c55e',
                      color: !isStatusAllowed(order.data.status, ['Shipped', 'Out for Delivery']) || loadingUpdate
                        ? theme.textLight
                        : '#ffffff',
                      border: currentTheme === 'dark' ? '1px solid rgba(34, 197, 94, 0.3)' : 'none'
                    }}
                  >
                    ✅ Mark Delivered
                  </button>
                </div>

                {/* Payment and Cancel Controls */}
                <div className="grid grid-cols-2 gap-2">
                  {!order.data.isPaid && (
                    <button
                      onClick={() => updateStatusHandler(order.data.status, true)}
                      disabled={loadingUpdate}
                      className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                        loadingUpdate ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                      style={{
                        backgroundColor: loadingUpdate
                          ? theme.border
                          : currentTheme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#10b981',
                        color: loadingUpdate ? theme.textLight : '#ffffff',
                        border: currentTheme === 'dark' ? '1px solid rgba(34, 197, 94, 0.3)' : 'none'
                      }}
                    >
                      💰 Mark Payment Received
                    </button>
                  )}

                  <button
                    onClick={() => updateStatusHandler('Cancelled')}
                    disabled={
                      isStatusAllowed(order.data.status, ['Delivered', 'Cancelled']) || loadingUpdate
                    }
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      isStatusAllowed(order.data.status, ['Delivered', 'Cancelled']) || loadingUpdate
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: isStatusAllowed(order.data.status, ['Delivered', 'Cancelled']) || loadingUpdate
                        ? theme.border
                        : currentTheme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#ef4444',
                      color: isStatusAllowed(order.data.status, ['Delivered', 'Cancelled']) || loadingUpdate
                        ? theme.textLight
                        : '#ffffff',
                      border: currentTheme === 'dark' ? '1px solid rgba(239, 68, 68, 0.3)' : 'none'
                    }}
                  >
                    ❌ Cancel Order
                  </button>
                </div>

                {/* Additional Admin Info */}
                <div className="mt-4 p-3 rounded-lg" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.1)' : 'rgba(243, 244, 246, 0.8)',
                  border: `1px solid ${theme.border}`
                }}>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: theme.text }}>
                    📋 Order Management Notes
                  </h4>
                  <ul className="text-xs space-y-1" style={{ color: theme.textLight }}>
                    <li>• Cash on Delivery orders are automatically marked as paid when delivered</li>
                    <li>• Tracking numbers are generated when orders are shipped</li>
                    <li>• Estimated delivery is set to 4 days from shipping date</li>
                    <li>• Orders can only be cancelled before delivery</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Shipping */}
          <div className="rounded-lg shadow-md p-4 mb-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Shipping
            </h2>
            <p className="mb-2" style={{ color: theme.text }}>
              <strong>Name:</strong> {order.data.user.name}
            </p>
            <p className="mb-2" style={{ color: theme.text }}>
              <strong>Email:</strong>{' '}
              <a
                href={`mailto:${order.data.user.email}`}
                className="hover:underline" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
              >
                {order.data.user.email}
              </a>
            </p>
            <p style={{ color: theme.text }}>
              <strong>Address:</strong> {order.data.shippingAddress.street},{' '}
              {order.data.shippingAddress.city},{' '}
              {order.data.shippingAddress.state},{' '}
              {order.data.shippingAddress.zipCode},{' '}
              {order.data.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="rounded-lg shadow-md p-4 mb-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaCreditCard className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Payment
            </h2>
            <div className="mb-3">
              <p className="mb-2" style={{ color: theme.text }}>
                <strong>Method:</strong> <span className="font-semibold">{order.data.paymentMethod}</span>
              </p>

              {/* Enhanced Payment Status */}
              <div className="flex items-center mb-3">
                <span style={{ color: theme.text }}><strong>Status:</strong></span>
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold flex items-center`} style={{
                  backgroundColor: order.data.isPaid
                    ? (currentTheme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)')
                    : (currentTheme === 'dark' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.1)'),
                  color: order.data.isPaid ? theme.success : theme.warning,
                  border: `1px solid ${order.data.isPaid ? 'rgba(34, 197, 94, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
                }}>
                  {order.data.isPaid ? (
                    <>
                      <FaCheck className="mr-1" />
                      Paid on {new Date(order.data.paidAt).toLocaleDateString()}
                    </>
                  ) : (
                    <>
                      <FaClock className="mr-1" />
                      {order.data.paymentMethod === 'Cash on Delivery' ? 'Payment on Delivery' : 'Payment Pending'}
                    </>
                  )}
                </span>
              </div>

              {/* Cash on Delivery Information */}
              {order.data.paymentMethod === 'Cash on Delivery' && (
                <div className="p-3 rounded-lg mb-3" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.05)',
                  border: `1px solid ${currentTheme === 'dark' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.2)'}`
                }}>
                  <div className="flex items-center mb-2">
                    <FaMoneyBillWave className="mr-2" style={{ color: theme.warning }} />
                    <span className="font-semibold text-sm" style={{ color: theme.text }}>Cash on Delivery</span>
                  </div>
                  <p className="text-sm" style={{ color: theme.textLight }}>
                    {!order.data.isPaid ? (
                      <>💰 Pay <strong style={{ color: theme.text }}>{formatPrice(order.data.totalPrice)}</strong> when your order arrives.</>
                    ) : (
                      <>✅ Payment of <strong style={{ color: theme.text }}>{formatPrice(order.data.totalPrice)}</strong> was collected on delivery.</>
                    )}
                  </p>
                  {!order.data.isPaid && (
                    <p className="text-xs mt-1" style={{ color: theme.textLight }}>
                      Please have the exact amount ready for the delivery person.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* User Payment Actions */}
            {user && user.role !== 'admin' && !order.data.isPaid && order.data.paymentMethod !== 'Cash on Delivery' && (
              <div className="mt-4">
                <button
                  onClick={() => setShowPaymentProcessor(true)}
                  className="w-full text-white px-4 py-3 rounded-lg hover:opacity-90 flex items-center justify-center transition-all font-medium"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5',
                    color: '#ffffff',
                    border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
                    boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.3)' : '0 4px 12px rgba(80, 70, 229, 0.3)'
                  }}
                  disabled={loadingPayment}
                >
                  <FaCreditCard className="mr-2" />
                  {loadingPayment ? 'Processing Payment...' : `Pay ${formatPrice(order.data.totalPrice)} Now`}
                </button>
                <p className="text-xs mt-2 text-center" style={{ color: theme.textLight }}>
                  Secure payment processing
                </p>
              </div>
            )}

            {/* Admin Payment Override */}
            {user && user.role === 'admin' && !order.data.isPaid && (
              <div className="mt-4 p-3 rounded-lg" style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'}`
              }}>
                <p className="text-sm font-semibold mb-2" style={{ color: theme.text }}>
                  🔧 Admin Payment Override
                </p>
                <p className="text-xs mb-3" style={{ color: theme.textLight }}>
                  As an admin, you can manually mark this order as paid or process payment on behalf of the customer.
                </p>
                <button
                  onClick={() => setShowPaymentProcessor(true)}
                  className="w-full text-white px-3 py-2 rounded text-sm hover:opacity-90 flex items-center justify-center transition-opacity"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#ef4444',
                    border: currentTheme === 'dark' ? '1px solid rgba(239, 68, 68, 0.3)' : 'none'
                  }}
                  disabled={loadingPayment}
                >
                  <FaCreditCard className="mr-2" />
                  {loadingPayment ? 'Processing...' : 'Process Payment (Admin)'}
                </button>
              </div>
            )}

            {showPaymentProcessor && (
              <div className="mt-4">
                <PaymentProcessor
                  amount={order.data.totalPrice}
                  paymentMethod={order.data.paymentMethod}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePaymentCancel}
                />
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="rounded-lg shadow-md p-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaShoppingCart className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Order Items
            </h2>
            <ul className="divide-y divide-gray-200">
              {order.data.orderItems.map((item, index) => (
                <li key={index} className="py-3">
                  <div className="flex items-center">
                    <div className="w-16 h-16">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      {item.product ? (
                        <Link
                          to={`/product/${item.product}`}
                          className="hover:underline"
                          style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </div>
                    <div className="text-right" style={{ color: theme.text }}>
                      {(item.qty || item.quantity)} x {formatPrice(item.price)} = {formatPrice((item.qty || item.quantity) * item.price)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg shadow-md p-4 sticky top-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: theme.text }}>Order Summary</h2>

            {/* 3D Order Document */}
            <div className="flex justify-center mb-6">
              <OrderDoc3D
                size={180}
                color={currentTheme === 'dark' ? '#7928ca' : '#8b5cf6'}
                floatingAnimation={true}
                glowEffect={true}
                icon={<FaFileInvoiceDollar size={45} />}
                status={order.data.status}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between" style={{ color: theme.text }}>
                <span>Items:</span>
                <span>{formatPrice(order.data.itemsPrice)}</span>
              </div>
              <div className="flex justify-between" style={{ color: theme.text }}>
                <span>Shipping:</span>
                <span>{formatPrice(order.data.shippingPrice)}</span>
              </div>
              <div className="flex justify-between" style={{ color: theme.text }}>
                <span>Tax:</span>
                <span>{formatPrice(order.data.taxPrice)}</span>
              </div>
              <div className="flex justify-between font-bold" style={{ color: theme.text }}>
                <span>Total:</span>
                <span style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}>{formatPrice(order.data.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
