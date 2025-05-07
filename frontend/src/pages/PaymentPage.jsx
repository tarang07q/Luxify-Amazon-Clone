import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import FormContainer from '../components/ui/FormContainer';
import { FaCreditCard, FaMoneyBillWave, FaPaypal, FaCcVisa } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

const PaymentPage = () => {
  const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector(
    (state) => state.cart
  );
  const { theme, currentTheme } = useTheme();
  const { formatPrice } = useCurrency();

  const [paymentMethod, setPaymentMethod] = useState(
    savedPaymentMethod || 'Cash on Delivery'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.street) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center" style={{ color: theme.text }}>
          <FaCreditCard className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Payment Method
        </h1>
        <p className="text-sm mt-2" style={{ color: theme.textLight }}>
          Choose how you'd like to pay for your order
        </p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label className="block mb-3 text-lg font-semibold" style={{ color: theme.text }}>
            Select Payment Method
          </label>

          <div className="space-y-4 payment-methods">
            <label
              className="payment-method-card p-4 rounded flex items-center cursor-pointer"
              style={{
                backgroundColor: paymentMethod === 'Cash on Delivery'
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)')
                  : (currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb'),
                border: `1px solid ${paymentMethod === 'Cash on Delivery'
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(80, 70, 229, 0.3)')
                  : (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)')}`,
                boxShadow: paymentMethod === 'Cash on Delivery'
                  ? (currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.2)' : 'none')
                  : (currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none')
              }}
            >
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5 mr-3"
                style={{ accentColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
              />
              <div className="flex items-center">
                <div className="payment-icon mr-3 flex items-center justify-center w-10 h-10 rounded-full" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.15)'
                }}>
                  <FaMoneyBillWave size={20} style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
                </div>
                <div>
                  <div className="font-medium" style={{ color: theme.text }}>Cash on Delivery</div>
                  <div className="text-sm" style={{ color: theme.textLight }}>Pay when your order arrives</div>
                </div>
              </div>
            </label>

            <label
              className="payment-method-card p-4 rounded flex items-center cursor-pointer"
              style={{
                backgroundColor: paymentMethod === 'Credit Card'
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)')
                  : (currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb'),
                border: `1px solid ${paymentMethod === 'Credit Card'
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(80, 70, 229, 0.3)')
                  : (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)')}`,
                boxShadow: paymentMethod === 'Credit Card'
                  ? (currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.2)' : 'none')
                  : (currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none')
              }}
            >
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5 mr-3"
                style={{ accentColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
              />
              <div className="flex items-center">
                <div className="payment-icon mr-3 flex items-center justify-center w-10 h-10 rounded-full" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.15)'
                }}>
                  <FaCcVisa size={20} style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
                </div>
                <div>
                  <div className="font-medium" style={{ color: theme.text }}>Credit Card</div>
                  <div className="text-sm" style={{ color: theme.textLight }}>Pay securely with your card</div>
                </div>
              </div>
            </label>

            <label
              className="payment-method-card p-4 rounded flex items-center cursor-pointer"
              style={{
                backgroundColor: paymentMethod === 'PayPal'
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)')
                  : (currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb'),
                border: `1px solid ${paymentMethod === 'PayPal'
                  ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(80, 70, 229, 0.3)')
                  : (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)')}`,
                boxShadow: paymentMethod === 'PayPal'
                  ? (currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.2)' : 'none')
                  : (currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none')
              }}
            >
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5 mr-3"
                style={{ accentColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
              />
              <div className="flex items-center">
                <div className="payment-icon mr-3 flex items-center justify-center w-10 h-10 rounded-full" style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.15)'
                }}>
                  <FaPaypal size={20} style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
                </div>
                <div>
                  <div className="font-medium" style={{ color: theme.text }}>PayPal</div>
                  <div className="text-sm" style={{ color: theme.textLight }}>Pay with your PayPal account</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="order-summary mt-6 mb-6 p-4 rounded" style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
          border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
          boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
        }}>
          <h3 className="text-lg font-semibold mb-3" style={{ color: theme.text }}>Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between" style={{ color: theme.text }}>
              <span>Shipping to:</span>
              <span className="text-right">{shippingAddress.city}, {shippingAddress.state}</span>
            </div>
            <div className="flex justify-between" style={{ color: theme.text }}>
              <span>Payment Method:</span>
              <span>{paymentMethod}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded font-semibold transition-all"
          style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5',
            color: '#ffffff',
            border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
            boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.3)' : 'none'
          }}
        >
          Continue to Review Order
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentPage;
