import React from 'react';
import ModernCube from './ModernCube';
import { useTheme } from '../../context/ThemeContext';

const OrderCube = ({ size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
  // Order-themed colors
  const orderColors = [
    '#457b9d',        // Order processing blue
    '#1d3557',        // Order history dark blue
    '#8ac926',        // Order confirmed green
    '#ffb703',        // Order shipping yellow
    '#e63946',        // Order urgent red
    '#f1faee'         // Order details light
  ];
  
  return (
    <ModernCube 
      size={size} 
      autoRotate={autoRotate} 
      faceColors={orderColors}
    />
  );
};

export default OrderCube;
