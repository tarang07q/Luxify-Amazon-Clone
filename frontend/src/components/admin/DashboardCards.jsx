import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingBag,
  FaUsers,
  FaClipboardList,
  FaBoxes,
  FaChartLine,
  FaTag,
  FaComments,
  FaCog
} from 'react-icons/fa';
import LargeCube from '../3d/LargeCube';
import { useTheme } from '../../context/ThemeContext';
import './DashboardCards.css';

const DashboardCards = () => {
  const { theme } = useTheme();

  const dashboardItems = [
    {
      title: 'Products',
      description: 'Manage your product inventory',
      icon: 'product',
      color: theme.primary,
      path: '/admin/products',
      count: '1,245',
      change: '+12%'
    },
    {
      title: 'Orders',
      description: 'View and manage customer orders',
      icon: 'order',
      color: theme.secondary,
      path: '/admin/orders',
      count: '156',
      change: '+8%'
    },
    {
      title: 'Users',
      description: 'Manage user accounts',
      icon: 'user',
      color: theme.accent,
      path: '/admin/users',
      count: '3,427',
      change: '+15%'
    },
    {
      title: 'Dashboard',
      description: 'View analytics and reports',
      icon: 'dashboard',
      color: theme.success,
      path: '/admin/dashboard',
      count: '4',
      change: 'Reports'
    }
  ];

  return (
    <div className="dashboard-cards-container">
      {dashboardItems.map((item, index) => (
        <Link to={item.path} key={index} className="dashboard-card">
          <div className="dashboard-card-content">
            <div className="dashboard-card-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="dashboard-card-stats">
                <span className="dashboard-card-count">{item.count}</span>
                <span className="dashboard-card-change">{item.change}</span>
              </div>
            </div>
            <div className="dashboard-card-icon">
              <LargeCube size={180} autoRotate={true} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardCards;
