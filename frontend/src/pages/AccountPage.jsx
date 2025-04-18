import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaHeart, FaAddressCard, FaCreditCard, FaGift, FaBell, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const AccountPage = () => {
  return (
    <PageTemplate 
      title="Your Account" 
      breadcrumbs={[{ text: 'Your Account' }]}
    >
      <div className="page-section">
        <p className="text-lg">
          Welcome to your Luxify account. Manage your orders, profile, payment methods, and more from this central dashboard.
        </p>
      </div>

      <div className="page-section">
        <h2>Account Dashboard</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/orders" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaShoppingCart className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Your Orders</h3>
                <p className="mt-2 text-gray-600">Track, return, or buy again</p>
              </div>
            </div>
          </Link>
          
          <Link to="/profile" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaUser className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Profile & Security</h3>
                <p className="mt-2 text-gray-600">Edit login, name, and mobile number</p>
              </div>
            </div>
          </Link>
          
          <Link to="/addresses" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaAddressCard className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Addresses</h3>
                <p className="mt-2 text-gray-600">Edit addresses for orders and gifts</p>
              </div>
            </div>
          </Link>
          
          <Link to="/payment" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaCreditCard className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Payment Methods</h3>
                <p className="mt-2 text-gray-600">Edit or add payment methods</p>
              </div>
            </div>
          </Link>
          
          <Link to="/wishlist" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaHeart className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Wishlist</h3>
                <p className="mt-2 text-gray-600">View your saved items</p>
              </div>
            </div>
          </Link>
          
          <Link to="/gift-cards" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaGift className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Gift Cards</h3>
                <p className="mt-2 text-gray-600">View balance or redeem a card</p>
              </div>
            </div>
          </Link>
          
          <Link to="/notifications" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaBell className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Communication Preferences</h3>
                <p className="mt-2 text-gray-600">Manage your email and notification settings</p>
              </div>
            </div>
          </Link>
          
          <Link to="/premium" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaShieldAlt className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Luxify Premium</h3>
                <p className="mt-2 text-gray-600">Manage your membership</p>
              </div>
            </div>
          </Link>
          
          <Link to="/help" className="info-card hover:border-primary transition-colors">
            <div className="flex items-start">
              <FaQuestionCircle className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Customer Service</h3>
                <p className="mt-2 text-gray-600">Get help with your orders and account</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="page-section">
        <h2>Your Recent Orders</h2>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-12345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$129.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    <Link to="/orders/12345">View Order</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-12346</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$79.50</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Shipped</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    <Link to="/orders/12346">View Order</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-12347</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 5, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$249.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    <Link to="/orders/12347">View Order</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <Link to="/orders" className="text-primary hover:underline">View All Orders</Link>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Account Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500">Name:</span>
                <span className="ml-2">John Doe</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <span className="ml-2">john.doe@example.com</span>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <span className="ml-2">(555) 123-4567</span>
              </div>
            </div>
            <button className="secondary-button mt-4">
              Edit Profile
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Default Address</h3>
            <div className="space-y-1">
              <div>John Doe</div>
              <div>123 Main Street</div>
              <div>Apt 4B</div>
              <div>New York, NY 10001</div>
              <div>United States</div>
            </div>
            <button className="secondary-button mt-4">
              Edit Addresses
            </button>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Recommendations for You</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">Product Name</h3>
                <p className="text-primary font-bold mt-1">$99.99</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/recommendations" className="text-primary hover:underline">
            View All Recommendations
          </Link>
        </div>
      </div>

      <div className="page-section">
        <h2>Need Help?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="mb-4">
              Our customer service team is available 24/7 to assist you with any questions or concerns.
            </p>
            <Link to="/contact" className="secondary-button">
              Contact Support
            </Link>
          </div>
          
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">FAQs</h3>
            <p className="mb-4">
              Find answers to commonly asked questions about orders, returns, and account management.
            </p>
            <Link to="/faq" className="secondary-button">
              View FAQs
            </Link>
          </div>
          
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">Return an Item</h3>
            <p className="mb-4">
              Start a return for items purchased within the last 30 days.
            </p>
            <Link to="/returns" className="secondary-button">
              Start a Return
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AccountPage;
