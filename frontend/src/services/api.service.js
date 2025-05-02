import axios from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from '../config/api';
import { STORAGE_KEYS } from '../constants/app.constants';
import { dispatchApiError } from '../utils/apiErrorHandler';
import mockApiService from './mockApi.service';

/**
 * Create axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

/**
 * Add request interceptor to include auth token
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Add response interceptor to handle common errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Get error details
    const status = error.response?.status;
    const url = error.config?.url || 'unknown-endpoint';
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const endpoint = `${method} ${url}`;

    // Create a user-friendly error message
    let errorMessage = 'An error occurred while communicating with the server';

    // Add more specific error messages based on status code
    if (status) {
      switch (status) {
        case 400:
          errorMessage = error.response?.data?.message || 'Bad request: The server could not understand the request';
          break;
        case 401:
          errorMessage = 'Authentication required: Please log in again';
          break;
        case 403:
          errorMessage = 'Access denied: You do not have permission to access this resource';
          break;
        case 404:
          errorMessage = 'Resource not found: The requested item does not exist';
          break;
        case 500:
          errorMessage = 'Server error: Something went wrong on the server';
          break;
        default:
          errorMessage = `Error ${status}: ${error.response?.data?.message || 'An unexpected error occurred'}`;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout: The server took too long to respond';
    } else if (error.message && error.message.includes('Network Error')) {
      errorMessage = 'Network error: Please check your internet connection';
    }

    // Handle 401 Unauthorized errors (token expired, etc.)
    if (status === 401) {
      // Clear local storage
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      // Redirect to login page if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Dispatch API error event
    dispatchApiError(
      errorMessage,
      endpoint,
      status,
      error.response?.data
    );

    return Promise.reject(error);
  }
);

/**
 * API service with methods for common HTTP requests
 */
const apiService = {
  /**
   * Flag to track if we're using mock API
   */
  _useMockApi: false,

  /**
   * Check if we should use mock API
   * @returns {Promise<boolean>} - Whether to use mock API
   */
  shouldUseMockApi: async function() {
    // If we've already determined we should use mock API, return true
    if (this._useMockApi) return true;

    // Check if backend is available
    const backendAvailable = await mockApiService.isBackendAvailable();
    this._useMockApi = !backendAvailable;

    // Log which API we're using
    console.log(`Using ${this._useMockApi ? 'mock' : 'real'} API`);

    return this._useMockApi;
  },
  /**
   * Make a GET request
   * @param {string} url - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} config - Additional axios config
   * @returns {Promise} API response
   */
  get: (url, params = {}, config = {}) => {
    return apiClient.get(url, { params, ...config });
  },

  /**
   * Make a POST request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} API response
   */
  post: (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config);
  },

  /**
   * Make a PUT request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} API response
   */
  put: (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config);
  },

  /**
   * Make a PATCH request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} API response
   */
  patch: (url, data = {}, config = {}) => {
    return apiClient.patch(url, data, config);
  },

  /**
   * Make a DELETE request
   * @param {string} url - API endpoint
   * @param {Object} config - Additional axios config
   * @returns {Promise} API response
   */
  delete: (url, config = {}) => {
    return apiClient.delete(url, config);
  },

  /**
   * Upload file(s)
   * @param {string} url - API endpoint
   * @param {FormData} formData - Form data with files
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} API response
   */
  upload: (url, formData, onProgress = () => {}) => {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      },
    });
  },

  /**
   * Get current user
   * @returns {Promise<Object>} - User data
   */
  getCurrentUser: async function() {
    // Check if we should use mock API
    if (await this.shouldUseMockApi()) {
      return mockApiService.getCurrentUser();
    }

    return this.get('/api/auth/me');
  },

  /**
   * Get user orders
   * @returns {Promise<Array>} - User orders
   */
  getUserOrders: async function() {
    // Check if we should use mock API
    if (await this.shouldUseMockApi()) {
      return mockApiService.getUserOrders();
    }

    return this.get('/api/orders/my-orders');
  },

  /**
   * Get products
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Products data with pagination
   */
  getProducts: async function(params = {}) {
    // Check if we should use mock API
    if (await this.shouldUseMockApi()) {
      return mockApiService.getProducts(params);
    }

    return this.get('/api/products', { params });
  },

  /**
   * Get product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} - Product data
   */
  getProductById: async function(id) {
    // Check if we should use mock API
    if (await this.shouldUseMockApi()) {
      return mockApiService.getProductById(id);
    }

    return this.get(`/api/products/${id}`);
  },

  /**
   * Get cart
   * @returns {Promise<Object>} - Cart data
   */
  getCart: async function() {
    // Check if we should use mock API
    if (await this.shouldUseMockApi()) {
      return mockApiService.getCart();
    }

    return this.get('/api/cart');
  },
};

export default apiService;
