import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation 
} from '../../slices/services/paymentService';
import { useCreateOrderMutation } from '../../slices/services/orderService';
import { clearCart } from '../../slices/cartSlice';
import Loader from '../ui/Loader';
import { 
  FaCreditCard, 
  FaLock, 
  FaShieldAlt,
  FaCheckCircle 
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [confirmPayment] = useConfirmPaymentMutation();
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    // Create payment intent when component mounts
    const initializePayment = async () => {
      try {
        const result = await createPaymentIntent({
          amount: orderData.totalPrice,
          currency: 'usd'
        }).unwrap();
        
        setClientSecret(result.clientSecret);
      } catch (error) {
        toast.error('Failed to initialize payment');
      }
    };

    if (orderData.totalPrice > 0) {
      initializePayment();
    }
  }, [orderData.totalPrice, createPaymentIntent]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: orderData.shippingAddress.fullName,
            email: orderData.user.email,
            address: {
              line1: orderData.shippingAddress.address,
              city: orderData.shippingAddress.city,
              state: orderData.shippingAddress.state,
              postal_code: orderData.shippingAddress.postalCode,
              country: orderData.shippingAddress.country,
            },
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Create order in database
        const order = await createOrder({
          ...orderData,
          paymentMethod: 'stripe',
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
            email_address: orderData.user.email
          },
          isPaid: true,
          paidAt: new Date().toISOString()
        }).unwrap();

        // Clear cart
        dispatch(clearCart());
        
        // Show success message
        toast.success('Payment successful! Order placed.');
        
        // Call success callback
        onSuccess(order);
        
        // Navigate to order confirmation
        navigate(`/order/${order._id}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: theme.text,
        backgroundColor: theme.inputBg,
        '::placeholder': {
          color: theme.textLight,
        },
        iconColor: theme.primary,
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 rounded-lg" style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`
      }}>
        <div className="flex items-center mb-4">
          <FaCreditCard className="mr-2" style={{ color: theme.primary }} />
          <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
            Payment Information
          </h3>
          <FaLock className="ml-auto" style={{ color: theme.textLight }} />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
            Card Details
          </label>
          <div className="p-3 rounded-lg border" style={{
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder
          }}>
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <div className="flex items-center text-sm" style={{ color: theme.textLight }}>
          <FaShieldAlt className="mr-2" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className="w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all"
        style={{
          backgroundColor: theme.primary,
          color: '#ffffff',
          opacity: (!stripe || isProcessing || !clientSecret) ? 0.6 : 1
        }}
      >
        {isProcessing ? (
          <Loader size="small" />
        ) : (
          <>
            <FaCheckCircle className="mr-2" />
            Complete Payment (${orderData.totalPrice.toFixed(2)})
          </>
        )}
      </button>
    </form>
  );
};

const StripeCheckout = ({ orderData, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderData={orderData} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripeCheckout;
