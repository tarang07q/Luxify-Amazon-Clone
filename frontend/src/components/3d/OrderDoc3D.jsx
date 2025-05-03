import React, { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import '../../styles/3d-icons.css';

/**
 * A specialized 3D order document icon component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const OrderDoc3D = ({
  size = 200,
  color = null,
  title = null,
  status = null,
  floatingAnimation = true,
  glowEffect = true,
  icon = null
}) => {
  const { theme } = useTheme();
  const containerRef = useRef(null);

  // Use theme color if no color is provided
  const baseColor = color || theme.primary;

  // Use custom icon or default
  const displayIcon = icon || <FaFileInvoiceDollar size={size/4} />;

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
          zIndex: 25,
          visibility: 'visible'
        }}
      >
        <div className="order-doc-3d">
          <div className="order-doc-body" style={{
            boxShadow: glowEffect ? `0 10px 30px rgba(${baseColorRgb}, 0.6)` : 'none'
          }}>
            <div className="order-doc-page order-doc-page-3"></div>
            <div className="order-doc-page order-doc-page-2"></div>
            <div className="order-doc-page order-doc-page-1">
              <div className="order-doc-line order-doc-line-1"></div>
              <div className="order-doc-line order-doc-line-2"></div>
              <div className="order-doc-line order-doc-line-3"></div>
              <div className="order-doc-line order-doc-line-4"></div>
              <div className="order-doc-line order-doc-line-5"></div>
            </div>

            <div className="order-doc-icon" style={{ color: baseColor }}>
              {displayIcon}
            </div>

            {status && (
              <div className="order-doc-status" style={{ color: baseColor }}>
                {status}
              </div>
            )}
          </div>
        </div>
      </div>

      {title && <div className="icon3d-title">{title}</div>}
    </div>
  );
};

export default OrderDoc3D;
