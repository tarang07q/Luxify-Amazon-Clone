import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetMeQuery } from '../slices/services/authService';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import ProfileCard3D from '../components/3d/ProfileCard3D';
import { FaUser, FaEdit } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const { theme, currentTheme } = useTheme();

  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, error, refetch } = useGetMeQuery();

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setEmail(data.data.email);
    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // This is a placeholder for the update profile functionality
    // In a real app, you would call an API endpoint to update the user profile
    toast.success('Profile updated successfully');
    setIsEditing(false);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaUser className="mr-2" /> My Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.error || error.error || 'An error occurred'}
            </Message>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-primary hover:text-primary-dark"
                >
                  <FaEdit size={20} />
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <ProfileCard3D
                  size={180}
                  color={currentTheme === 'dark' ? '#01ffc3' : '#10b981'}
                  floatingAnimation={true}
                  glowEffect={true}
                  userName={data.data.name.toUpperCase()}
                />
              </div>

              {isEditing ? (
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-1">
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
                    <label
                      htmlFor="password"
                      className="block text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="input-field"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave blank to keep current password
                    </p>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="input-field"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button type="submit" className="btn-primary">
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setName(data.data.name);
                        setEmail(data.data.email);
                        setPassword('');
                        setConfirmPassword('');
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="text-lg">{data.data.name}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-lg">{data.data.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Role</h3>
                    <p className="text-lg capitalize">{data.data.role}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
                <p className="text-gray-600">
                  View your order history and track current orders.
                </p>
                <a
                  href="/orderhistory"
                  className="text-primary hover:underline block mt-2"
                >
                  View Orders
                </a>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                <p className="text-gray-600">
                  Manage your shipping addresses for faster checkout.
                </p>
                <a
                  href="/shipping"
                  className="text-primary hover:underline block mt-2"
                >
                  Manage Addresses
                </a>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
                <p className="text-gray-600">
                  Manage your payment methods for easier checkout.
                </p>
                <a
                  href="/payment"
                  className="text-primary hover:underline block mt-2"
                >
                  Manage Payments
                </a>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Security</h3>
                <p className="text-gray-600">
                  Update your password and security settings.
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary hover:underline block mt-2"
                >
                  Update Security
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
