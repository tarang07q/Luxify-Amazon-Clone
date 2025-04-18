import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFileDownload, FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const OrdersPage = () => {
  const [timeFilter, setTimeFilter] = useState('last30days');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample orders data
  const orders = [
    {
      id: 'ORD-12345',
      date: 'May 15, 2023',
      total: 129.99,
      status: 'Delivered',
      items: [
        { name: 'Wireless Headphones', price: 79.99, quantity: 1, image: '/placeholder.jpg' },
        { name: 'Phone Case', price: 24.99, quantity: 2, image: '/placeholder.jpg' }
      ]
    },
    {
      id: 'ORD-12346',
      date: 'May 10, 2023',
      total: 79.50,
      status: 'Shipped',
      items: [
        { name: 'Smart Watch', price: 79.50, quantity: 1, image: '/placeholder.jpg' }
      ]
    },
    {
      id: 'ORD-12347',
      date: 'May 5, 2023',
      total: 249.99,
      status: 'Delivered',
      items: [
        { name: 'Tablet', price: 249.99, quantity: 1, image: '/placeholder.jpg' }
      ]
    },
    {
      id: 'ORD-12348',
      date: 'April 28, 2023',
      total: 35.97,
      status: 'Delivered',
      items: [
        { name: 'Books (3)', price: 35.97, quantity: 1, image: '/placeholder.jpg' }
      ]
    },
    {
      id: 'ORD-12349',
      date: 'April 15, 2023',
      total: 149.95,
      status: 'Cancelled',
      items: [
        { name: 'Running Shoes', price: 149.95, quantity: 1, image: '/placeholder.jpg' }
      ]
    }
  ];
  
  // Filter orders based on time period
  const getFilteredOrders = () => {
    let filtered = [...orders];
    
    // Apply search filter if query exists
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };
  
  // Get status icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Shipped':
        return <FaTruck className="text-blue-500" />;
      case 'Processing':
        return <FaBox className="text-yellow-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };
  
  // Get status class based on order status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate 
      title="Your Orders" 
      breadcrumbs={[{ text: 'Your Account', link: '/account' }, { text: 'Your Orders' }]}
    >
      <div className="page-section">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="last30days">Last 30 days</option>
              <option value="last3months">Last 3 months</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="alltime">All time</option>
            </select>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <button className="flex items-center text-primary hover:underline">
            <FaFileDownload className="mr-2" />
            Download Order History
          </button>
        </div>
        
        <div className="space-y-6">
          {getFilteredOrders().length > 0 ? (
            getFilteredOrders().map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">ORDER PLACED</div>
                    <div>{order.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">TOTAL</div>
                    <div>${order.total.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">ORDER #</div>
                    <div>{order.id}</div>
                  </div>
                  <div className="flex items-center justify-start md:justify-end">
                    <span className={`px-2 py-1 inline-flex items-center text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Order Items</h3>
                  
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 sm:h-24 bg-gray-200 rounded-md flex-shrink-0 mb-4 sm:mb-0"></div>
                        <div className="sm:ml-4 flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </div>
                          <div className="text-primary font-medium">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Actions */}
                <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-wrap gap-3">
                  <Link to={`/order/${order.id}`} className="secondary-button">
                    View Order Details
                  </Link>
                  
                  {order.status === 'Delivered' && (
                    <>
                      <button className="secondary-button">
                        Buy Again
                      </button>
                      <button className="secondary-button">
                        Write a Product Review
                      </button>
                    </>
                  )}
                  
                  {(order.status === 'Delivered' || order.status === 'Shipped') && (
                    <button className="secondary-button">
                      Track Package
                    </button>
                  )}
                  
                  {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                    <button className="secondary-button">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="text-gray-400 text-5xl mb-4">
                <FaBox className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? 
                  `We couldn't find any orders matching "${searchQuery}".` : 
                  "You haven't placed any orders in this time period."}
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:underline"
                >
                  Clear search and show all orders
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="page-section">
        <h2>Need Help with an Order?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">Returns & Refunds</h3>
            <p className="mb-4">
              Return or exchange items, print return labels, and check refund status.
            </p>
            <Link to="/returns" className="secondary-button">
              Return or Replace Items
            </Link>
          </div>
          
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">Track Your Package</h3>
            <p className="mb-4">
              View shipping status and delivery information for your orders.
            </p>
            <Link to="/track" className="secondary-button">
              Track Your Package
            </Link>
          </div>
          
          <div className="info-card">
            <h3 className="text-xl font-semibold mb-2">Contact Customer Service</h3>
            <p className="mb-4">
              Get help with order issues, returns, refunds, and more.
            </p>
            <Link to="/contact" className="secondary-button">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default OrdersPage;
