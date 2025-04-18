import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const ApiConnectionTest = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('loading');
    setMessage('');
    
    try {
      // Test the API connection
      const response = await axios.get('/api');
      
      console.log('API test response:', response);
      setStatus('success');
      setMessage('API connection successful!');
    } catch (error) {
      console.error('API connection error:', error);
      setStatus('error');
      setMessage(`API connection failed: ${error.message}`);
      
      // Try a direct connection as fallback
      try {
        const directResponse = await axios.get('http://localhost:5000/api/auth/me', { 
          validateStatus: () => true 
        });
        setMessage(`${message} (Direct connection status: ${directResponse.status})`);
      } catch (directError) {
        setMessage(`${message} (Direct connection also failed: ${directError.message})`);
      }
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-2">API Connection Test</h3>
      
      <div className="mb-4">
        <button
          onClick={testConnection}
          disabled={status === 'loading'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {status === 'loading' ? (
            <span className="flex items-center">
              <FaSpinner className="animate-spin mr-2" /> Testing...
            </span>
          ) : 'Test API Connection'}
        </button>
      </div>
      
      {status === 'success' && (
        <div className="flex items-center text-green-600">
          <FaCheckCircle className="mr-2" />
          <p>{message}</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-start text-red-600">
          <FaExclamationTriangle className="mr-2 mt-1" />
          <p>{message}</p>
        </div>
      )}
      
      <p className="text-xs text-gray-500 mt-2">
        This test helps diagnose API connection issues. If the test fails, please check that the backend server is running.
      </p>
    </div>
  );
};

export default ApiConnectionTest;
