import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation
} from '../slices/services/authService';
import { setCredentials, logout } from '../slices/authSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import ProfileCard3D from '../components/3d/ProfileCard3D';
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaTrash,
  FaExclamationTriangle,
  FaShieldAlt,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, currentTheme } = useTheme();

  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, error, refetch } = useGetMeQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPass }] = useChangePasswordMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setEmail(data.data.email);
    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await updateProfile({
        name,
        email
      }).unwrap();

      dispatch(setCredentials(result));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'Failed to update profile');
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword
      }).unwrap();

      toast.success('Password changed successfully!');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'Failed to change password');
    }
  };

  const deleteAccountHandler = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type "DELETE" to confirm account deletion');
      return;
    }

    try {
      await deleteAccount().unwrap();
      dispatch(logout());
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.error || err.error || 'Failed to delete account');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setName(data?.data?.name || '');
    setEmail(data?.data?.email || '');
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center" style={{ color: theme.text }}>
            <FaUser className="mr-3" style={{ color: theme.primary }} />
            Account Management
          </h1>
          <p style={{ color: theme.textLight }} className="mt-2">
            Manage your profile, security settings, and account preferences
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.error || error.error || 'An error occurred'}
          </Message>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information Card */}
            <div className="lg:col-span-1">
              <div className="rounded-lg shadow-lg p-6" style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)'}`,
                boxShadow: currentTheme === 'dark' ? '0 0 20px rgba(0, 242, 255, 0.1)' : theme.shadow
              }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center" style={{ color: theme.text }}>
                    <FaUserTag className="mr-2" style={{ color: theme.primary }} />
                    Profile Info
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        color: theme.primary
                      }}
                    >
                      <FaEdit size={16} />
                    </button>
                  )}
                </div>

                <div className="flex justify-center mb-6">
                  <ProfileCard3D
                    size={160}
                    color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
                    floatingAnimation={true}
                    glowEffect={true}
                    userName={data?.data?.name?.toUpperCase() || 'USER'}
                  />
                </div>

                {isEditing ? (
                  <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2" style={{ color: theme.text }}>
                        <FaUser className="inline mr-2" /> Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: theme.inputBg,
                          color: theme.text,
                          border: `1px solid ${theme.inputBorder}`
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2" style={{ color: theme.text }}>
                        <FaEnvelope className="inline mr-2" /> Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: theme.inputBg,
                          color: theme.text,
                          border: `1px solid ${theme.inputBorder}`
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                        style={{
                          backgroundColor: theme.primary,
                          color: '#ffffff'
                        }}
                      >
                        {isUpdating ? <Loader size="small" /> : <><FaSave className="mr-2" /> Save</>}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex-1 py-2 px-4 rounded-lg font-medium"
                        style={{
                          backgroundColor: theme.cardHoverBg,
                          color: theme.text,
                          border: `1px solid ${theme.border}`
                        }}
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: theme.cardHoverBg }}>
                      <h3 className="text-sm font-medium mb-1" style={{ color: theme.textLight }}>Full Name</h3>
                      <p className="text-lg font-medium" style={{ color: theme.text }}>{data?.data?.name}</p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: theme.cardHoverBg }}>
                      <h3 className="text-sm font-medium mb-1" style={{ color: theme.textLight }}>Email Address</h3>
                      <p className="text-lg font-medium" style={{ color: theme.text }}>{data?.data?.email}</p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: theme.cardHoverBg }}>
                      <h3 className="text-sm font-medium mb-1" style={{ color: theme.textLight }}>Account Type</h3>
                      <p className="text-lg font-medium capitalize flex items-center" style={{ color: theme.text }}>
                        <FaShieldAlt className="mr-2" style={{ color: data?.data?.role === 'admin' ? '#ff6b6b' : theme.primary }} />
                        {data?.data?.role}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: theme.cardHoverBg }}>
                      <h3 className="text-sm font-medium mb-1" style={{ color: theme.textLight }}>Member Since</h3>
                      <p className="text-lg font-medium flex items-center" style={{ color: theme.text }}>
                        <FaCalendarAlt className="mr-2" style={{ color: theme.primary }} />
                        {new Date(data?.data?.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security & Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Security Settings */}
              <div className="rounded-lg shadow-lg p-6" style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)'}`,
                boxShadow: currentTheme === 'dark' ? '0 0 20px rgba(0, 242, 255, 0.1)' : theme.shadow
              }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center" style={{ color: theme.text }}>
                    <FaLock className="mr-2" style={{ color: theme.primary }} />
                    Security Settings
                  </h2>
                  {!isChangingPassword && (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="py-2 px-4 rounded-lg font-medium"
                      style={{
                        backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        color: theme.primary,
                        border: `1px solid ${theme.primary}`
                      }}
                    >
                      Change Password
                    </button>
                  )}
                </div>

                {isChangingPassword ? (
                  <form onSubmit={changePasswordHandler} className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2" style={{ color: theme.text }}>
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: theme.inputBg,
                          color: theme.text,
                          border: `1px solid ${theme.inputBorder}`
                        }}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2" style={{ color: theme.text }}>
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: theme.inputBg,
                          color: theme.text,
                          border: `1px solid ${theme.inputBorder}`
                        }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2" style={{ color: theme.text }}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: theme.inputBg,
                          color: theme.text,
                          border: `1px solid ${theme.inputBorder}`
                        }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        disabled={isChangingPass}
                        className="flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                        style={{
                          backgroundColor: theme.primary,
                          color: '#ffffff'
                        }}
                      >
                        {isChangingPass ? <Loader size="small" /> : <><FaCheckCircle className="mr-2" /> Update Password</>}
                      </button>
                      <button
                        type="button"
                        onClick={cancelPasswordChange}
                        className="flex-1 py-2 px-4 rounded-lg font-medium"
                        style={{
                          backgroundColor: theme.cardHoverBg,
                          color: theme.text,
                          border: `1px solid ${theme.border}`
                        }}
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: theme.cardHoverBg }}>
                    <p style={{ color: theme.textLight }}>
                      Keep your account secure by using a strong password and changing it regularly.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="rounded-lg shadow-lg p-6" style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.1)'}`,
                boxShadow: currentTheme === 'dark' ? '0 0 20px rgba(0, 242, 255, 0.1)' : theme.shadow
              }}>
                <h2 className="text-xl font-semibold mb-6" style={{ color: theme.text }}>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="/orderhistory"
                    className="p-4 rounded-lg transition-colors"
                    style={{
                      backgroundColor: theme.cardHoverBg,
                      border: `1px solid ${theme.border}`
                    }}
                  >
                    <h3 className="font-medium mb-2" style={{ color: theme.text }}>Order History</h3>
                    <p className="text-sm" style={{ color: theme.textLight }}>
                      View and track your orders
                    </p>
                  </a>
                  <a
                    href="/shipping"
                    className="p-4 rounded-lg transition-colors"
                    style={{
                      backgroundColor: theme.cardHoverBg,
                      border: `1px solid ${theme.border}`
                    }}
                  >
                    <h3 className="font-medium mb-2" style={{ color: theme.text }}>Shipping Addresses</h3>
                    <p className="text-sm" style={{ color: theme.textLight }}>
                      Manage delivery addresses
                    </p>
                  </a>
                  <a
                    href="/payment"
                    className="p-4 rounded-lg transition-colors"
                    style={{
                      backgroundColor: theme.cardHoverBg,
                      border: `1px solid ${theme.border}`
                    }}
                  >
                    <h3 className="font-medium mb-2" style={{ color: theme.text }}>Payment Methods</h3>
                    <p className="text-sm" style={{ color: theme.textLight }}>
                      Manage payment options
                    </p>
                  </a>
                  <div
                    className="p-4 rounded-lg transition-colors"
                    style={{
                      backgroundColor: theme.cardHoverBg,
                      border: `1px solid ${theme.border}`
                    }}
                  >
                    <h3 className="font-medium mb-2" style={{ color: theme.text }}>Account Status</h3>
                    <p className="text-sm flex items-center" style={{ color: '#10b981' }}>
                      <FaCheckCircle className="mr-2" />
                      Active & Verified
                    </p>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="rounded-lg shadow-lg p-6" style={{
                backgroundColor: theme.cardBg,
                border: '1px solid rgba(239, 68, 68, 0.2)',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.1)'
              }}>
                <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#ef4444' }}>
                  <FaExclamationTriangle className="mr-2" />
                  Danger Zone
                </h2>

                {!showDeleteConfirm ? (
                  <div>
                    <p className="mb-4" style={{ color: theme.textLight }}>
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="py-2 px-4 rounded-lg font-medium flex items-center"
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      <FaTrash className="mr-2" />
                      Delete Account
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4" style={{ color: '#ef4444' }}>
                      This action cannot be undone. Type <strong>DELETE</strong> to confirm:
                    </p>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg mb-4"
                      style={{
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="Type DELETE to confirm"
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={deleteAccountHandler}
                        disabled={isDeleting || deleteConfirmText !== 'DELETE'}
                        className="py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                        style={{
                          backgroundColor: '#ef4444',
                          color: '#ffffff',
                          opacity: deleteConfirmText === 'DELETE' ? 1 : 0.5
                        }}
                      >
                        {isDeleting ? <Loader size="small" /> : <><FaTrash className="mr-2" /> Delete Forever</>}
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeleteConfirmText('');
                        }}
                        className="py-2 px-4 rounded-lg font-medium"
                        style={{
                          backgroundColor: theme.cardHoverBg,
                          color: theme.text,
                          border: `1px solid ${theme.border}`
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
