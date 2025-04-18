import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  useUpdateOrderStatusMutation,
} from '../slices/services/orderService';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheck,
  FaTruck,
  FaBox,
  FaBoxOpen,
} from 'react-icons/fa';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [updateOrderStatus, { isLoading: loadingUpdate }] =
    useUpdateOrderStatusMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
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

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.error || error.error || 'An error occurred'}
    </Message>
  ) : (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">
        Order {order.data._id}
      </h1>
      <p className="text-gray-600 mb-6">
        Placed on {new Date(order.data.createdAt).toLocaleDateString()}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Order Status */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.data.status === 'Pending' ||
                    order.data.status === 'Packed' ||
                    order.data.status === 'Shipped' ||
                    order.data.status === 'Delivered'
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <FaBox
                    className={
                      order.data.status === 'Pending' ||
                      order.data.status === 'Packed' ||
                      order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }
                  />
                </div>
                <span className="mt-2 text-sm">Pending</span>
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200">
                <div
                  className={`h-full ${
                    order.data.status === 'Packed' ||
                    order.data.status === 'Shipped' ||
                    order.data.status === 'Delivered'
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.data.status === 'Packed' ||
                    order.data.status === 'Shipped' ||
                    order.data.status === 'Delivered'
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <FaBoxOpen
                    className={
                      order.data.status === 'Packed' ||
                      order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }
                  />
                </div>
                <span className="mt-2 text-sm">Packed</span>
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200">
                <div
                  className={`h-full ${
                    order.data.status === 'Shipped' ||
                    order.data.status === 'Delivered'
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.data.status === 'Shipped' ||
                    order.data.status === 'Delivered'
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <FaTruck
                    className={
                      order.data.status === 'Shipped' ||
                      order.data.status === 'Delivered'
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }
                  />
                </div>
                <span className="mt-2 text-sm">Shipped</span>
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200">
                <div
                  className={`h-full ${
                    order.data.status === 'Delivered'
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.data.status === 'Delivered'
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <FaCheck
                    className={
                      order.data.status === 'Delivered'
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }
                  />
                </div>
                <span className="mt-2 text-sm">Delivered</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-lg font-medium flex items-center justify-center">
                {getStatusIcon(order.data.status)}
                <span className="ml-2">Current Status: {order.data.status}</span>
              </p>
              {order.data.deliveredAt && (
                <p className="text-sm text-gray-600 mt-1">
                  Delivered on{' '}
                  {new Date(order.data.deliveredAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Admin Controls */}
            {user && user.role === 'admin' && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-md font-semibold mb-2">Admin Controls</h3>
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
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary" /> Shipping
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Name:</strong> {order.data.user.name}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{' '}
              <a
                href={`mailto:${order.data.user.email}`}
                className="text-primary hover:underline"
              >
                {order.data.user.email}
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {order.data.shippingAddress.street},{' '}
              {order.data.shippingAddress.city},{' '}
              {order.data.shippingAddress.state},{' '}
              {order.data.shippingAddress.zipCode},{' '}
              {order.data.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaCreditCard className="mr-2 text-primary" /> Payment
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Method:</strong> {order.data.paymentMethod}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong>{' '}
              {order.data.isPaid ? (
                <span className="text-green-600">
                  Paid on {new Date(order.data.paidAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-red-600">Not Paid</span>
              )}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaShoppingCart className="mr-2 text-primary" /> Order Items
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
                        className="text-primary hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-right">
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${order.data.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${order.data.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.data.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${order.data.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
