import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import FormContainer from '../components/ui/FormContainer';
import { FaCreditCard } from 'react-icons/fa';

const PaymentPage = () => {
  const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector(
    (state) => state.cart
  );

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
        <h1 className="text-2xl font-bold flex items-center justify-center">
          <FaCreditCard className="mr-2" /> Payment Method
        </h1>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-3 text-lg font-semibold">
            Select Method
          </label>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5 text-primary"
              />
              <label
                htmlFor="cashOnDelivery"
                className="ml-2 text-gray-700 cursor-pointer"
              >
                Cash on Delivery
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5 text-primary"
              />
              <label
                htmlFor="creditCard"
                className="ml-2 text-gray-700 cursor-pointer"
              >
                Credit Card (Demo)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5 text-primary"
              />
              <label
                htmlFor="paypal"
                className="ml-2 text-gray-700 cursor-pointer"
              >
                PayPal (Demo)
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentPage;
