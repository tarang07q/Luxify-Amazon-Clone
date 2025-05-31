import { createSlice } from '@reduxjs/toolkit';

// Helper function to safely parse JSON
const safeJSONParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON from localStorage:', e);
    return null;
  }
};

const initialState = {
  user: localStorage.getItem('luxify_user')
    ? safeJSONParse(localStorage.getItem('luxify_user'))
    : null,
  token: localStorage.getItem('luxify_auth_token') || null,
};

// Log initial state for debugging
console.log('Auth initial state:', initialState);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      console.log('Setting credentials:', { user, token });
      state.user = user;
      state.token = token;
      localStorage.setItem('luxify_user', JSON.stringify(user));
      localStorage.setItem('luxify_auth_token', token);
    },
    logout: (state) => {
      // Clear Redux state
      state.user = null;
      state.token = null;

      // Clear localStorage
      localStorage.removeItem('luxify_user');
      localStorage.removeItem('luxify_auth_token');
      localStorage.removeItem('lastRegisteredAdmin');

      // Clear user-specific cart data
      const userInfo = localStorage.getItem('luxify_user');
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          localStorage.removeItem(`cartItems_${user.id}`);
          localStorage.removeItem(`shippingAddress_${user.id}`);
          localStorage.removeItem(`paymentMethod_${user.id}`);
          localStorage.removeItem(`savedAddresses_${user.id}`);
        } catch (e) {
          console.error('Error clearing user-specific data:', e);
        }
      }

      // Clear all cookies
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

      // Clear session storage
      sessionStorage.clear();

      // Force reload to clear any cached state
      window.location.href = '/';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
