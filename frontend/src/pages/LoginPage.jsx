import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/services/authService';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/ui/FormContainer';
import Loader from '../components/ui/Loader';
import {
  FaSignInAlt,
  FaArrowRight,
  FaUserShield,
  FaUser,
  FaLock,
  FaEnvelope,
  FaExclamationTriangle,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import AdminRegistration from '../components/admin/AdminRegistration';
import { useTheme } from '../context/ThemeContext';
import ModernCube from '../components/3d/ModernCube';
import ProfileCard3D from '../components/3d/ProfileCard3D';
import DashboardPanel3D from '../components/3d/DashboardPanel3D';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAdminRegistration, setShowAdminRegistration] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { theme, currentTheme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  const adminParam = sp.get('admin');

  useEffect(() => {
    // Check if admin parameter is present in URL
    if (adminParam === 'true') {
      setIsAdminLogin(true);
    }

    // Redirect if user is already logged in
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user, adminParam]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      // Add isAdmin flag to login request
      const res = await login({ email, password, isAdmin: isAdminLogin }).unwrap();
      dispatch(setCredentials(res));

      // Show success message
      toast.success(isAdminLogin
        ? 'Admin login successful!'
        : 'Login successful! Welcome back.');

      // Navigate to appropriate page
      if (isAdminLogin && res.user && res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'Login failed. Please check your credentials.');
    }
  };

  const toggleAdminRegistration = () => {
    setShowAdminRegistration(!showAdminRegistration);
  };

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{
      backgroundColor: theme.background,
      color: theme.text
    }}>
      <div className="max-w-md w-full space-y-8">
        {!showAdminRegistration ? (
          <div className="bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden" style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
            boxShadow: theme.shadow,
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)'}`
          }}>
            <div className="px-6 py-8">
              <div className="text-center mb-8 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {isAdminLogin ? (
                    <DashboardPanel3D
                      size={80}
                      color={currentTheme === 'dark' ? '#ff00e4' : '#EC4899'}
                      floatingAnimation={true}
                      glowEffect={true}
                    />
                  ) : (
                    <ProfileCard3D
                      size={80}
                      color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
                      floatingAnimation={true}
                      glowEffect={true}
                    />
                  )}
                </div>
                <h1 className="text-3xl font-bold mt-10" style={{
                  color: isAdminLogin
                    ? (currentTheme === 'dark' ? '#ff00e4' : '#EC4899')
                    : (currentTheme === 'dark' ? '#00f2ff' : '#5046e5'),
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow: currentTheme === 'dark'
                    ? (isAdminLogin ? '0 0 8px rgba(255, 0, 228, 0.3)' : '0 0 8px rgba(0, 242, 255, 0.3)')
                    : 'none'
                }}>
                  {isAdminLogin ? 'Admin Login' : 'User Login'}
                </h1>
                <p style={{ color: theme.textLight }} className="mt-2">
                  {isAdminLogin
                    ? 'Access your admin dashboard and manage your store'
                    : 'Welcome back! Sign in to your account'}
                </p>
              </div>

              <div className="flex justify-center mb-6">
                <button
                  onClick={toggleAdminLogin}
                  className="flex items-center px-4 py-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: currentTheme === 'dark'
                      ? 'rgba(0, 242, 255, 0.1)'
                      : 'rgba(99, 102, 241, 0.1)',
                    color: theme.primary
                  }}
                >
                  {isAdminLogin ? <FaToggleOn size={20} className="mr-2" /> : <FaToggleOff size={20} className="mr-2" />}
                  {isAdminLogin ? 'Switch to User Login' : 'Switch to Admin Login'}
                </button>
              </div>

              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-1" style={{ color: theme.text }}>
                    <FaEnvelope className="inline mr-2" /> Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none transition-all duration-300"
                      style={{
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        borderColor: theme.inputBorder,
                        border: `1px solid ${theme.inputBorder}`
                      }}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block font-medium mb-1" style={{ color: theme.text }}>
                    <FaLock className="inline mr-2" /> Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none transition-all duration-300"
                      style={{
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        borderColor: theme.inputBorder,
                        border: `1px solid ${theme.inputBorder}`
                      }}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 font-semibold"
                  style={{
                    backgroundColor: isAdminLogin
                      ? (currentTheme === 'dark' ? 'rgba(255, 0, 228, 0.2)' : '#EC4899')
                      : (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : '#5046e5'),
                    color: '#ffffff',
                    border: currentTheme === 'dark'
                      ? (isAdminLogin ? '1px solid rgba(255, 0, 228, 0.3)' : '1px solid rgba(0, 242, 255, 0.3)')
                      : 'none',
                    boxShadow: currentTheme === 'dark'
                      ? (isAdminLogin ? '0 0 15px rgba(255, 0, 228, 0.3)' : '0 0 15px rgba(0, 242, 255, 0.3)')
                      : '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader size="small" />
                  ) : (
                    <>
                      <FaSignInAlt className="mr-2" /> {isAdminLogin ? 'Admin Sign In' : 'Sign In'}
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: theme.border }}>
                <div className="text-center">
                  {!isAdminLogin && (
                    <>
                      <p style={{ color: theme.textLight }} className="mb-2">New Customer?</p>
                      <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}
                        className="font-semibold flex items-center justify-center mb-4 hover:underline"
                        style={{ color: theme.primary }}
                      >
                        Create an Account <FaArrowRight className="ml-1" />
                      </Link>
                    </>
                  )}

                  {!isAdminLogin && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.border }}>
                      <button
                        onClick={toggleAdminRegistration}
                        className="flex items-center justify-center mx-auto font-semibold hover:underline"
                        style={{ color: theme.primary }}
                      >
                        <FaUserShield className="mr-2" /> Create Admin Account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden" style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
            boxShadow: theme.shadow,
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(255, 0, 228, 0.1)' : 'rgba(236, 72, 153, 0.1)'}`
          }}>
            <div className="px-6 py-8">
              <button
                onClick={toggleAdminRegistration}
                className="inline-flex items-center mb-6 font-medium hover:underline"
                style={{ color: theme.primary }}
              >
                <FaArrowRight className="mr-2 transform rotate-180" /> Back to Login
              </button>

              <div className="rounded-lg overflow-hidden mb-6">
                <div className="px-6 py-4" style={{
                  background: currentTheme === 'light'
                    ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
                    : 'linear-gradient(135deg, #1E3A8A 0%, #5B21B6 50%, #831843 100%)',
                  color: '#ffffff'
                }}>
                  <h1 className="text-2xl font-bold text-white flex items-center">
                    <FaUserShield className="mr-2" /> Admin Registration
                  </h1>
                  <p className="text-indigo-100">Create a new administrator account for Luxify</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                      Administrator Access
                    </h2>
                    <p style={{ color: theme.textLight }}>
                      Creating an admin account will give you access to:
                    </p>
                    <ul className="list-disc pl-5 mt-2" style={{ color: theme.textLight }}>
                      <li>Product management (add, edit, delete products)</li>
                      <li>Order management and processing</li>
                      <li>User management</li>
                      <li>Site analytics and reporting</li>
                    </ul>
                  </div>

                  <div className="p-4 mb-6 rounded-lg" style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(255, 193, 7, 0.1)' : '#FFF8E1',
                    borderLeft: '4px solid #FFC107'
                  }}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm" style={{ color: currentTheme === 'dark' ? '#FFC107' : '#856404' }}>
                          <strong>Note:</strong> This is for demonstration purposes. In a production environment, admin creation would be more restricted.
                        </p>
                      </div>
                    </div>
                  </div>

                  <AdminRegistration />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
