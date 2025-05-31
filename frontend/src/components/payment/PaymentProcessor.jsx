import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaSpinner } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Payment processor component that simulates payment processing
 * @param {Object} props - Component props
 * @param {number} props.amount - Payment amount
 * @param {string} props.paymentMethod - Selected payment method
 * @param {Function} props.onSuccess - Callback function on successful payment
 * @param {Function} props.onCancel - Callback function on cancelled payment
 */
const PaymentProcessor = ({ amount, paymentMethod, onSuccess, onCancel }) => {
  const [processing, setProcessing] = useState(false);
  const { currency, formatPrice } = useCurrency();
  const { theme, currentTheme } = useTheme();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  // Handle input change for credit card form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Validate credit card form
  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'Credit Card') {
      if (!cardDetails.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }

      if (!cardDetails.cardName.trim()) {
        newErrors.cardName = 'Name on card is required';
      }

      if (!cardDetails.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Expiry date must be in MM/YY format';
      }

      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Process payment
  const processPayment = () => {
    if (paymentMethod === 'Credit Card' && !validateForm()) {
      return;
    }

    setProcessing(true);

    // Simulate payment processing with better UX
    setTimeout(() => {
      setProcessing(false);

      // 95% success rate for demo purposes
      const isSuccess = Math.random() < 0.95;

      if (isSuccess) {
        const paymentId = `LUX-${Date.now().toString().slice(-8)}`;
        toast.success(`✅ Payment of ${formatPrice(amount)} processed successfully!`);

        onSuccess({
          id: paymentId,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: 'customer@luxify.com',
          payment_method: paymentMethod,
          amount: amount
        });
      } else {
        toast.error('❌ Payment failed. Please check your details and try again.');
      }
    }, 3000); // Slightly longer for more realistic feel
  };

  // Render payment method specific UI
  const renderPaymentMethodUI = () => {
    switch (paymentMethod) {
      case 'Credit Card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                maxLength="19"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full p-2 border rounded ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cardName && (
                <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={`w-full p-2 border rounded ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength="5"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength="4"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'PayPal':
        return (
          <div className="text-center p-4">
            <FaPaypal className="text-blue-500 text-5xl mx-auto mb-4" />
            <p className="mb-4">
              You will be redirected to PayPal to complete your payment of {formatPrice(amount)}.
            </p>
            <p className="text-sm text-gray-500">
              Note: This is a demo. No actual PayPal integration is implemented.
            </p>
          </div>
        );

      case 'Cash on Delivery':
        return (
          <div className="text-center p-4">
            <FaMoneyBillWave className="text-green-500 text-5xl mx-auto mb-4" />
            <p className="mb-4">
              Pay {formatPrice(amount)} in cash when your order is delivered.
            </p>
            <p className="text-sm text-gray-500">
              Please have the exact amount ready for the delivery person.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6" style={{
      backgroundColor: theme.cardBg,
      color: theme.text,
      border: `1px solid ${theme.border}`
    }}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaCreditCard className="mr-2 text-primary" />
        Payment Details
      </h2>

      <div className="mb-6">
        <p className="text-lg font-medium mb-2">
          Total Amount: <span style={{ color: theme.primary }}>{formatPrice(amount)}</span>
        </p>
        <p style={{ color: theme.textLight }}>
          Payment Method: {paymentMethod}
        </p>
      </div>

      {renderPaymentMethodUI()}

      <div className="mt-6 flex justify-between">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded hover:opacity-90 transition-opacity"
          style={{
            border: `1px solid ${theme.border}`,
            color: theme.text,
            backgroundColor: 'transparent'
          }}
          disabled={processing}
        >
          Cancel
        </button>

        <button
          onClick={processPayment}
          className="px-4 py-2 text-white rounded hover:opacity-90 flex items-center transition-opacity"
          style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : theme.primary,
            border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
            boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.3)' : 'none'
          }}
          disabled={processing}
        >
          {processing ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            'Complete Payment'
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentProcessor;
