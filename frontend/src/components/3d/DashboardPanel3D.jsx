import React, { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaChartBar } from 'react-icons/fa';
import '../../styles/3d-icons.css';

/**
 * A specialized 3D dashboard panel icon component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const DashboardPanel3D = ({
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
  const displayIcon = icon || <FaChartBar size={size/4} />;

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
        <div className="dashboard-3d">
          <div className="dashboard-panel" style={{
            background: `linear-gradient(135deg, ${baseColor}, ${theme.secondary})`,
            boxShadow: glowEffect ? `0 10px 30px rgba(${baseColorRgb}, 0.6)` : 'none'
          }}>
            <div className="dashboard-chart">
              <div className="dashboard-chart-bar dashboard-chart-bar-1"></div>
              <div className="dashboard-chart-bar dashboard-chart-bar-2"></div>
              <div className="dashboard-chart-bar dashboard-chart-bar-3"></div>
              <div className="dashboard-chart-bar dashboard-chart-bar-4"></div>
            </div>

            <div className="dashboard-stats">
              <div className="dashboard-stat"></div>
              <div className="dashboard-stat"></div>
              <div className="dashboard-stat"></div>
            </div>

            <div className="dashboard-icon">
              {displayIcon}
            </div>
          </div>
        </div>
      </div>

      {title && <div className="icon3d-title">{title}</div>}
    </div>
  );
};

export default DashboardPanel3D;
