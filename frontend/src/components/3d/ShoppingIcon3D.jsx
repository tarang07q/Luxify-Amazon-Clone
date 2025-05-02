import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import ModernCube from './ModernCube';
import ShoppingCart3D from './ShoppingCart3D';
import SimpleCube from './SimpleCube';

const ShoppingIcon3D = ({ type = 'cart', size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
  // Shopping-themed colors
  const shoppingColors = [
    theme.primary,    // Primary brand color
    '#ff6b6b',        // Shopping bag color (red)
    '#4ecdc4',        // Price tag color (teal)
    '#ffe66d',        // Shopping cart color (yellow)
    '#6a0572',        // Luxury product color (purple)
    '#f7b801'         // Discount/offer color (gold)
  ];
  
  // Check if WebGL is supported
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };
  
  // If WebGL is not supported, use the SimpleCube
  if (!checkWebGLSupport()) {
    return <SimpleCube size={size} />;
  }
  
  // Use the appropriate 3D component based on the type
  switch (type) {
    case 'cart':
      return <ShoppingCart3D size={size} autoRotate={autoRotate} />;
    case 'product':
      return <ModernCube size={size} autoRotate={autoRotate} faceColors={shoppingColors} />;
    default:
      return <ModernCube size={size} autoRotate={autoRotate} faceColors={shoppingColors} />;
  }
};

export default ShoppingIcon3D;
