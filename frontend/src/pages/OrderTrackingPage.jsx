import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../slices/services/orderService';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { useTheme } from '../context/ThemeContext';
import {
  FaBox,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaReceipt,
  FaArrowLeft,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { theme, currentTheme } = useTheme();
  
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);

  const statusSteps = [
    { key: 'Pending', label: 'Order Placed', icon: FaReceipt },
    { key: 'Processing', label: 'Processing', icon: FaClock },
    { key: 'Packed', label: 'Packed', icon: FaBox },
    { key: 'Shipped', label: 'Shipped', icon: FaShippingFast },
    { key: 'Out for Delivery', label: 'Out for Delivery', icon: FaTruck },
    { key: 'Delivered', label: 'Delivered', icon: FaCheckCircle }
  ];

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const getStatusColor = (stepIndex, currentIndex) => {
    if (stepIndex <= currentIndex) {
      return currentTheme === 'dark' ? '#00f2ff' : '#10b981';
    }
    return theme.textLight;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <Message variant="danger">
        Order not found or you don't have permission to view this order.
      </Message>
    );
  }

  const currentStatusIndex = getStatusIndex(order.data.status);
  const isDelivered = order.data.status === 'Delivered';
  const isCancelled = order.data.status === 'Cancelled';

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/orderhistory"
            className="inline-flex items-center mb-4 text-sm hover:underline"
            style={{ color: theme.primary }}
          >
            <FaArrowLeft className="mr-2" />
            Back to Orders
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
                Order Tracking
              </h1>
              <p className="text-lg mt-2" style={{ color: theme.textLight }}>
                Order #{order.data.trackingNumber || order.data._id}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-sm" style={{ color: theme.textLight }}>
                Order Date
              </div>
              <div className="font-semibold" style={{ color: theme.text }}>
                {formatDate(order.data.createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status Timeline */}
          <div className="lg:col-span-2">
            <div className="rounded-lg shadow-lg p-6" style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`
            }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: theme.text }}>
                Order Status
              </h2>

              {!isCancelled ? (
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5" style={{
                    backgroundColor: theme.border
                  }}></div>
                  
                  {/* Active Progress Line */}
                  <div 
                    className="absolute left-6 top-8 w-0.5 transition-all duration-500"
                    style={{
                      backgroundColor: currentTheme === 'dark' ? '#00f2ff' : '#10b981',
                      height: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`
                    }}
                  ></div>

                  {/* Status Steps */}
                  <div className="space-y-6">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      
                      return (
                        <div key={step.key} className="relative flex items-center">
                          {/* Step Icon */}
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all"
                            style={{
                              backgroundColor: isActive 
                                ? (currentTheme === 'dark' ? '#00f2ff' : '#10b981')
                                : theme.cardBg,
                              border: `2px solid ${getStatusColor(index, currentStatusIndex)}`,
                              transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                            }}
                          >
                            <Icon 
                              size={20} 
                              style={{ 
                                color: isActive ? '#ffffff' : getStatusColor(index, currentStatusIndex)
                              }} 
                            />
                          </div>

                          {/* Step Content */}
                          <div className="ml-4 flex-1">
                            <h3 
                              className="font-semibold"
                              style={{ 
                                color: isActive ? theme.text : theme.textLight 
                              }}
                            >
                              {step.label}
                            </h3>
                            
                            {/* Show timestamp for completed steps */}
                            {order.data.statusHistory && order.data.statusHistory.find(h => h.status === step.key) && (
                              <p className="text-sm mt-1" style={{ color: theme.textLight }}>
                                {formatDate(order.data.statusHistory.find(h => h.status === step.key).timestamp)}
                              </p>
                            )}
                            
                            {isCurrent && (
                              <p className="text-sm mt-1" style={{ color: theme.primary }}>
                                Current Status
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                    <FaCheckCircle size={32} style={{ color: '#ef4444' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#ef4444' }}>
                    Order Cancelled
                  </h3>
                  <p style={{ color: theme.textLight }}>
                    This order has been cancelled
                  </p>
                </div>
              )}

              {/* Estimated Delivery */}
              {order.data.estimatedDelivery && !isDelivered && !isCancelled && (
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: theme.cardHoverBg }}>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-3" style={{ color: theme.primary }} />
                    <div>
                      <h4 className="font-semibold" style={{ color: theme.text }}>
                        Estimated Delivery
                      </h4>
                      <p style={{ color: theme.textLight }}>
                        {formatDate(order.data.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="rounded-lg shadow-lg p-6" style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`
            }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: theme.text }}>
                <FaMapMarkerAlt className="mr-2" style={{ color: theme.primary }} />
                Shipping Address
              </h3>
              
              <div style={{ color: theme.textLight }}>
                <p className="font-medium" style={{ color: theme.text }}>
                  {order.data.shippingAddress.fullName}
                </p>
                <p>{order.data.shippingAddress.street}</p>
                <p>
                  {order.data.shippingAddress.city}, {order.data.shippingAddress.state} {order.data.shippingAddress.zipCode}
                </p>
                <p>{order.data.shippingAddress.country}</p>
                {order.data.shippingAddress.phone && (
                  <p className="mt-2 flex items-center">
                    <FaPhone className="mr-2" size={12} />
                    {order.data.shippingAddress.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Tracking Information */}
            {order.data.trackingNumber && (
              <div className="rounded-lg shadow-lg p-6" style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`
              }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
                  Tracking Information
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm" style={{ color: theme.textLight }}>
                      Tracking Number
                    </span>
                    <p className="font-mono font-semibold" style={{ color: theme.text }}>
                      {order.data.trackingNumber}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm" style={{ color: theme.textLight }}>
                      Carrier
                    </span>
                    <p className="font-semibold" style={{ color: theme.text }}>
                      {order.data.shippingCarrier || 'Luxify Logistics'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="rounded-lg shadow-lg p-6" style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`
            }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: theme.textLight }}>Items ({order.data.orderItems.length})</span>
                  <span style={{ color: theme.text }}>${order.data.itemsPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span style={{ color: theme.textLight }}>Shipping</span>
                  <span style={{ color: theme.text }}>${order.data.shippingPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span style={{ color: theme.textLight }}>Tax</span>
                  <span style={{ color: theme.text }}>${order.data.taxPrice.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3" style={{ borderColor: theme.border }}>
                  <div className="flex justify-between font-semibold text-lg">
                    <span style={{ color: theme.text }}>Total</span>
                    <span style={{ color: theme.text }}>${order.data.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="rounded-lg shadow-lg p-6" style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`
            }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
                Need Help?
              </h3>
              
              <div className="space-y-3">
                <a
                  href="tel:+1-800-LUXIFY"
                  className="flex items-center p-3 rounded-lg transition-colors"
                  style={{ backgroundColor: theme.cardHoverBg }}
                >
                  <FaPhone className="mr-3" style={{ color: theme.primary }} />
                  <div>
                    <p className="font-medium" style={{ color: theme.text }}>Call Support</p>
                    <p className="text-sm" style={{ color: theme.textLight }}>1-800-LUXIFY</p>
                  </div>
                </a>
                
                <a
                  href="mailto:support@luxify.com"
                  className="flex items-center p-3 rounded-lg transition-colors"
                  style={{ backgroundColor: theme.cardHoverBg }}
                >
                  <FaEnvelope className="mr-3" style={{ color: theme.primary }} />
                  <div>
                    <p className="font-medium" style={{ color: theme.text }}>Email Support</p>
                    <p className="text-sm" style={{ color: theme.textLight }}>support@luxify.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <div className="rounded-lg shadow-lg p-6" style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`
          }}>
            <h3 className="text-lg font-semibold mb-6" style={{ color: theme.text }}>
              Order Items
            </h3>
            
            <div className="space-y-4">
              {order.data.orderItems.map((item, index) => (
                <div key={index} className="flex items-center p-4 rounded-lg" style={{
                  backgroundColor: theme.cardHoverBg
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold" style={{ color: theme.text }}>
                      {item.name}
                    </h4>
                    <p className="text-sm" style={{ color: theme.textLight }}>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: theme.text }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm" style={{ color: theme.textLight }}>
                      ${item.price} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
