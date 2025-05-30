const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAuthentication() {
  console.log('🧪 Testing Luxify Authentication System\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: User Registration
    console.log('2️⃣ Testing User Registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@luxify.com',
      password: 'test123'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, registerData);
      console.log('✅ User Registration:', registerResponse.data);
      console.log('');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error.includes('already exists')) {
        console.log('ℹ️ User already exists, continuing with login test...');
      } else {
        throw error;
      }
    }

    // Test 3: User Login
    console.log('3️⃣ Testing User Login...');
    const loginData = {
      email: 'test@luxify.com',
      password: 'test123'
    };
    
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
    console.log('✅ User Login:', loginResponse.data);
    console.log('');

    // Test 4: Admin Registration
    console.log('4️⃣ Testing Admin Registration...');
    const adminData = {
      name: 'Admin User',
      email: 'admin@luxify.com',
      password: 'admin123',
      secretKey: 'admin-secret-123'
    };
    
    try {
      const adminResponse = await axios.post(`${BASE_URL}/api/auth/register-admin`, adminData);
      console.log('✅ Admin Registration:', adminResponse.data);
      console.log('');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error.includes('already exists')) {
        console.log('ℹ️ Admin already exists, continuing with login test...');
      } else {
        throw error;
      }
    }

    // Test 5: Admin Login
    console.log('5️⃣ Testing Admin Login...');
    const adminLoginData = {
      email: 'admin@luxify.com',
      password: 'admin123'
    };
    
    const adminLoginResponse = await axios.post(`${BASE_URL}/api/auth/login`, adminLoginData);
    console.log('✅ Admin Login:', adminLoginResponse.data);
    console.log('');

    // Test 6: Invalid Login
    console.log('6️⃣ Testing Invalid Login...');
    const invalidLoginData = {
      email: 'invalid@luxify.com',
      password: 'wrongpassword'
    };
    
    try {
      await axios.post(`${BASE_URL}/api/auth/login`, invalidLoginData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Invalid Login correctly rejected:', error.response.data);
      } else {
        throw error;
      }
    }
    console.log('');

    console.log('🎉 All authentication tests passed successfully!');
    console.log('🔐 Authentication system is working perfectly!');

  } catch (error) {
    console.error('❌ Test failed:', error.response ? error.response.data : error.message);
  }
}

testAuthentication();
