import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import ShoppingBag3D from './ShoppingBag3D';
import ProductBox3D from './ProductBox3D';
import OrderDoc3D from './OrderDoc3D';
import ProfileCard3D from './ProfileCard3D';
import DashboardPanel3D from './DashboardPanel3D';
import { FaShoppingBag, FaBox, FaFileInvoiceDollar, FaUser, FaChartBar } from 'react-icons/fa';
import '../../styles/3d-icons.css';

/**
 * A showcase component for displaying multiple specialized 3D icons
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const SpecializedIconShowcase = ({ 
  size = 180,
  showTitles = true,
  iconsToShow = ['all'] // 'all', 'shopping', 'product', 'order', 'profile', 'dashboard'
}) => {
  const { theme, currentTheme } = useTheme();
  
  // Define which icons to display
  const shouldShowIcon = (iconType) => {
    if (iconsToShow.includes('all')) return true;
    return iconsToShow.includes(iconType);
  };
  
  return (
    <div className="specialized-icon-showcase">
      <div className="specialized-icon-grid">
        {shouldShowIcon('shopping') && (
          <div className="specialized-icon-item">
            <ShoppingBag3D
              size={size}
              color={currentTheme === 'dark' ? '#00f2ff' : '#5046e5'}
              title={showTitles ? 'Shopping' : null}
              icon={<FaShoppingBag size={size/4} />}
              floatingAnimation={true}
              glowEffect={true}
            />
          </div>
        )}
        
        {shouldShowIcon('product') && (
          <div className="specialized-icon-item">
            <ProductBox3D
              size={size}
              color={currentTheme === 'dark' ? '#ff00e4' : '#f0338d'}
              title={showTitles ? 'Products' : null}
              icon={<FaBox size={size/4} />}
              floatingAnimation={true}
              glowEffect={true}
            />
          </div>
        )}
        
        {shouldShowIcon('order') && (
          <div className="specialized-icon-item">
            <OrderDoc3D
              size={size}
              color={currentTheme === 'dark' ? '#7928ca' : '#8b5cf6'}
              title={showTitles ? 'Orders' : null}
              icon={<FaFileInvoiceDollar size={size/4} />}
              floatingAnimation={true}
              glowEffect={true}
              status="Delivered"
            />
          </div>
        )}
        
        {shouldShowIcon('profile') && (
          <div className="specialized-icon-item">
            <ProfileCard3D
              size={size}
              color={currentTheme === 'dark' ? '#01ffc3' : '#10b981'}
              title={showTitles ? 'Profile' : null}
              icon={<FaUser size={size/4} />}
              floatingAnimation={true}
              glowEffect={true}
              userName="JOHN DOE"
            />
          </div>
        )}
        
        {shouldShowIcon('dashboard') && (
          <div className="specialized-icon-item">
            <DashboardPanel3D
              size={size}
              color={currentTheme === 'dark' ? '#ffaa00' : '#f59e0b'}
              title={showTitles ? 'Dashboard' : null}
              icon={<FaChartBar size={size/4} />}
              floatingAnimation={true}
              glowEffect={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecializedIconShowcase;
