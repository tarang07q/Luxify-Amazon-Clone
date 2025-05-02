import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import CSSOnlyCube from './CSSOnlyCube';

/**
 * A simple 3D cube component that uses CSS for rendering
 * This component has been updated to use a pure CSS implementation
 * to avoid WebGL shader errors
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element} - The rendered component
 */
const SimpleCube = ({ size = 60, title = null, color = null, icon = null }) => {
  const { theme } = useTheme();

  // Use the theme color if no color is provided
  const cubeColor = color || theme.primary;

  // Use our CSS-only cube implementation
  return <CSSOnlyCube
    size={size}
    title={title}
    color={cubeColor}
    icon={icon}
    autoRotate={true}
  />;
};

export default SimpleCube;
