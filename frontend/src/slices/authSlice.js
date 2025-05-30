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
  user: localStorage.getItem('user')
    ? safeJSONParse(localStorage.getItem('user'))
    : null,
  token: localStorage.getItem('token') || null,
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
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      // Clear Redux state
      state.user = null;
      state.token = null;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('lastRegisteredAdmin');

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
