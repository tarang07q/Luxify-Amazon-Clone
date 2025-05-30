const axios = require('axios');

const testAnalytics = async () => {
  try {
    // First register an admin
    console.log('🔐 Registering admin...');
    const adminRegister = await axios.post('http://localhost:5000/api/auth/register-admin', {
      name: 'Analytics Admin',
      email: 'analytics@luxify.com',
      password: 'admin123'
    });
    
    console.log('✅ Admin registered:', adminRegister.data);
    
    // Get the token
    const token = adminRegister.data.token;
    
    // Test analytics endpoint
    console.log('📊 Fetching analytics...');
    const analyticsResponse = await axios.get('http://localhost:5000/api/admin/analytics', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Analytics data:');
    console.log(JSON.stringify(analyticsResponse.data, null, 2));
    
  } catch (error) {
    if (error.response) {
      console.error('❌ Error:', error.response.data);
    } else {
      console.error('❌ Error:', error.message);
    }
  }
};

testAnalytics();
