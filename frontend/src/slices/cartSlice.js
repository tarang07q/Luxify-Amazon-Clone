import { createSlice } from '@reduxjs/toolkit';

// Helper function to get user-specific localStorage key
const getUserKey = (key) => {
  const userInfo = localStorage.getItem('user');
  if (userInfo) {
    const user = JSON.parse(userInfo);
    return `${key}_${user.id}`;
  }
  return key; // fallback to global key if no user
};

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: 'Cash on Delivery',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Update user-specific localStorage
      localStorage.setItem(getUserKey('cartItems'), JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem(getUserKey('cartItems'), JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        getUserKey('shippingAddress'),
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem(getUserKey('paymentMethod'), state.paymentMethod);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem(getUserKey('cartItems'));
    },
    loadUserCart: (state) => {
      // Load user-specific cart data
      const cartItems = localStorage.getItem(getUserKey('cartItems'));
      const shippingAddress = localStorage.getItem(getUserKey('shippingAddress'));
      const paymentMethod = localStorage.getItem(getUserKey('paymentMethod'));

      state.cartItems = cartItems ? JSON.parse(cartItems) : [];
      state.shippingAddress = shippingAddress ? JSON.parse(shippingAddress) : {};
      state.paymentMethod = paymentMethod || 'Cash on Delivery';
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  loadUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;
