/**
 * Utility functions for handling API errors
 */

/**
 * Custom error event for API errors
 * @param {string} message - Error message
 * @param {string} endpoint - API endpoint that failed
 * @param {number} status - HTTP status code
 * @param {Object} data - Response data if available
 */
export const dispatchApiError = (message, endpoint, status, data = null) => {
  // Create a custom error object
  const error = new Error(message);
  error.endpoint = endpoint;
  error.status = status;
  error.responseData = data;
  error.isApiError = true;
  
  // Dispatch a custom error event
  const errorEvent = new CustomEvent('api-error', {
    detail: {
      error,
      message,
      endpoint,
      status,
      data,
      timestamp: new Date()
    }
  });
  
  window.dispatchEvent(errorEvent);
  
  return error;
};

/**
 * Handle fetch response errors
 * @param {Response} response - Fetch API response
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Resolved with response if OK, rejected with error if not
 */
export const handleFetchErrors = async (response, endpoint) => {
  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    let errorData = null;
    
    try {
      // Try to parse error response as JSON
      errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // If we can't parse JSON, use status text
      console.warn('Could not parse error response as JSON', e);
    }
    
    // Dispatch the API error
    throw dispatchApiError(
      errorMessage,
      endpoint,
      response.status,
      errorData
    );
  }
  
  return response;
};

/**
 * Add API error listener
 * @param {Function} callback - Function to call when API error occurs
 * @returns {Function} - Function to remove the listener
 */
export const addApiErrorListener = (callback) => {
  const handler = (event) => {
    callback(event.detail);
  };
  
  window.addEventListener('api-error', handler);
  
  // Return a function to remove the listener
  return () => {
    window.removeEventListener('api-error', handler);
  };
};
