import React, { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaShoppingBag } from 'react-icons/fa';
import '../../styles/3d-icons.css';

/**
 * A specialized 3D shopping bag icon component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const ShoppingBag3D = ({
  size = 200,
  color = null,
  title = null,
  floatingAnimation = true,
  glowEffect = true,
  icon = null
}) => {
  const { theme } = useTheme();
  const containerRef = useRef(null);

  // Use theme color if no color is provided
  const baseColor = color || theme.primary;

  // Use custom icon or default
  const displayIcon = icon || <FaShoppingBag size={size/4} />;

  return (
    <div className="icon3d-wrapper">
      <div
        ref={containerRef}
        className={`icon3d-container ${floatingAnimation ? 'floating' : ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="shopping-bag-3d" style={{ transformStyle: 'preserve-3d' }}>
          <div className="shopping-bag-body" style={{
            backgroundColor: baseColor,
            boxShadow: glowEffect ? `0 10px 30px rgba(${theme['primary-rgb'] || '0, 242, 255'}, 0.6)` : 'none',
            transformStyle: 'preserve-3d'
          }}>
            <div className="shopping-bag-front"></div>
            <div className="shopping-bag-back"></div>
            <div className="shopping-bag-bottom"></div>
            <div className="shopping-bag-left"></div>
            <div className="shopping-bag-right"></div>
          </div>
          <div className="shopping-bag-handle-left" style={{ backgroundColor: baseColor }}></div>
          <div className="shopping-bag-handle-right" style={{ backgroundColor: baseColor }}></div>
          <div className="shopping-bag-icon">
            {displayIcon}
          </div>
        </div>
      </div>

      {title && <div className="icon3d-title">{title}</div>}
    </div>
  );
};

export default ShoppingBag3D;
