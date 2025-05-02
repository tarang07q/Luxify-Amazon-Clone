import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/3d.css';

/**
 * A pure CSS 3D cube with no WebGL dependencies
 * This component is used as a fallback when WebGL is not available or causing errors
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const CSSOnlyCube = ({ 
  size = 120, 
  color = null,
  title = null,
  icon = null,
  autoRotate = true
}) => {
  const { theme } = useTheme();
  
  // Use theme color if no color is provided
  const cubeColor = color || theme.primary;
  
  // Convert hex color to RGB for use in CSS
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };
  
  // Create lighter and darker versions of the color
  const lightenColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };
  
  const darkenColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };
  
  const lighterColor = lightenColor(cubeColor, 20);
  const darkerColor = darkenColor(cubeColor, 20);
  
  // Calculate the size of each face
  const faceSize = size;
  const halfSize = faceSize / 2;
  
  return (
    <div className="cube-container">
      <div 
        className="css-cube-container"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          margin: '0 auto'
        }}
      >
        <div 
          className={`css-cube ${autoRotate ? 'css-cube-animate' : ''}`}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {/* Front face */}
          <div 
            className="css-cube-face css-cube-face-front"
            style={{
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              transform: `translateZ(${halfSize}px)`,
              background: `linear-gradient(135deg, ${lighterColor}, ${cubeColor})`,
              boxShadow: `0 0 10px rgba(${hexToRgb(cubeColor)}, 0.5)`
            }}
          >
            {icon && (
              <div className="css-cube-icon">
                {icon}
              </div>
            )}
          </div>
          
          {/* Back face */}
          <div 
            className="css-cube-face css-cube-face-back"
            style={{
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              transform: `rotateY(180deg) translateZ(${halfSize}px)`,
              background: `linear-gradient(135deg, ${cubeColor}, ${darkerColor})`,
              boxShadow: `0 0 10px rgba(${hexToRgb(cubeColor)}, 0.5)`
            }}
          />
          
          {/* Right face */}
          <div 
            className="css-cube-face css-cube-face-right"
            style={{
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              transform: `rotateY(90deg) translateZ(${halfSize}px)`,
              background: `linear-gradient(135deg, ${lighterColor}, ${cubeColor})`,
              boxShadow: `0 0 10px rgba(${hexToRgb(cubeColor)}, 0.5)`
            }}
          />
          
          {/* Left face */}
          <div 
            className="css-cube-face css-cube-face-left"
            style={{
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
              background: `linear-gradient(135deg, ${cubeColor}, ${darkerColor})`,
              boxShadow: `0 0 10px rgba(${hexToRgb(cubeColor)}, 0.5)`
            }}
          />
          
          {/* Top face */}
          <div 
            className="css-cube-face css-cube-face-top"
            style={{
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              transform: `rotateX(90deg) translateZ(${halfSize}px)`,
              background: `linear-gradient(135deg, ${lighterColor}, ${cubeColor})`,
              boxShadow: `0 0 10px rgba(${hexToRgb(cubeColor)}, 0.5)`
            }}
          />
          
          {/* Bottom face */}
          <div 
            className="css-cube-face css-cube-face-bottom"
            style={{
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
              background: `linear-gradient(135deg, ${cubeColor}, ${darkerColor})`,
              boxShadow: `0 0 10px rgba(${hexToRgb(cubeColor)}, 0.5)`
            }}
          />
        </div>
      </div>
      
      {title && <div className="cube-title">{title}</div>}
    </div>
  );
};

export default CSSOnlyCube;
