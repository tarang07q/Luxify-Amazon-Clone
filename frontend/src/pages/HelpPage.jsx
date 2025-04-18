import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaTruck, FaExchangeAlt, FaCreditCard, FaUserCircle, FaQuestionCircle, FaHeadset, FaComments, FaPhone, FaEnvelope } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample popular help topics
  const popularTopics = [
    {
      title: "Where's My Order?",
      icon: <FaShoppingCart className="text-primary text-2xl" />,
      description: "Track your package, view order status, and get delivery updates.",
      link: "/orders"
    },
    {
      title: "Returns & Refunds",
      icon: <FaExchangeAlt className="text-primary text-2xl" />,
      description: "Start a return, print return labels, and check refund status.",
      link: "/returns"
    },
    {
      title: "Shipping & Delivery",
      icon: <FaTruck className="text-primary text-2xl" />,
      description: "Learn about shipping options, costs, and delivery times.",
      link: "/shipping"
    },
    {
      title: "Payment & Gift Cards",
      icon: <FaCreditCard className="text-primary text-2xl" />,
      description: "Manage payment methods, gift cards, and billing issues.",
      link: "/payment"
    },
    {
      title: "Account Settings",
      icon: <FaUserCircle className="text-primary text-2xl" />,
      description: "Update your profile, addresses, and communication preferences.",
      link: "/account"
    },
    {
      title: "Luxify Premium",
      icon: <FaQuestionCircle className="text-primary text-2xl" />,
      description: "Get help with your Luxify Premium membership and benefits.",
      link: "/premium"
    }
  ];
  
  // Sample FAQs
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by going to 'Your Orders' in your account. Select the order you want to track and click 'Track Package' to see the current status and estimated delivery date."
    },
    {
      question: "How do I return an item?",
      answer: "To return an item, go to 'Your Orders' and select 'Return or Replace Items' next to the order. Follow the instructions to print a return label and prepare your package for return."
    },
    {
      question: "When will I receive my refund?",
      answer: "Refunds are typically processed within 3-5 business days after we receive your return. The time it takes for the refund to appear in your account depends on your payment method."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "You can change or cancel your order if it hasn't entered the shipping process yet. Go to 'Your Orders' and select 'Change' or 'Cancel items' next to the order you want to modify."
    },
    {
      question: "What are the benefits of Luxify Premium?",
      answer: "Luxify Premium includes free two-day shipping on eligible items, access to exclusive deals, streaming services, and more. Visit the Luxify Premium page for a complete list of benefits."
    }
  ];

  return (
    <PageTemplate 
      title="Help Center" 
      breadcrumbs={[{ text: 'Help Center' }]}
    >
      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">How Can We Help You Today?</h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 pr-4 rounded-full border-none focus:ring-2 focus:ring-white text-gray-800"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Popular Help Topics</h2>
        
        <div className="info-grid">
          {popularTopics.map((topic, index) => (
            <Link to={topic.link} key={index} className="info-card hover:border-primary transition-colors">
              <div className="flex items-start">
                <div className="mr-4 mt-1">{topic.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{topic.title}</h3>
                  <p className="mt-2 text-gray-600">{topic.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaQuestionCircle className="mr-2 text-primary" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6 mt-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/faq" className="text-primary hover:underline">
            View All FAQs
          </Link>
        </div>
      </div>

      <div className="page-section">
        <h2 className="flex items-center">
          <FaHeadset className="mr-2 text-primary" />
          Contact Customer Service
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <FaComments className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">
              Chat with a customer service representative in real-time.
            </p>
            <p className="text-sm text-gray-500 mb-4">Available 24/7</p>
            <button className="cta-button w-full">
              Start Chat
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <FaPhone className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">
              Speak directly with our customer service team.
            </p>
            <p className="text-sm text-gray-500 mb-4">Available 24/7</p>
            <button className="cta-button w-full">
              Call Us
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <FaEnvelope className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">
              Send us an email and we'll respond within 24 hours.
            </p>
            <p className="text-sm text-gray-500 mb-4">Response within 24 hours</p>
            <button className="cta-button w-full">
              Email Us
            </button>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Self-Service Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">Manage Your Orders</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/orders" className="text-primary hover:underline flex items-center">
                  <FaShoppingCart className="mr-2" /> View and track your orders
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-primary hover:underline flex items-center">
                  <FaExchangeAlt className="mr-2" /> Return or replace items
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-primary hover:underline flex items-center">
                  <FaCreditCard className="mr-2" /> View order invoices
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">Manage Your Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-primary hover:underline flex items-center">
                  <FaUserCircle className="mr-2" /> Update your profile
                </Link>
              </li>
              <li>
                <Link to="/addresses" className="text-primary hover:underline flex items-center">
                  <FaTruck className="mr-2" /> Manage addresses
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-primary hover:underline flex items-center">
                  <FaCreditCard className="mr-2" /> Manage payment methods
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Help by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/help/orders" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Orders & Purchases</h3>
          </Link>
          <Link to="/help/returns" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Returns & Refunds</h3>
          </Link>
          <Link to="/help/shipping" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Shipping & Delivery</h3>
          </Link>
          <Link to="/help/payment" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Payment & Gift Cards</h3>
          </Link>
          <Link to="/help/account" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Account Settings</h3>
          </Link>
          <Link to="/help/premium" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Luxify Premium</h3>
          </Link>
          <Link to="/help/devices" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Devices & Apps</h3>
          </Link>
          <Link to="/help/digital" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Digital Services</h3>
          </Link>
          <Link to="/help/accessibility" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors">
            <h3 className="font-semibold">Accessibility</h3>
          </Link>
        </div>
      </div>

      <div className="page-section">
        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our customer service team is available 24/7 to assist you with any questions or concerns you may have.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="cta-button">
              Contact Us
            </button>
            <button className="secondary-button">
              View All Help Topics
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default HelpPage;
