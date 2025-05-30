const fetch = require('node-fetch');

const testAuth = async () => {
  try {
    console.log('Testing backend health...');
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:5000/health');
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);

    console.log('\nTesting user registration...');
    
    // Test user registration
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'test123'
      })
    });

    const registerData = await registerResponse.json();
    console.log('User registration response:', registerData);

    console.log('\nTesting user login...');
    
    // Test user login
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'test123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('User login response:', loginData);

  } catch (error) {
    console.error('Test error:', error);
  }
};

testAuth();
