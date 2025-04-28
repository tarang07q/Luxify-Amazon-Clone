import React from 'react';
import ModernCube from './ModernCube';
import { useTheme } from '../../context/ThemeContext';

const CartCube = ({ size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
  // Cart-themed colors
  const cartColors = [
    '#4361ee',        // Shopping cart blue
    '#3a86ff',        // Cart handle color
    theme.success,    // Checkout color (green)
    '#ff9f1c',        // Item color (orange)
    '#e71d36',        // Remove item color (red)
    '#2ec4b6'         // Cart total color (teal)
  ];
  
  return (
    <ModernCube 
      size={size} 
      autoRotate={autoRotate} 
      faceColors={cartColors}
    />
  );
};

export default CartCube;
