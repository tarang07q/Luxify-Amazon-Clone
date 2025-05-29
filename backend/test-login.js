const fetch = require('node-fetch');

const testLogin = async () => {
  try {
    console.log('Testing user login...');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'user@luxify.com',
        password: 'user123'
      })
    });

    const data = await response.json();
    console.log('User login response:', data);

    console.log('\nTesting admin login...');
    
    const adminResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@luxify.com',
        password: 'admin123'
      })
    });

    const adminData = await adminResponse.json();
    console.log('Admin login response:', adminData);

  } catch (error) {
    console.error('Test error:', error);
  }
};

testLogin();
