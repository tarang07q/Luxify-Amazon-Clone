import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/ui/FormContainer';
import { FaShippingFast } from 'react-icons/fa';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [street, setStreet] = useState(shippingAddress?.street || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [state, setState] = useState(shippingAddress?.state || '');
  const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        street,
        city,
        state,
        zipCode,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <FormContainer>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center">
          <FaShippingFast className="mr-2" /> Shipping
        </h1>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="street" className="block text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            className="input-field"
            placeholder="Enter street address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            className="input-field"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            id="state"
            className="input-field"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700 mb-1">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            className="input-field"
            placeholder="Enter zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="input-field"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingPage;
