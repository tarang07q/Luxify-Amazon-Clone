import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Order3D from './Order3D';
import SimpleCube from './SimpleCube';

const OrderIcon3D = ({ size = 120, autoRotate = true }) => {
  const { theme } = useTheme();
  
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
  
  // Use the Order3D component
  return <Order3D size={size} autoRotate={autoRotate} />;
};

export default OrderIcon3D;
