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
  FaCog,
  FaBox,
  FaFileInvoiceDollar,
  FaUser,
  FaChartBar
} from 'react-icons/fa';
import ProductBox3D from '../3d/ProductBox3D';
import OrderDoc3D from '../3d/OrderDoc3D';
import ProfileCard3D from '../3d/ProfileCard3D';
import DashboardPanel3D from '../3d/DashboardPanel3D';
import { useTheme } from '../../context/ThemeContext';
import './DashboardCards.css';

const DashboardCards = () => {
  const { theme, currentTheme } = useTheme();

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
              {item.icon === 'product' && (
                <ProductBox3D
                  size={100}
                  color={currentTheme === 'dark' ? '#ff00e4' : '#f0338d'}
                  floatingAnimation={true}
                  glowEffect={true}
                  icon={<FaBox size={25} />}
                />
              )}
              {item.icon === 'order' && (
                <OrderDoc3D
                  size={100}
                  color={currentTheme === 'dark' ? '#7928ca' : '#8b5cf6'}
                  floatingAnimation={true}
                  glowEffect={true}
                  icon={<FaFileInvoiceDollar size={25} />}
                />
              )}
              {item.icon === 'user' && (
                <ProfileCard3D
                  size={100}
                  color={currentTheme === 'dark' ? '#01ffc3' : '#10b981'}
                  floatingAnimation={true}
                  glowEffect={true}
                  userName="ADMIN"
                  icon={<FaUser size={25} />}
                />
              )}
              {item.icon === 'dashboard' && (
                <DashboardPanel3D
                  size={100}
                  color={currentTheme === 'dark' ? '#ffaa00' : '#f59e0b'}
                  floatingAnimation={true}
                  glowEffect={true}
                  icon={<FaChartBar size={25} />}
                />
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardCards;
