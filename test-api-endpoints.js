const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test all API endpoints
const testEndpoints = async () => {
  console.log('🧪 Testing API Endpoints...\n');

  // Test 1: Health Check
  try {
    const response = await axios.get('http://localhost:5000/health');
    console.log('✅ Health Check:', response.data);
  } catch (error) {
    console.log('❌ Health Check failed:', error.message);
  }

  // Test 2: Products endpoint
  try {
    const response = await axios.get(`${API_BASE}/products`);
    console.log('✅ Products endpoint:', response.data.success ? 'Working' : 'Failed');
  } catch (error) {
    console.log('❌ Products endpoint failed:', error.response?.data || error.message);
  }

  // Test 3: Auth endpoints
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    console.log('✅ Auth register:', response.data.success ? 'Working' : 'Failed');
    
    // Test login with the same user
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    console.log('✅ Auth login:', loginResponse.data.success ? 'Working' : 'Failed');
  } catch (error) {
    console.log('❌ Auth endpoints failed:', error.response?.data || error.message);
  }

  // Test 4: Analytics endpoint (requires admin)
  try {
    // First register an admin
    const adminResponse = await axios.post(`${API_BASE}/auth/register-admin`, {
      name: 'Test Admin',
      email: `admin${Date.now()}@example.com`,
      password: 'admin123'
    });
    
    if (adminResponse.data.token) {
      const analyticsResponse = await axios.get(`${API_BASE}/analytics/dashboard`, {
        headers: {
          'Authorization': `Bearer ${adminResponse.data.token}`
        }
      });
      console.log('✅ Analytics endpoint:', analyticsResponse.data ? 'Working' : 'Failed');
    }
  } catch (error) {
    console.log('❌ Analytics endpoint failed:', error.response?.data || error.message);
  }

  // Test 5: Orders endpoint
  try {
    const response = await axios.get(`${API_BASE}/orders`);
    console.log('✅ Orders endpoint accessible');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Orders endpoint protected (requires auth)');
    } else {
      console.log('❌ Orders endpoint failed:', error.response?.data || error.message);
    }
  }

  // Test 6: Upload endpoint
  try {
    const response = await axios.get(`${API_BASE}/upload`);
    console.log('✅ Upload endpoint accessible');
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 405) {
      console.log('✅ Upload endpoint exists (method not allowed for GET)');
    } else {
      console.log('❌ Upload endpoint failed:', error.response?.data || error.message);
    }
  }

  // Test 7: Reviews endpoint
  try {
    const response = await axios.get(`${API_BASE}/reviews`);
    console.log('✅ Reviews endpoint accessible');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Reviews endpoint protected (requires auth)');
    } else {
      console.log('❌ Reviews endpoint failed:', error.response?.data || error.message);
    }
  }

  // Test 8: Settings endpoint
  try {
    const response = await axios.get(`${API_BASE}/settings`);
    console.log('✅ Settings endpoint accessible');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Settings endpoint protected (requires auth)');
    } else {
      console.log('❌ Settings endpoint failed:', error.response?.data || error.message);
    }
  }

  // Test 9: Payments endpoint
  try {
    const response = await axios.get(`${API_BASE}/payments`);
    console.log('✅ Payments endpoint accessible');
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 405) {
      console.log('✅ Payments endpoint exists');
    } else {
      console.log('❌ Payments endpoint failed:', error.response?.data || error.message);
    }
  }

  // Test 10: Wishlist endpoint
  try {
    const response = await axios.get(`${API_BASE}/wishlist`);
    console.log('✅ Wishlist endpoint accessible');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Wishlist endpoint protected (requires auth)');
    } else {
      console.log('❌ Wishlist endpoint failed:', error.response?.data || error.message);
    }
  }

  console.log('\n🏁 API Endpoint Testing Complete!');
};

// Run the tests
testEndpoints().catch(console.error);
