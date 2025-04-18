import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Message from '../components/ui/Message';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { user } = useSelector((state) => state.auth);

  // Calculate prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const updateQtyHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=/shipping');
    } else {
      navigate('/shipping');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaShoppingCart className="mr-2" /> Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <Message>
            Your cart is empty{' '}
            <Link to="/" className="text-primary hover:underline">
              Go Back
            </Link>
          </Message>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="p-4">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="sm:w-20 mb-4 sm:mb-0">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-20 object-contain"
                        />
                      </div>
                      <div className="sm:ml-4 sm:flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <Link
                            to={`/product/${item._id}`}
                            className="text-lg font-medium text-gray-800 hover:text-primary"
                          >
                            {item.title}
                          </Link>
                          <div className="mt-2 sm:mt-0 text-gray-800 font-bold">
                            ${(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
                          <div className="flex items-center">
                            <span className="mr-2">Qty:</span>
                            <select
                              value={item.qty}
                              onChange={(e) =>
                                updateQtyHandler(item, Number(e.target.value))
                              }
                              className="border rounded p-1"
                            >
                              {[...Array(Math.min(item.stock, 10)).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <button
                            type="button"
                            className="mt-2 sm:mt-0 text-red-500 hover:text-red-700"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <Link
                to="/"
                className="flex items-center text-primary hover:underline"
              >
                <FaArrowLeft className="mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Items ({cartItems.reduce((a, c) => a + c.qty, 0)}):</span>
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
              <button
                type="button"
                className="w-full btn-primary mt-4"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
