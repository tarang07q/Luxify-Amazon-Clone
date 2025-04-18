import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/services/authService';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/ui/FormContainer';
import Loader from '../components/ui/Loader';
import { FaSignInAlt, FaArrowRight } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <FormContainer>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold flex items-center justify-center text-primary">
          <FaSignInAlt className="mr-2" /> Sign In
        </h1>
        <p className="text-gray-600 mt-2">Welcome back! Sign in to your account</p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
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
          <label htmlFor="password" className="block text-gray-700 mb-1">
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
          className="btn-primary w-full py-3 rounded-full flex items-center justify-center transition-transform transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? <Loader size="small" /> : 'Sign In'}
        </button>
      </form>

      <div className="py-5 border-t mt-6">
        <div className="text-center">
          <p className="text-gray-600 mb-2">New Customer?</p>
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-primary hover:underline font-semibold flex items-center justify-center"
          >
            Create an Account <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginPage;
