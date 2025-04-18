import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/services/authService';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/ui/FormContainer';
import Loader from '../components/ui/Loader';
import { FaSignInAlt, FaArrowRight, FaUserShield } from 'react-icons/fa';
import AdminRegistration from '../components/admin/AdminRegistration';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAdminRegistration, setShowAdminRegistration] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
    }
  };

  const toggleAdminRegistration = () => {
    setShowAdminRegistration(!showAdminRegistration);
  };

  return (
    <FormContainer>
      {!showAdminRegistration ? (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold flex items-center justify-center text-indigo-600">
              <FaSignInAlt className="mr-2" /> Sign In
            </h1>
            <p className="text-gray-700 mt-2">Welcome back! Sign in to your account</p>
          </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-800 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 rounded-full flex items-center justify-center transition-transform transform hover:scale-105 bg-indigo-600 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? <Loader size="small" /> : 'Sign In'}
        </button>
      </form>

      <div className="py-5 border-t mt-6">
        <div className="text-center">
          <p className="text-gray-700 mb-2">New Customer?</p>
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-indigo-600 hover:underline font-semibold flex items-center justify-center mb-4"
          >
            Create an Account <FaArrowRight className="ml-1" />
          </Link>

          <div className="mt-4 pt-4 border-t">
            <button
              onClick={toggleAdminRegistration}
              className="flex items-center justify-center mx-auto text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              <FaUserShield className="mr-2" /> Create Admin Account
            </button>
          </div>
        </div>
      </div>
      </>
      ) : (
        <div>
          <button
            onClick={toggleAdminRegistration}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium"
          >
            <FaArrowRight className="mr-2 transform rotate-180" /> Back to Login
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">Admin Registration</h1>
              <p className="text-indigo-100">Create a new administrator account for Luxify</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Administrator Access</h2>
                <p className="text-gray-600">
                  Creating an admin account will give you access to:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Product management (add, edit, delete products)</li>
                  <li>Order management and processing</li>
                  <li>User management</li>
                  <li>Site analytics and reporting</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> This is for demonstration purposes. In a production environment, admin creation would be more restricted.
                    </p>
                  </div>
                </div>
              </div>

              <AdminRegistration />
            </div>
          </div>
        </div>
      )}
    </FormContainer>
  );
};

export default LoginPage;
