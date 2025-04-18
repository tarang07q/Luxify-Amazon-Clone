import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/services/orderService';
import { clearCartItems } from '../slices/cartSlice';
import Message from '../components/ui/Message';
import Loader from '../components/ui/Loader';
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.title,
          qty: item.qty,
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

      const res = await createOrder(orderData).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Shipping */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary" /> Shipping
            </h2>
            <p className="text-gray-700">
              <strong>Address:</strong> {shippingAddress.street},{' '}
              {shippingAddress.city}, {shippingAddress.state},{' '}
              {shippingAddress.zipCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaCreditCard className="mr-2 text-primary" /> Payment Method
            </h2>
            <p className="text-gray-700">
              <strong>Method:</strong> {paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaShoppingCart className="mr-2 text-primary" /> Order Items
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
                          className="text-primary hover:underline"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <div className="text-right">
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
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
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${totalPrice}</span>
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
              className="w-full btn-primary mt-4"
              disabled={cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
            >
              {isLoading ? <Loader size="small" /> : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
