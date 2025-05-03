import React, { useState, useEffect } from 'react';
import { FaCog, FaBell, FaUser, FaLock, FaGlobe, FaCreditCard, FaShippingFast, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

const SettingsPage = () => {
  const { theme, currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Account settings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    securityAlerts: true
  });
  
  // Security settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Amazer',
    siteDescription: 'Your one-stop shop for everything',
    maintenanceMode: false,
    allowUserRegistration: true,
    paymentGateways: ['Stripe', 'PayPal'],
    currency: 'USD',
    taxRate: 7.5,
    defaultShippingMethod: 'Standard',
    freeShippingThreshold: 50,
    internationalShipping: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would be:
        // const { data } = await axios.get('/api/settings');
        
        // Mock data for now
        const mockData = {
          name: 'Admin User',
          email: 'admin@example.com',
          notificationPreferences: {
            emailNotifications: true,
            orderUpdates: true,
            marketingEmails: false,
            securityAlerts: true
          },
          displayPreferences: {
            darkMode: currentTheme === 'dark',
            compactView: false,
            showAnalyticsSummary: true
          },
          securitySettings: {
            twoFactorEnabled: false,
            lastPasswordChange: new Date().toISOString()
          }
        };
        
        setName(mockData.name);
        setEmail(mockData.email);
        setNotificationSettings(mockData.notificationPreferences);
        setTwoFactorEnabled(mockData.securitySettings.twoFactorEnabled);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load settings');
        setLoading(false);
      }
    };

    fetchSettings();
  }, [currentTheme]);

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // In a real implementation, this would be:
      // await axios.put('/api/settings', { name, email });
      
      // Mock success
      setTimeout(() => {
        setSuccess('Account settings updated successfully');
        setLoading(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 500);
    } catch (err) {
      setError('Failed to update account settings');
      setLoading(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // In a real implementation, this would be:
      // await axios.put('/api/settings', { notificationPreferences: notificationSettings });
      
      // Mock success
      setTimeout(() => {
        setSuccess('Notification settings updated successfully');
        setLoading(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 500);
    } catch (err) {
      setError('Failed to update notification settings');
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      
      // In a real implementation, this would be:
      // await axios.put('/api/settings/password', { currentPassword, newPassword });
      
      // Mock success
      setTimeout(() => {
        setSuccess('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setLoading(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 500);
    } catch (err) {
      setError('Failed to update password');
      setLoading(false);
    }
  };

  const handleSystemSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // In a real implementation, this would be:
      // await axios.put('/api/settings/system', systemSettings);
      
      // Mock success
      setTimeout(() => {
        setSuccess('System settings updated successfully');
        setLoading(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 500);
    } catch (err) {
      setError('Failed to update system settings');
      setLoading(false);
    }
  };

  const renderAccountTab = () => {
    return (
      <form onSubmit={handleAccountSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                borderColor: theme.border,
                color: theme.text,
                border: '1px solid'
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg"
              style={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                borderColor: theme.border,
                color: theme.text,
                border: '1px solid'
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg flex items-center"
            style={{
              backgroundColor: theme.buttonPrimary,
              color: theme.buttonText
            }}
            disabled={loading}
          >
            {loading ? <Loader size="small" /> : <FaSave className="mr-2" />}
            Save Changes
          </button>
        </div>
      </form>
    );
  };

  const renderNotificationsTab = () => {
    return (
      <form onSubmit={handleNotificationSubmit}>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              className="mr-2"
              checked={notificationSettings.emailNotifications}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                emailNotifications: e.target.checked
              })}
              style={{
                accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
              }}
            />
            <label htmlFor="emailNotifications" className="text-sm font-medium" style={{ color: theme.text }}>
              Email Notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="orderUpdates"
              className="mr-2"
              checked={notificationSettings.orderUpdates}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                orderUpdates: e.target.checked
              })}
              style={{
                accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
              }}
            />
            <label htmlFor="orderUpdates" className="text-sm font-medium" style={{ color: theme.text }}>
              Order Updates
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="marketingEmails"
              className="mr-2"
              checked={notificationSettings.marketingEmails}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                marketingEmails: e.target.checked
              })}
              style={{
                accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
              }}
            />
            <label htmlFor="marketingEmails" className="text-sm font-medium" style={{ color: theme.text }}>
              Marketing Emails
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="securityAlerts"
              className="mr-2"
              checked={notificationSettings.securityAlerts}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                securityAlerts: e.target.checked
              })}
              style={{
                accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
              }}
            />
            <label htmlFor="securityAlerts" className="text-sm font-medium" style={{ color: theme.text }}>
              Security Alerts
            </label>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg flex items-center"
            style={{
              backgroundColor: theme.buttonPrimary,
              color: theme.buttonText
            }}
            disabled={loading}
          >
            {loading ? <Loader size="small" /> : <FaSave className="mr-2" />}
            Save Changes
          </button>
        </div>
      </form>
    );
  };

  const renderSecurityTab = () => {
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Change Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg flex items-center"
                style={{
                  backgroundColor: theme.buttonPrimary,
                  color: theme.buttonText
                }}
                disabled={loading}
              >
                {loading ? <Loader size="small" /> : <FaLock className="mr-2" />}
                Update Password
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Two-Factor Authentication</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="twoFactorEnabled"
              className="mr-2"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              style={{
                accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
              }}
            />
            <label htmlFor="twoFactorEnabled" className="text-sm font-medium" style={{ color: theme.text }}>
              Enable Two-Factor Authentication
            </label>
          </div>
          <p className="mt-2 text-sm" style={{ color: theme.textLight }}>
            Two-factor authentication adds an extra layer of security to your account.
          </p>
        </div>
      </div>
    );
  };

  const renderSystemTab = () => {
    return (
      <form onSubmit={handleSystemSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Site Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={systemSettings.siteName}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    siteName: e.target.value
                  })}
                />
              </div>
              <div>
                <label htmlFor="siteDescription" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Site Description
                </label>
                <textarea
                  id="siteDescription"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={systemSettings.siteDescription}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    siteDescription: e.target.value
                  })}
                  rows="3"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  className="mr-2"
                  checked={systemSettings.maintenanceMode}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    maintenanceMode: e.target.checked
                  })}
                  style={{
                    accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
                  }}
                />
                <label htmlFor="maintenanceMode" className="text-sm font-medium" style={{ color: theme.text }}>
                  Maintenance Mode
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowUserRegistration"
                  className="mr-2"
                  checked={systemSettings.allowUserRegistration}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    allowUserRegistration: e.target.checked
                  })}
                  style={{
                    accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
                  }}
                />
                <label htmlFor="allowUserRegistration" className="text-sm font-medium" style={{ color: theme.text }}>
                  Allow User Registration
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Payment Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="currency" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Currency
                </label>
                <select
                  id="currency"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={systemSettings.currency}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    currency: e.target.value
                  })}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
              </div>
              <div>
                <label htmlFor="taxRate" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  id="taxRate"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={systemSettings.taxRate}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    taxRate: parseFloat(e.target.value)
                  })}
                  step="0.1"
                  min="0"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-4 mt-6" style={{ color: theme.text }}>Shipping Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="defaultShippingMethod" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Default Shipping Method
                </label>
                <select
                  id="defaultShippingMethod"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={systemSettings.defaultShippingMethod}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    defaultShippingMethod: e.target.value
                  })}
                >
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                  <option value="Overnight">Overnight</option>
                </select>
              </div>
              <div>
                <label htmlFor="freeShippingThreshold" className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                  Free Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  id="freeShippingThreshold"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : theme.inputBg,
                    borderColor: theme.border,
                    color: theme.text,
                    border: '1px solid'
                  }}
                  value={systemSettings.freeShippingThreshold}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    freeShippingThreshold: parseInt(e.target.value)
                  })}
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="internationalShipping"
                  className="mr-2"
                  checked={systemSettings.internationalShipping}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    internationalShipping: e.target.checked
                  })}
                  style={{
                    accentColor: currentTheme === 'dark' ? theme.primary : theme.primary
                  }}
                />
                <label htmlFor="internationalShipping" className="text-sm font-medium" style={{ color: theme.text }}>
                  International Shipping
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg flex items-center"
            style={{
              backgroundColor: theme.buttonPrimary,
              color: theme.buttonText
            }}
            disabled={loading}
          >
            {loading ? <Loader size="small" /> : <FaSave className="mr-2" />}
            Save System Settings
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>Settings</h1>
        <p className="text-sm" style={{ color: theme.textLight }}>
          Manage your account and system settings
        </p>
      </div>

      {success && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: theme.success + '20', color: theme.success }}>
          {success}
        </div>
      )}

      {error && (
        <Message variant="error">{error}</Message>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            <div className="p-4 border-b" style={{ borderColor: theme.border }}>
              <h2 className="font-semibold" style={{ color: theme.text }}>Settings</h2>
            </div>
            <div className="p-2">
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'account' ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: activeTab === 'account' 
                    ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
                    : 'transparent',
                  color: activeTab === 'account' ? theme.primary : theme.text,
                }}
                onClick={() => setActiveTab('account')}
              >
                <FaUser className="mr-2" /> Account
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'notifications' ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: activeTab === 'notifications' 
                    ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
                    : 'transparent',
                  color: activeTab === 'notifications' ? theme.primary : theme.text,
                }}
                onClick={() => setActiveTab('notifications')}
              >
                <FaBell className="mr-2" /> Notifications
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'security' ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: activeTab === 'security' 
                    ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
                    : 'transparent',
                  color: activeTab === 'security' ? theme.primary : theme.text,
                }}
                onClick={() => setActiveTab('security')}
              >
                <FaLock className="mr-2" /> Security
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'system' ? 'font-semibold' : ''}`}
                style={{
                  backgroundColor: activeTab === 'system' 
                    ? (currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(80, 70, 229, 0.1)')
                    : 'transparent',
                  color: activeTab === 'system' ? theme.primary : theme.text,
                }}
                onClick={() => setActiveTab('system')}
              >
                <FaCog className="mr-2" /> System
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="rounded-lg p-6" style={{ 
            backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
            boxShadow: theme.shadow,
            borderColor: theme.border,
            border: '1px solid',
          }}>
            {loading && !error ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : (
              <>
                {activeTab === 'account' && renderAccountTab()}
                {activeTab === 'notifications' && renderNotificationsTab()}
                {activeTab === 'security' && renderSecurityTab()}
                {activeTab === 'system' && renderSystemTab()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
