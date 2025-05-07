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

  useEffect(() => {
    console.log('OrderPage - useEffect triggered', { isLoading, error, order });
    if (!isLoading && !error) {
      refetch();
    }
  }, [orderId, refetch, isLoading, error]);

  const updateStatusHandler = async (status) => {
    try {
      await updateOrderStatus({
        orderId,
        status,
      }).unwrap();
      toast.success(`Order marked as ${status}`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
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

  console.log('OrderPage - Rendering order data:', order);

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
              <div className="mt-6 border-t pt-4">
                <h3 className="text-md font-semibold mb-2" style={{ color: theme.text }}>Admin Controls</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatusHandler('Packed')}
                    disabled={
                      order.data.status !== 'Pending' || loadingUpdate
                    }
                    className={`px-3 py-1 rounded text-sm ${
                      order.data.status !== 'Pending' || loadingUpdate
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Mark as Packed
                  </button>
                  <button
                    onClick={() => updateStatusHandler('Shipped')}
                    disabled={
                      order.data.status !== 'Packed' || loadingUpdate
                    }
                    className={`px-3 py-1 rounded text-sm ${
                      order.data.status !== 'Packed' || loadingUpdate
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => updateStatusHandler('Delivered')}
                    disabled={
                      order.data.status !== 'Shipped' || loadingUpdate
                    }
                    className={`px-3 py-1 rounded text-sm ${
                      order.data.status !== 'Shipped' || loadingUpdate
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    Mark as Delivered
                  </button>
                  <button
                    onClick={() => updateStatusHandler('Cancelled')}
                    disabled={
                      order.data.status === 'Delivered' ||
                      order.data.status === 'Cancelled' ||
                      loadingUpdate
                    }
                    className={`px-3 py-1 rounded text-sm ${
                      order.data.status === 'Delivered' ||
                      order.data.status === 'Cancelled' ||
                      loadingUpdate
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    Cancel Order
                  </button>
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
            <p className="mb-2" style={{ color: theme.text }}>
              <strong>Method:</strong> {order.data.paymentMethod}
            </p>
            <p className="mb-2" style={{ color: theme.text }}>
              <strong>Status:</strong>{' '}
              {order.data.isPaid ? (
                <span className="text-green-600">
                  Paid on {new Date(order.data.paidAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-red-600">Not Paid</span>
              )}
            </p>

            {!order.data.isPaid && !showPaymentProcessor && (
              <button
                onClick={() => setShowPaymentProcessor(true)}
                className="mt-3 text-white px-4 py-2 rounded hover:opacity-90 flex items-center transition-opacity"
                style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5',
                  color: '#ffffff',
                  border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
                  boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.3)' : 'none'
                }}
                disabled={loadingPayment}
              >
                <FaMoneyBill className="mr-2" />
                {loadingPayment ? 'Processing...' : 'Pay Now'}
              </button>
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
                      <Link
                        to={`/product/${item.product}`}
                        className="hover:underline" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-right" style={{ color: theme.text }}>
                      {item.quantity} x {formatPrice(item.price)} = {formatPrice(item.quantity * item.price)}
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
