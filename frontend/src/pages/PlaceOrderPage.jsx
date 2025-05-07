import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/services/orderService';
import { clearCartItems } from '../slices/cartSlice';
import Message from '../components/ui/Message';
import Loader from '../components/ui/Loader';
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, currentTheme } = useTheme();
  const { formatPrice } = useCurrency();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // Calculate prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  useEffect(() => {
    if (!shippingAddress.street) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const confirmOrderHandler = () => {
    setShowConfirmation(true);
  };

  const placeOrderHandler = async () => {
    try {
      console.log('Shipping Address:', shippingAddress);

      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.title,
          quantity: item.qty, // Changed from qty to quantity to match backend model
          image: item.images[0],
          price: item.price,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      console.log('Submitting order data:', orderData);

      const res = await createOrder(orderData).unwrap();
      console.log('Order created successfully:', res);

      dispatch(clearCartItems());
      navigate(`/order/${res.data._id}`);
      setShowConfirmation(false);
    } catch (err) {
      console.error('Error creating order:', err);
      toast.error(err?.data?.error || err.error || 'An error occurred');
      setShowConfirmation(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>Place Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Shipping */}
          <div className="rounded-lg shadow-md p-4 mb-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-lg font-semibold mb-2 flex items-center" style={{ color: theme.text }}>
              <FaMapMarkerAlt className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Shipping
            </h2>
            <div style={{ color: theme.text }}>
              <p className="mb-1"><strong>Name:</strong> {shippingAddress.name || 'Not provided'}</p>
              <p className="mb-1"><strong>Phone:</strong> {shippingAddress.phone || 'Not provided'}</p>
              <p className="mb-1">
                <strong>Address:</strong> {shippingAddress.street},{' '}
                {shippingAddress.city}, {shippingAddress.state},{' '}
                {shippingAddress.zipCode}, {shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-lg shadow-md p-4 mb-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-lg font-semibold mb-2 flex items-center" style={{ color: theme.text }}>
              <FaCreditCard className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Payment Method
            </h2>
            <p style={{ color: theme.text }}>
              <strong>Method:</strong> {paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="rounded-lg shadow-md p-4 mb-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-lg font-semibold mb-2 flex items-center" style={{ color: theme.text }}>
              <FaShoppingCart className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Order Items
            </h2>
            {cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center">
                      <div className="w-16 h-16">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <Link
                          to={`/product/${item._id}`}
                          className="hover:underline" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
                        >
                          {item.title}
                        </Link>
                      </div>
                      <div className="text-right" style={{ color: theme.text }}>
                        {item.qty} x {formatPrice(item.price)} = {formatPrice(item.qty * item.price)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg shadow-md p-4" style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
          }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: theme.text }}>Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between" style={{ color: theme.text }}>
                <span>Items:</span>
                <span>{formatPrice(itemsPrice)}</span>
              </div>
              <div className="flex justify-between" style={{ color: theme.text }}>
                <span>Shipping:</span>
                <span>{formatPrice(shippingPrice)}</span>
              </div>
              <div className="flex justify-between" style={{ color: theme.text }}>
                <span>Tax:</span>
                <span>{formatPrice(taxPrice)}</span>
              </div>
              <div className="flex justify-between font-bold" style={{ color: theme.text }}>
                <span>Total:</span>
                <span style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}>{formatPrice(parseFloat(totalPrice))}</span>
              </div>
            </div>

            {error && (
              <div className="my-3">
                <Message variant="danger">
                  {error?.data?.error || error.error || 'An error occurred'}
                </Message>
              </div>
            )}

            <button
              type="button"
              className="w-full py-3 rounded font-semibold mt-4 transition-all"
              style={{
                backgroundColor: cartItems.length === 0
                  ? (currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : '#e5e7eb')
                  : (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5'),
                color: cartItems.length === 0 ? theme.textLight : '#ffffff',
                border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
                boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.3)' : 'none',
                opacity: cartItems.length === 0 ? 0.6 : 1,
                cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer'
              }}
              disabled={cartItems.length === 0 || isLoading}
              onClick={confirmOrderHandler}
            >
              {isLoading ? <Loader size="small" /> : 'Place Order'}
            </button>

            {/* Order Confirmation Modal */}
            {showConfirmation && (
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="rounded-lg p-6 max-w-md w-full mx-4" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
                  border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(80, 70, 229, 0.3)'}`,
                  boxShadow: currentTheme === 'dark' ? '0 0 20px rgba(0, 242, 255, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div className="text-center mb-4">
                    <FaCheckCircle size={50} style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>Confirm Your Order</h3>
                    <p style={{ color: theme.textLight }}>Are you sure you want to place this order?</p>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      className="px-4 py-2 rounded font-medium"
                      style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : '#e5e7eb',
                        color: theme.text
                      }}
                      onClick={() => setShowConfirmation(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded font-medium"
                      style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5',
                        color: '#ffffff',
                        border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
                        boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.3)' : 'none'
                      }}
                      onClick={placeOrderHandler}
                    >
                      {isLoading ? <Loader size="small" /> : 'Confirm Order'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
