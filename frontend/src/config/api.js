/**
 * API configuration
 */

// Base API URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    ADMIN_REGISTER: '/auth/admin-register',
  },
  
  // Product endpoints
  PRODUCTS: {
    BASE: '/products',
    DETAILS: (id) => `/products/${id}`,
    REVIEWS: (id) => `/products/${id}/reviews`,
    CATEGORIES: '/products/categories',
    FEATURED: '/products/featured',
  },
  
  // Cart endpoints
  CART: {
    BASE: '/cart',
    ADD: '/cart/add',
    REMOVE: (id) => `/cart/remove/${id}`,
    UPDATE: '/cart/update',
  },
  
  // Order endpoints
  ORDERS: {
    BASE: '/orders',
    DETAILS: (id) => `/orders/${id}`,
    MY_ORDERS: '/orders/myorders',
    ALL_ORDERS: '/orders/all',
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
  },
  
  // Admin endpoints
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
  },
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
