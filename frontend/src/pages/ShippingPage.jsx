import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/ui/FormContainer';
import { FaShippingFast, FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaHome, FaMailBulk, FaPhone, FaUser } from 'react-icons/fa';
import { countries, getStates, getCities } from '../data/countries';
import { useTheme } from '../context/ThemeContext';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { theme, currentTheme } = useTheme();

  const [name, setName] = useState(shippingAddress?.name || '');
  const [street, setStreet] = useState(shippingAddress?.street || '');
  const [countryCode, setCountryCode] = useState(shippingAddress?.countryCode || '');
  const [stateCode, setStateCode] = useState(shippingAddress?.stateCode || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || '');
  const [phone, setPhone] = useState(shippingAddress?.phone || '');

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);

  // Update available states when country changes
  useEffect(() => {
    if (countryCode) {
      setAvailableStates(getStates(countryCode));
      setStateCode(''); // Reset state when country changes
      setCity(''); // Reset city when country changes
    } else {
      setAvailableStates([]);
    }
  }, [countryCode]);

  // Update available cities when state changes
  useEffect(() => {
    if (countryCode && stateCode) {
      setAvailableCities(getCities(countryCode, stateCode));
      if (!getCities(countryCode, stateCode).includes(city)) {
        setCity(''); // Reset city if not in the new list
      }
    } else {
      setAvailableCities([]);
    }
  }, [countryCode, stateCode, city]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get country and state names from codes
  const getCountryName = (code) => {
    const country = countries.find(c => c.code === code);
    return country ? country.name : '';
  };

  const getStateName = (countryCode, stateCode) => {
    const country = countries.find(c => c.code === countryCode);
    if (!country) return '';

    const state = country.states.find(s => s.code === stateCode);
    return state ? state.name : '';
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate form
    if (!name || !street || !countryCode || !stateCode || !city || !zipCode) {
      alert('Please fill in all required fields');
      return;
    }

    dispatch(
      saveShippingAddress({
        name,
        street,
        city,
        state: getStateName(countryCode, stateCode),
        stateCode,
        zipCode,
        country: getCountryName(countryCode),
        countryCode,
        phone
      })
    );
    navigate('/payment');
  };

  return (
    <FormContainer>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center" style={{ color: theme.text }}>
          <FaShippingFast className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} /> Shipping Address
        </h1>
        <p className="text-sm mt-2" style={{ color: theme.textLight }}>
          Enter your shipping details to continue with your purchase
        </p>
      </div>

      <form onSubmit={submitHandler} className="shipping-form">
        <div className="mb-4">
          <label htmlFor="name" className="flex items-center mb-1" style={{ color: theme.text }}>
            <FaUser className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
            Full Name <span style={{ color: '#ff4d4d' }} className="ml-1">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="input-field w-full p-2 rounded"
            style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              color: theme.text,
              boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
            }}
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="street" className="flex items-center mb-1" style={{ color: theme.text }}>
            <FaHome className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
            Street Address <span style={{ color: '#ff4d4d' }} className="ml-1">*</span>
          </label>
          <input
            type="text"
            id="street"
            className="input-field w-full p-2 rounded"
            style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              color: theme.text,
              boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
            }}
            placeholder="Enter street address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="flex items-center mb-1" style={{ color: theme.text }}>
            <FaGlobeAmericas className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
            Country <span style={{ color: '#ff4d4d' }} className="ml-1">*</span>
          </label>
          <select
            id="country"
            className="input-field w-full p-2 rounded"
            style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              color: theme.text,
              boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
            }}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="state" className="flex items-center mb-1" style={{ color: theme.text }}>
              <FaMapMarkerAlt className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              State/Province <span style={{ color: '#ff4d4d' }} className="ml-1">*</span>
            </label>
            <select
              id="state"
              className="input-field w-full p-2 rounded"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                color: theme.text,
                boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
              }}
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              disabled={!countryCode}
              required
            >
              <option value="">Select State</option>
              {availableStates.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="flex items-center mb-1" style={{ color: theme.text }}>
              <FaCity className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              City <span style={{ color: '#ff4d4d' }} className="ml-1">*</span>
            </label>
            <select
              id="city"
              className="input-field w-full p-2 rounded"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                color: theme.text,
                boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
              }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!stateCode}
              required
            >
              <option value="">Select City</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="zipCode" className="flex items-center mb-1" style={{ color: theme.text }}>
              <FaMailBulk className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              Postal Code <span style={{ color: '#ff4d4d' }} className="ml-1">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              className="input-field w-full p-2 rounded"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                color: theme.text,
                boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
              }}
              placeholder="Enter postal code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="flex items-center mb-1" style={{ color: theme.text }}>
              <FaPhone className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="input-field w-full p-2 rounded"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
                color: theme.text,
                boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
              }}
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="shipping-options mt-6 mb-4">
          <h3 className="text-lg font-semibold mb-3" style={{ color: theme.text }}>Shipping Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="shipping-option p-3 rounded flex items-start cursor-pointer" style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
            }}>
              <input
                type="radio"
                name="shipping-option"
                defaultChecked
                className="mt-1 mr-3"
                style={{ accentColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
              />
              <div>
                <div className="font-medium" style={{ color: theme.text }}>Standard Shipping</div>
                <div className="text-sm" style={{ color: theme.textLight }}>3-5 business days</div>
                <div className="text-sm font-medium mt-1" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}>FREE</div>
              </div>
            </label>
            <label className="shipping-option p-3 rounded flex items-start cursor-pointer" style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
            }}>
              <input
                type="radio"
                name="shipping-option"
                className="mt-1 mr-3"
                style={{ accentColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}
              />
              <div>
                <div className="font-medium" style={{ color: theme.text }}>Express Shipping</div>
                <div className="text-sm" style={{ color: theme.textLight }}>1-2 business days</div>
                <div className="text-sm font-medium mt-1" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }}>$9.99</div>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded font-semibold mt-4 transition-all"
          style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5',
            color: '#ffffff',
            border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.3)' : 'none',
            boxShadow: currentTheme === 'dark' ? '0 0 15px rgba(0, 242, 255, 0.3)' : 'none'
          }}
        >
          Continue to Payment
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingPage;
