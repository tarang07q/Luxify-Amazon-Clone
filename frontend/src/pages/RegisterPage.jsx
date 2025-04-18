import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/services/authService';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/ui/FormContainer';
import Loader from '../components/ui/Loader';
import { FaUser, FaArrowRight } from 'react-icons/fa';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'An error occurred');
    }
  };

  return (
    <FormContainer>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold flex items-center justify-center text-indigo-600">
          <FaUser className="mr-2" /> Create Account
        </h1>
        <p className="text-gray-700 mt-2">Join Luxify and start shopping today!</p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="input-field"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-800 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 rounded-full flex items-center justify-center transition-transform transform hover:scale-105 bg-indigo-600 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? <Loader size="small" /> : 'Create Account'}
        </button>
      </form>

      <div className="py-5 border-t mt-6">
        <div className="text-center">
          <p className="text-gray-700 mb-2">Already have an account?</p>
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className="text-indigo-600 hover:underline font-semibold flex items-center justify-center"
          >
            Sign In <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterPage;
