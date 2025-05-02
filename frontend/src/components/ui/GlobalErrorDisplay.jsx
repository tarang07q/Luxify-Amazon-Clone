import React, { useState, useEffect, useRef } from 'react';
import { FaExclamationCircle, FaTimes, FaServer, FaExclamationTriangle } from 'react-icons/fa';
import { addApiErrorListener } from '../../utils/apiErrorHandler';

const GlobalErrorDisplay = () => {
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false);
  const errorIdCounter = useRef(0);
  const maxErrors = 10; // Maximum number of errors to display

  // Generate a unique ID for each error
  const generateUniqueId = () => {
    errorIdCounter.current += 1;
    return `error-${Date.now()}-${errorIdCounter.current}`;
  };

  // Filter WebGL errors
  const shouldFilterError = (message) => {
    if (!message) return false;

    // Filter out WebGL and shader errors
    return (
      message.includes('WebGL') ||
      message.includes('shader') ||
      message.includes('INVALID_OPERATION') ||
      message.includes('THREE.WebGLProgram')
    );
  };

  // Listen for unhandled errors
  useEffect(() => {
    const handleError = (event) => {
      // Prevent default browser error handling
      event.preventDefault();

      // Get error message
      const errorMessage = event.error?.message || event.message || 'An unknown error occurred';

      // Filter out WebGL errors
      if (shouldFilterError(errorMessage)) {
        return;
      }

      // Check if this error is already in our list to avoid duplicates
      setErrors(prev => {
        // Don't add duplicate error messages that occurred within 1 second
        const isDuplicate = prev.some(e =>
          e.message === errorMessage &&
          (Date.now() - e.timestamp.getTime()) < 1000
        );

        if (isDuplicate) return prev;

        // Limit the number of errors
        const newErrors = [...prev, {
          id: generateUniqueId(),
          message: errorMessage,
          timestamp: new Date(),
          type: 'general'
        }];

        // Keep only the most recent errors
        return newErrors.slice(-maxErrors);
      });

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

  // Listen for API errors
  useEffect(() => {
    // Add API error listener
    const removeListener = addApiErrorListener((errorDetail) => {
      // Skip connection refused errors for backend API
      if (errorDetail.status === 'ECONNREFUSED' &&
          errorDetail.endpoint &&
          (errorDetail.endpoint.includes('/api/auth/me') ||
           errorDetail.endpoint.includes('/api/orders/my-orders'))) {
        // These are expected when the backend is not running
        return;
      }

      // Add API error to our list
      setErrors(prev => {
        // Don't add duplicate API errors for the same endpoint within 1 second
        const isDuplicate = prev.some(e =>
          e.type === 'api' &&
          e.endpoint === errorDetail.endpoint &&
          (Date.now() - e.timestamp.getTime()) < 1000
        );

        if (isDuplicate) return prev;

        // Add error with unique ID
        const newErrors = [...prev, {
          id: generateUniqueId(),
          message: errorDetail.message,
          timestamp: errorDetail.timestamp || new Date(),
          type: 'api',
          endpoint: errorDetail.endpoint,
          status: errorDetail.status
        }];

        // Keep only the most recent errors
        return newErrors.slice(-maxErrors);
      });

      setVisible(true);
    });

    return removeListener;
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
              className={`bg-white p-3 rounded border ${
                error.type === 'api'
                  ? 'border-orange-200'
                  : 'border-red-200'
              } mb-2 flex justify-between items-start`}
            >
              <div>
                <p className={`${
                  error.type === 'api'
                    ? 'text-orange-600'
                    : 'text-red-600'
                } font-medium flex items-center`}>
                  {error.type === 'api'
                    ? <FaServer className="mr-2" />
                    : <FaExclamationCircle className="mr-2" />
                  }
                  {error.message}
                </p>
                {error.type === 'api' && error.endpoint && (
                  <p className="text-xs text-gray-600 mt-1">
                    Endpoint: {error.endpoint}
                    {error.status && ` (${error.status})`}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
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

        {errors.length > 0 && (
          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200 text-sm text-blue-700 flex items-start">
            <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Note:</p>
              <p>
                The backend server is not running, so the application is using mock data.
                Some features may be limited. API errors are expected in this mode.
              </p>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600 mt-2">
          Please try refreshing the page or contact support if the problem persists.
        </p>
      </div>
    </div>
  );
};

export default GlobalErrorDisplay;
