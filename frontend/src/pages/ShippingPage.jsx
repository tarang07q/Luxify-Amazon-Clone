import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/ui/FormContainer';
import { FaShippingFast, FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaHome, FaMailBulk, FaPhone, FaUser, FaPlus, FaCheck } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { user } = useSelector((state) => state.auth);
  const { theme, currentTheme } = useTheme();

  const [name, setName] = useState(shippingAddress?.name || '');
  const [street, setStreet] = useState(shippingAddress?.street || shippingAddress?.address || '');
  const [state, setState] = useState(shippingAddress?.state || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || shippingAddress?.postalCode || '');
  const [phone, setPhone] = useState(shippingAddress?.phone || '');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Indian states and cities data
  const indianStatesAndCities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kadapa'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tezpur', 'Bomdila'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Rajnandgaon'],
    'Delhi': ['New Delhi', 'Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar'],
    'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Hamirpur'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davangere'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur'],
    'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongpoh'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar'],
    'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Mahbubnagar'],
    'Tripura': ['Agartala', 'Dharmanagar', 'Udaipur', 'Kailashahar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Bardhaman']
  };

  // Set states on component mount
  useEffect(() => {
    setAvailableStates(Object.keys(indianStatesAndCities));
  }, []);

  // Set cities when state changes
  useEffect(() => {
    if (state && indianStatesAndCities[state]) {
      setAvailableCities(indianStatesAndCities[state]);
    } else {
      setAvailableCities([]);
    }
  }, [state]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load saved addresses on component mount
  useEffect(() => {
    if (user) {
      const userAddressKey = `savedAddresses_${user.id}`;
      const saved = localStorage.getItem(userAddressKey);
      if (saved) {
        try {
          const addresses = JSON.parse(saved);
          setSavedAddresses(addresses);
          setShowSavedAddresses(addresses.length > 0);
        } catch (error) {
          console.error('Error parsing saved addresses:', error);
        }
      }
    }
  }, [user]);

  const selectSavedAddress = (address, index) => {
    setName(address.name || '');
    setStreet(address.address || address.street || '');
    setState(address.state || '');
    setCity(address.city || '');
    setZipCode(address.postalCode || address.zipCode || '');
    setPhone(address.phone || '');
    setSelectedAddressIndex(index);
  };

  const saveCurrentAddress = () => {
    if (!user || !name || !street || !state || !city || !zipCode) {
      alert('Please fill in all required fields before saving');
      return;
    }

    const newAddress = {
      name,
      address: street,
      city,
      state,
      postalCode: zipCode,
      country: 'India',
      phone,
      label: `${name} - ${city}, ${state}`,
      createdAt: new Date().toISOString()
    };

    const userAddressKey = `savedAddresses_${user.id}`;
    const existingAddresses = savedAddresses || [];

    // Check if address already exists
    const addressExists = existingAddresses.some(addr =>
      addr.address === street && addr.city === city && addr.postalCode === zipCode
    );

    if (!addressExists) {
      const updatedAddresses = [...existingAddresses, newAddress];
      setSavedAddresses(updatedAddresses);
      localStorage.setItem(userAddressKey, JSON.stringify(updatedAddresses));
      alert('Address saved successfully!');
    } else {
      alert('This address is already saved');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('🚀 Form submitted with data:', { name, street, state, city, zipCode, phone });
    console.log('🔍 Available states:', availableStates.length);
    console.log('🔍 Available cities:', availableCities.length);

    // More detailed validation with specific field checks
    const missingFields = [];
    if (!name?.trim()) missingFields.push('Name');
    if (!street?.trim()) missingFields.push('Street Address');
    if (!state?.trim()) missingFields.push('State');
    if (!city?.trim()) missingFields.push('City');
    if (!zipCode?.trim()) missingFields.push('Postal Code');

    if (missingFields.length > 0) {
      console.error('❌ Validation failed. Missing fields:', missingFields);
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    console.log('✅ Validation passed, saving shipping address...');

    const shippingData = {
      name: name.trim(),
      address: street.trim(), // Map street to address for backend compatibility
      street: street.trim(), // Keep both for compatibility
      city: city.trim(),
      state: state.trim(),
      postalCode: zipCode.trim(), // Map zipCode to postalCode for backend compatibility
      zipCode: zipCode.trim(), // Keep both for compatibility
      country: 'India',
      phone: phone?.trim() || ''
    };

    console.log('📦 Shipping data to save:', shippingData);

    try {
      dispatch(saveShippingAddress(shippingData));
      console.log('✅ Shipping address saved to Redux');

      console.log('🔄 Navigating to payment page...');
      navigate('/payment');
    } catch (error) {
      console.error('❌ Error saving shipping address:', error);
      alert('Error saving shipping address. Please try again.');
    }
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

      {/* Saved Addresses Section */}
      {showSavedAddresses && savedAddresses.length > 0 && (
        <div className="mb-6 p-4 rounded-lg" style={{
          backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
          border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
          boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
        }}>
          <h3 className="text-lg font-semibold mb-3 flex items-center" style={{ color: theme.text }}>
            <FaMapMarkerAlt className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
            Saved Addresses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedAddresses.map((address, index) => (
              <div
                key={index}
                className={`p-3 rounded cursor-pointer transition-all ${
                  selectedAddressIndex === index ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: selectedAddressIndex === index
                    ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)')
                    : (currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.1)' : 'rgba(243, 244, 246, 0.8)'),
                  border: `1px solid ${selectedAddressIndex === index
                    ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.3)' : 'rgba(80, 70, 229, 0.3)')
                    : theme.border}`,
                  ringColor: currentTheme === 'dark' ? '#00f2ff' : '#5046e5'
                }}
                onClick={() => selectSavedAddress(address, index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm" style={{ color: theme.text }}>
                      {address.name}
                    </div>
                    <div className="text-xs mt-1" style={{ color: theme.textLight }}>
                      {address.address}
                    </div>
                    <div className="text-xs" style={{ color: theme.textLight }}>
                      {address.city}, {address.state} - {address.postalCode}
                    </div>
                    {address.phone && (
                      <div className="text-xs" style={{ color: theme.textLight }}>
                        📞 {address.phone}
                      </div>
                    )}
                  </div>
                  {selectedAddressIndex === index && (
                    <FaCheck className="text-sm" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => setShowSavedAddresses(false)}
              className="text-sm px-4 py-2 rounded transition-all"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(243, 244, 246, 0.8)',
                color: theme.textLight,
                border: `1px solid ${theme.border}`
              }}
            >
              Use New Address
            </button>
          </div>
        </div>
      )}

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
            Country
          </label>
          <input
            type="text"
            id="country"
            className="input-field w-full p-2 rounded"
            style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : '#f9fafb',
              border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
              color: theme.text,
              boxShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.1)' : 'none'
            }}
            value="India"
            readOnly
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="state" className="flex items-center mb-1" style={{ color: theme.text }}>
              <FaMapMarkerAlt className="mr-2" style={{ color: currentTheme === 'dark' ? '#00f2ff' : '#5046e5' }} />
              State <span style={{ color: '#ff4d4d' }} className="ml-1">*</span>
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
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity(''); // Reset city when state changes
              }}
              disabled={loading}
              required
            >
              <option value="">Select State</option>
              {availableStates.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
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
              disabled={!state || loading}
              required
            >
              <option value="">Select City</option>
              {availableCities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
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

        {/* Save Address Button */}
        {user && (
          <div className="mb-4">
            <button
              type="button"
              onClick={saveCurrentAddress}
              className="w-full py-2 rounded font-medium transition-all flex items-center justify-center"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#10b981',
                color: '#ffffff',
                border: currentTheme === 'dark' ? '1px solid rgba(34, 197, 94, 0.3)' : 'none',
                boxShadow: currentTheme === 'dark' ? '0 0 10px rgba(34, 197, 94, 0.2)' : 'none'
              }}
            >
              <FaPlus className="mr-2" />
              Save This Address
            </button>
          </div>
        )}

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
