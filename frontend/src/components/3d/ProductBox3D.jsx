import React, { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaBox } from 'react-icons/fa';
import '../../styles/3d-icons.css';

/**
 * A specialized 3D product box icon component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const ProductBox3D = ({
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
  const displayIcon = icon || <FaBox size={size/4} />;

  // Convert hex color to RGB for use in CSS
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  // Get RGB values for the base color
  const baseColorRgb = hexToRgb(baseColor);

  return (
    <div className="icon3d-wrapper">
      <div
        ref={containerRef}
        className={`icon3d-container ${floatingAnimation ? 'floating' : ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transformStyle: 'preserve-3d',
          zIndex: 25,
          visibility: 'visible',
          display: 'block'
        }}
      >
        <div className="product-box-3d" style={{ transformStyle: 'preserve-3d' }}>
          <div className="product-box-body" style={{
            backgroundColor: baseColor,
            boxShadow: glowEffect ? `0 10px 30px rgba(${baseColorRgb}, 0.6)` : 'none',
            transformStyle: 'preserve-3d'
          }}>
            <div className="product-box-face product-box-top"></div>
            <div className="product-box-face product-box-bottom"></div>
            <div className="product-box-face product-box-front"></div>
            <div className="product-box-face product-box-back"></div>
            <div className="product-box-face product-box-left"></div>
            <div className="product-box-face product-box-right"></div>

            <div className="product-box-lid" style={{
              backgroundColor: baseColor,
              transformStyle: 'preserve-3d'
            }}>
              <div className="product-box-lid-top"></div>
            </div>
          </div>

          <div className="product-box-icon" style={{
            color: 'white',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))'
          }}>
            {displayIcon}
          </div>
        </div>
      </div>

      {title && <div className="icon3d-title">{title}</div>}
    </div>
  );
};

export default ProductBox3D;
