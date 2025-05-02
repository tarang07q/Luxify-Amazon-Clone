import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials, logout } from '../slices/authSlice';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '../slices/services/authService';
import { STORAGE_KEYS } from '../constants/app.constants';

/**
 * Custom hook for authentication functionality
 * @returns {Object} Authentication methods and state
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get auth state from Redux store
  const { user, token } = useSelector((state) => state.auth);
  
  // Auth mutations from RTK Query
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  
  /**
   * Login user
   * @param {Object} credentials - User credentials (email, password)
   * @returns {Promise} Login result
   */
  const login = async (credentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      dispatch(setCredentials(result));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, result.token);
      toast.success('Login successful');
      return result;
    } catch (error) {
      const message = error?.data?.message || error.error || 'Login failed';
      toast.error(message);
      throw error;
    }
  };
  
  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Registration result
   */
  const register = async (userData) => {
    try {
      const result = await registerMutation(userData).unwrap();
      dispatch(setCredentials(result));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, result.token);
      toast.success('Registration successful');
      return result;
    } catch (error) {
      const message = error?.data?.message || error.error || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };
  
  /**
   * Logout user
   */
  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      toast.success('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      dispatch(logout());
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  };
  
  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };
  
  /**
   * Check if user is an admin
   * @returns {boolean} Admin status
   */
  const isAdmin = () => {
    return isAuthenticated() && user.role === 'admin';
  };
  
  return {
    user,
    token,
    login,
    register,
    logout: handleLogout,
    isAuthenticated,
    isAdmin,
  };
};

export default useAuth;
