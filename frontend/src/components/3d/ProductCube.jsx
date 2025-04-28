import React from 'react';
import ModernCube from './ModernCube';
import { useTheme } from '../../context/ThemeContext';

const ProductCube = ({ size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
  // Product-themed colors (shopping-related)
  const productColors = [
    theme.primary,    // Primary brand color
    '#ff6b6b',        // Shopping bag color (red)
    '#4ecdc4',        // Price tag color (teal)
    '#ffe66d',        // Shopping cart color (yellow)
    '#6a0572',        // Luxury product color (purple)
    '#f7b801'         // Discount/offer color (gold)
  ];
  
  return (
    <ModernCube 
      size={size} 
      autoRotate={autoRotate} 
      faceColors={productColors}
    />
  );
};

export default ProductCube;
