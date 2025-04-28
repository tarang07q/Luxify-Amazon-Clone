import React from 'react';
import ModernCube from './ModernCube';
import { useTheme } from '../../context/ThemeContext';

const AdminCube = ({ size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
  // Admin-themed colors
  const adminColors = [
    '#003049',        // Admin primary dark blue
    '#d62828',        // Admin alert red
    '#f77f00',        // Admin notification orange
    '#fcbf49',        // Admin warning yellow
    '#2b2d42',        // Admin panel dark
    '#8d99ae'         // Admin data light
  ];
  
  return (
    <ModernCube 
      size={size} 
      autoRotate={autoRotate} 
      faceColors={adminColors}
    />
  );
};

export default AdminCube;
