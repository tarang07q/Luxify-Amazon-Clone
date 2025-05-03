import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaPlus, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import ProductBox3D from '../3d/ProductBox3D';
import OrderDoc3D from '../3d/OrderDoc3D';
import './QuickActions.css';

const QuickActions = () => {
  const { theme, currentTheme } = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Define action colors based on current theme
  const getActionColor = (type) => {
    switch (type) {
      case 'products':
        return currentTheme === 'dark'
          ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.3), rgba(0, 100, 255, 0.2))'
          : 'rgba(80, 70, 229, 0.1)';
      case 'orders':
        return currentTheme === 'dark'
          ? 'linear-gradient(135deg, rgba(255, 0, 228, 0.3), rgba(121, 40, 202, 0.2))'
          : 'rgba(240, 51, 141, 0.1)';
      case 'addProduct':
        return currentTheme === 'dark'
          ? 'linear-gradient(135deg, rgba(1, 255, 195, 0.3), rgba(0, 200, 150, 0.2))'
          : 'rgba(16, 185, 129, 0.1)';
      default:
        return currentTheme === 'dark'
          ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.3), rgba(0, 100, 255, 0.2))'
          : 'rgba(80, 70, 229, 0.1)';
    }
  };

  // Define icon colors based on current theme
  const getIconColor = (type) => {
    switch (type) {
      case 'products':
        return currentTheme === 'dark' ? theme.primary : theme.primary;
      case 'orders':
        return currentTheme === 'dark' ? theme.secondary : theme.secondary;
      case 'addProduct':
        return currentTheme === 'dark' ? theme.success : theme.success;
      default:
        return theme.primary;
    }
  };

  // Define border colors based on current theme
  const getBorderColor = (type) => {
    switch (type) {
      case 'products':
        return currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.5)' : 'rgba(80, 70, 229, 0.3)';
      case 'orders':
        return currentTheme === 'dark' ? 'rgba(255, 0, 228, 0.5)' : 'rgba(240, 51, 141, 0.3)';
      case 'addProduct':
        return currentTheme === 'dark' ? 'rgba(1, 255, 195, 0.5)' : 'rgba(16, 185, 129, 0.3)';
      default:
        return currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.5)' : 'rgba(80, 70, 229, 0.3)';
    }
  };

  // Define glow effects based on current theme
  const getGlowEffect = (type) => {
    switch (type) {
      case 'products':
        return currentTheme === 'dark'
          ? '0 8px 32px rgba(0, 242, 255, 0.4), 0 0 10px rgba(0, 242, 255, 0.2)'
          : '0 8px 32px rgba(80, 70, 229, 0.1)';
      case 'orders':
        return currentTheme === 'dark'
          ? '0 8px 32px rgba(255, 0, 228, 0.4), 0 0 10px rgba(255, 0, 228, 0.2)'
          : '0 8px 32px rgba(240, 51, 141, 0.1)';
      case 'addProduct':
        return currentTheme === 'dark'
          ? '0 8px 32px rgba(1, 255, 195, 0.4), 0 0 10px rgba(1, 255, 195, 0.2)'
          : '0 8px 32px rgba(16, 185, 129, 0.1)';
      default:
        return currentTheme === 'dark'
          ? '0 8px 32px rgba(0, 242, 255, 0.4), 0 0 10px rgba(0, 242, 255, 0.2)'
          : '0 8px 32px rgba(80, 70, 229, 0.1)';
    }
  };

  const actions = [
    {
      id: 'products',
      title: 'Manage Products',
      path: '/admin/products',
      icon: <FaBox size={20} />,
      hoverKey: 'actionProducts'
    },
    {
      id: 'orders',
      title: 'Manage Orders',
      path: '/admin/orders',
      icon: <FaShoppingCart size={20} />,
      hoverKey: 'actionOrders'
    },
    {
      id: 'addProduct',
      title: 'Add New Product',
      path: '/admin/products/new',
      icon: <FaPlus size={20} />,
      hoverKey: 'actionAdd'
    }
  ];

  return (
    <div
      className={`quick-actions-container ${currentTheme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      style={{
        backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.9)' : theme.cardBg,
        boxShadow: currentTheme === 'dark' ? '0 8px 32px rgba(0, 242, 255, 0.1)' : theme.shadow,
        borderColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : theme.border,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="quick-actions-header" style={{
        borderColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.15)' : theme.border,
        borderImage: currentTheme === 'dark' ? 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.2), transparent) 1' : 'none'
      }}>
        <h2 className="quick-actions-title" style={{
          color: theme.text,
          textShadow: currentTheme === 'dark' ? '0 0 5px rgba(0, 242, 255, 0.3)' : 'none'
        }}>
          Quick Actions
        </h2>
      </div>
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <Link
            key={action.id}
            to={action.path}
            className={`quick-action-button ${currentTheme === 'dark' ? 'dark-theme' : 'light-theme'}`}
            onMouseEnter={() => setHoveredCard(action.hoverKey)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: getActionColor(action.id),
              color: theme.buttonText,
              borderColor: getBorderColor(action.id),
              boxShadow: getGlowEffect(action.id),
              backdropFilter: 'blur(5px)'
            }}
          >
            <div className="quick-action-icon">
              {action.id === 'products' && (
                <ProductBox3D
                  size={60}
                  color={getIconColor(action.id)}
                  floatingAnimation={hoveredCard === action.hoverKey}
                  glowEffect={true}
                  icon={action.icon}
                />
              )}
              {action.id === 'orders' && (
                <OrderDoc3D
                  size={60}
                  color={getIconColor(action.id)}
                  floatingAnimation={hoveredCard === action.hoverKey}
                  glowEffect={true}
                  icon={action.icon}
                />
              )}
              {action.id === 'addProduct' && (
                <ProductBox3D
                  size={60}
                  color={getIconColor(action.id)}
                  floatingAnimation={hoveredCard === action.hoverKey}
                  glowEffect={true}
                  icon={action.icon}
                />
              )}
            </div>
            <div className="quick-action-text">
              <span className={`action-title ${currentTheme === 'dark' ? 'dark-text' : ''}`} style={{
                color: currentTheme === 'dark' ? '#ffffff' : theme.text,
                textShadow: currentTheme === 'dark'
                  ? '0 0 8px rgba(0, 242, 255, 0.8), 0 0 15px rgba(0, 242, 255, 0.5)'
                  : 'none',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}>{action.title}</span>
              <FaArrowRight className="quick-action-arrow" style={{
                color: currentTheme === 'dark' ? '#ffffff' : theme.text,
                filter: currentTheme === 'dark' ? 'drop-shadow(0 0 5px rgba(0, 242, 255, 0.8))' : 'none'
              }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
