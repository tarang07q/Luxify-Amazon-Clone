import React, { useState, useEffect } from 'react';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';

const GlobalErrorDisplay = () => {
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false);

  // Listen for unhandled errors and API errors
  useEffect(() => {
    const handleError = (event) => {
      // Prevent default browser error handling
      event.preventDefault();
      
      // Add error to our list
      setErrors(prev => [...prev, {
        id: Date.now(),
        message: event.error?.message || event.message || 'An unknown error occurred',
        timestamp: new Date()
      }]);
      
      setVisible(true);
    };

    // Listen for unhandled errors
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  // Clear all errors
  const clearAllErrors = () => {
    setErrors([]);
    setVisible(false);
  };

  // Remove a specific error
  const removeError = (id) => {
    setErrors(prev => prev.filter(error => error.id !== id));
    if (errors.length <= 1) {
      setVisible(false);
    }
  };

  if (!visible || errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 left-0 z-50 p-4 bg-red-50 border-b border-red-200 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-red-700 font-semibold flex items-center">
            <FaExclamationCircle className="mr-2" /> 
            {errors.length > 1 ? `${errors.length} Errors Detected` : 'Error Detected'}
          </h3>
          <div>
            {errors.length > 1 && (
              <button 
                onClick={clearAllErrors}
                className="text-sm text-gray-600 hover:text-gray-800 mr-4"
              >
                Clear All
              </button>
            )}
            <button 
              onClick={() => setVisible(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          {errors.map(error => (
            <div 
              key={error.id} 
              className="bg-white p-3 rounded border border-red-200 mb-2 flex justify-between items-start"
            >
              <div>
                <p className="text-red-600 font-medium">{error.message}</p>
                <p className="text-xs text-gray-500">
                  {error.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button 
                onClick={() => removeError(error.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 mt-2">
          Please try refreshing the page or contact support if the problem persists.
        </p>
      </div>
    </div>
  );
};

export default GlobalErrorDisplay;
