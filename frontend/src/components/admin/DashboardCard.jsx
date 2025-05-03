import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const DashboardCard = ({ title, value, icon, color, percentChange, period }) => {
  const { theme, currentTheme } = useTheme();

  // Get color based on the prop
  const getColor = () => {
    switch (color) {
      case 'primary':
        return currentTheme === 'dark' ? theme.primary : theme.primary;
      case 'secondary':
        return currentTheme === 'dark' ? theme.secondary : theme.secondary;
      case 'success':
        return currentTheme === 'dark' ? theme.success : theme.success;
      case 'info':
        return currentTheme === 'dark' ? theme.info : theme.info;
      case 'warning':
        return currentTheme === 'dark' ? theme.warning : theme.warning;
      case 'error':
        return currentTheme === 'dark' ? theme.error : theme.error;
      default:
        return currentTheme === 'dark' ? theme.primary : theme.primary;
    }
  };

  // Get background color based on the prop
  const getBgColor = () => {
    switch (color) {
      case 'primary':
        return currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)';
      case 'secondary':
        return currentTheme === 'dark' ? 'rgba(255, 0, 228, 0.1)' : 'rgba(240, 51, 141, 0.1)';
      case 'success':
        return currentTheme === 'dark' ? 'rgba(1, 255, 195, 0.1)' : 'rgba(16, 185, 129, 0.1)';
      case 'info':
        return currentTheme === 'dark' ? 'rgba(0, 149, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)';
      case 'warning':
        return currentTheme === 'dark' ? 'rgba(255, 170, 0, 0.1)' : 'rgba(245, 158, 11, 0.1)';
      case 'error':
        return currentTheme === 'dark' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(239, 68, 68, 0.1)';
      default:
        return currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)';
    }
  };

  return (
    <div className="rounded-lg p-6" style={{ 
      backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.7)' : theme.cardBg,
      boxShadow: theme.shadow,
      borderColor: theme.border,
      border: '1px solid',
    }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium" style={{ color: theme.textLight }}>{title}</h3>
          <p className="text-2xl font-bold" style={{ color: theme.text }}>{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ 
          backgroundColor: getBgColor(),
          color: getColor()
        }}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
      </div>
      {percentChange && (
        <div className="flex items-center text-xs" style={{ 
          color: percentChange >= 0 ? theme.success : theme.error 
        }}>
          {percentChange >= 0 ? (
            <FaArrowUp className="mr-1" />
          ) : (
            <FaArrowDown className="mr-1" />
          )}
          <span>{Math.abs(percentChange)}%</span>
          {period && <span className="ml-1 text-xs" style={{ color: theme.textLight }}>{period}</span>}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
