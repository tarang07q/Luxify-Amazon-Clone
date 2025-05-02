/**
 * Mock API service for when the backend is not available
 * This provides fake data to allow the frontend to function without a backend
 */

import { dispatchApiError } from '../utils/apiErrorHandler';

// Mock user data
const MOCK_USER = {
  _id: 'mock-user-id',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'user',
  createdAt: new Date().toISOString()
};

// Mock admin data
const MOCK_ADMIN = {
  _id: 'mock-admin-id',
  name: 'Demo Admin',
  email: 'admin@example.com',
  role: 'admin',
  createdAt: new Date().toISOString()
};

// Mock products data
const MOCK_PRODUCTS = Array(20).fill().map((_, index) => ({
  _id: `mock-product-${index}`,
  title: `Product ${index + 1}`,
  description: `This is a mock product description for product ${index + 1}`,
  price: Math.floor(Math.random() * 100) + 10,
  category: ['Electronics', 'Clothing', 'Books', 'Home', 'Toys'][Math.floor(Math.random() * 5)],
  brand: ['Brand A', 'Brand B', 'Brand C', 'Brand D'][Math.floor(Math.random() * 4)],
  stock: Math.floor(Math.random() * 100),
  rating: (Math.random() * 5).toFixed(1),
  numReviews: Math.floor(Math.random() * 100),
  images: [
    `https://picsum.photos/seed/product${index}a/300/300`,
    `https://picsum.photos/seed/product${index}b/300/300`
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

// Mock orders data
const MOCK_ORDERS = Array(5).fill().map((_, index) => {
  const orderItems = Array(Math.floor(Math.random() * 3) + 1).fill().map((_, itemIndex) => {
    const product = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    return {
      _id: `mock-order-item-${index}-${itemIndex}`,
      name: product.title,
      qty: Math.floor(Math.random() * 3) + 1,
      image: product.images[0],
      price: product.price,
      product: product._id
    };
  });

  const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

  return {
    _id: `mock-order-${index}`,
    user: MOCK_USER._id,
    orderItems,
    shippingAddress: {
      address: '123 Test St',
      city: 'Test City',
      postalCode: '12345',
      country: 'Test Country'
    },
    paymentMethod: 'PayPal',
    paymentResult: {
      id: `mock-payment-${index}`,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      email_address: MOCK_USER.email
    },
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: true,
    paidAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    isDelivered: Math.random() > 0.5,
    deliveredAt: Math.random() > 0.5 ? new Date().toISOString() : null,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  };
});

// Mock cart data
const MOCK_CART = {
  cartItems: MOCK_PRODUCTS.slice(0, 3).map(product => ({
    product: product._id,
    name: product.title,
    image: product.images[0],
    price: product.price,
    countInStock: product.stock,
    qty: 1
  })),
  shippingAddress: {
    address: '123 Test St',
    city: 'Test City',
    postalCode: '12345',
    country: 'Test Country'
  },
  paymentMethod: 'PayPal'
};

/**
 * Simulate API delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Promise that resolves after the delay
 */
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API service
 */
const mockApiService = {
  /**
   * Check if the backend is available
   * @returns {Promise<boolean>} - Whether the backend is available
   */
  isBackendAvailable: async () => {
    try {
      const response = await fetch('/api/health', { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(2000) // 2 second timeout
      });
      return response.ok;
    } catch (error) {
      console.log('Backend not available, using mock API');
      return false;
    }
  },

  /**
   * Get current user
   * @returns {Promise<Object>} - User data
   */
  getCurrentUser: async () => {
    await delay();
    // 50% chance to return admin for testing
    return Math.random() > 0.5 ? MOCK_USER : MOCK_ADMIN;
  },

  /**
   * Get user orders
   * @returns {Promise<Array>} - User orders
   */
  getUserOrders: async () => {
    await delay();
    return MOCK_ORDERS;
  },

  /**
   * Get products
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Products data with pagination
   */
  getProducts: async (params = {}) => {
    await delay();
    const { keyword = '', pageNumber = 1, pageSize = 10, category = '' } = params;
    
    let filteredProducts = [...MOCK_PRODUCTS];
    
    // Filter by keyword
    if (keyword) {
      const keywordLower = keyword.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(keywordLower) || 
        product.description.toLowerCase().includes(keywordLower)
      );
    }
    
    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Paginate
    const page = Number(pageNumber);
    const size = Number(pageSize);
    const start = (page - 1) * size;
    const end = start + size;
    const paginatedProducts = filteredProducts.slice(start, end);
    
    return {
      products: paginatedProducts,
      page,
      pages: Math.ceil(filteredProducts.length / size),
      total: filteredProducts.length
    };
  },

  /**
   * Get product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} - Product data
   */
  getProductById: async (id) => {
    await delay();
    const product = MOCK_PRODUCTS.find(p => p._id === id);
    
    if (!product) {
      throw dispatchApiError(
        'Product not found',
        `GET /api/products/${id}`,
        404
      );
    }
    
    return product;
  },

  /**
   * Get cart
   * @returns {Promise<Object>} - Cart data
   */
  getCart: async () => {
    await delay();
    return MOCK_CART;
  },

  /**
   * Add to cart
   * @param {string} productId - Product ID
   * @param {number} qty - Quantity
   * @returns {Promise<Object>} - Updated cart
   */
  addToCart: async (productId, qty) => {
    await delay();
    const product = MOCK_PRODUCTS.find(p => p._id === productId);
    
    if (!product) {
      throw dispatchApiError(
        'Product not found',
        `POST /api/cart`,
        404
      );
    }
    
    // Check if product is already in cart
    const existingItem = MOCK_CART.cartItems.find(item => item.product === productId);
    
    if (existingItem) {
      // Update quantity
      existingItem.qty = qty;
    } else {
      // Add new item
      MOCK_CART.cartItems.push({
        product: product._id,
        name: product.title,
        image: product.images[0],
        price: product.price,
        countInStock: product.stock,
        qty
      });
    }
    
    return MOCK_CART;
  },

  /**
   * Remove from cart
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} - Updated cart
   */
  removeFromCart: async (productId) => {
    await delay();
    MOCK_CART.cartItems = MOCK_CART.cartItems.filter(item => item.product !== productId);
    return MOCK_CART;
  },

  /**
   * Create order
   * @param {Object} orderData - Order data
   * @returns {Promise<Object>} - Created order
   */
  createOrder: async (orderData) => {
    await delay();
    const newOrder = {
      _id: `mock-order-${Date.now()}`,
      user: MOCK_USER._id,
      orderItems: MOCK_CART.cartItems,
      shippingAddress: orderData.shippingAddress || MOCK_CART.shippingAddress,
      paymentMethod: orderData.paymentMethod || MOCK_CART.paymentMethod,
      itemsPrice: MOCK_CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      taxPrice: Number((0.15 * MOCK_CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)),
      shippingPrice: MOCK_CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 100 ? 0 : 10,
      totalPrice: Number((
        MOCK_CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) +
        Number((0.15 * MOCK_CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)) +
        (MOCK_CART.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) > 100 ? 0 : 10)
      ).toFixed(2)),
      isPaid: false,
      isDelivered: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to mock orders
    MOCK_ORDERS.push(newOrder);
    
    // Clear cart
    MOCK_CART.cartItems = [];
    
    return newOrder;
  }
};

export default mockApiService;
